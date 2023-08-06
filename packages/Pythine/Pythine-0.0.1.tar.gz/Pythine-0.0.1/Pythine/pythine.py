import threading
from itertools import izip

__author = 'zhengxu'


class LockedIterator(object):
    #
    #   This code is referenced from
    #       http://stackoverflow.com/questions/1131430/are-generators-threadsafe
    #
    def __init__(self, it):
        self.lock = threading.Lock()
        self.it = it.__iter__()

    def __iter__(self): return self

    def next(self):
        self.lock.acquire()
        try:
            return self.it.next()
        finally:
            self.lock.release()


class LockedList(list):
    def __init__(self, *args, **kwargs):
        self.lock = threading.Lock()
        super(self.__class__, self).__init__(*args, **kwargs)

    def __setitem__(self, key, value):
        self.lock.acquire()
        try:
            super(self.__class__, self).__setitem__(key, value)
        finally:
            self.lock.release()


class Pythine(object):

    @classmethod
    def map(cls, *args, **kwargs):
        def _creator(func):
            return cls(func, *args, **kwargs)
        return _creator

    def __init__(self, func, thread_num=5):
        self._func = func
        self._thread_num = thread_num

    def _thread_worker(self, lock_iter, result_map):
        while True:
            try:
                task_index, (task_args, task_kwargs) = lock_iter.next()
                task_return = self._func(*task_args, **task_kwargs)
                result_map[task_index] = task_return
            except StopIteration:
                return

    # check args and kwargs
    @staticmethod
    def _check_list_args(*args, **kwargs):
        """
        Calculate and normalize args and kwargs to map to different thread
        :param args:
            input args from the input function
        :param kwargs:
            input kwargs from the input function
        :return:
            The calculated sequence length to map
        """
        args_len = set([len(arg) for arg in args if isinstance(arg, list)])
        kwargs_len = set([len(kwargs[k]) for k in kwargs if isinstance(kwargs[k], list)])
        assert len(args_len) <= 1 and len(kwargs_len) <= 1, \
            "All input list should have the same length"
        if len(args_len) and len(kwargs_len):
            assert args_len[0] == kwargs_len[0], "args and kwargs must have same input size"
            seq_len = list(args_len)[0]
        elif len(args_len) or len(kwargs_len):
            seq_len = max((max(args_len or [0]), max(kwargs_len or [0])))
        else:
            seq_len = 1
        # normalize args in place
        if seq_len > 1:
            for i, arg in enumerate(args):
                if not isinstance(arg, list):
                    args[i] = [arg] * seq_len
            # normalize kwargs in place
            for i, k in enumerate(kwargs.keys()):
                if not isinstance(kwargs[k], list):
                    kwargs[k] = [kwargs[k]] * seq_len
        return seq_len

    def __call__(self, *args, **kwargs):
        # now only supports 1-d list
        if '__pythine_thread_num' in kwargs:
            thread_num = int(kwargs['__pythine_thread_num'])
            del kwargs['__pythine_thread_num']
        else:
            thread_num = int(self._thread_num)
        seq_len = self._check_list_args(*args, **kwargs)
        if seq_len == 1:
            # Make function call transparent if user only give one set of argument
            return self._func(*args, **kwargs)
        else:
            args_list = zip(*args) or [()] * seq_len
            kwargs_list = [dict(zip(kwargs.keys(), v)) for v in izip(*kwargs.itervalues())] or [{}] * seq_len
            lock_iter = LockedIterator(enumerate(zip(args_list, kwargs_list)))
            result_map = LockedList([None] * seq_len)
            thread_group = [threading.Thread(target=self._thread_worker, args=(lock_iter, result_map))
                            for _ in range(thread_num)]
            # start all threads
            for thread in thread_group:
                thread.start()
            # join all threads
            for thread in thread_group:
                thread.join()
            if not reduce(lambda x, y: x and (not y), result_map, True):
                return result_map

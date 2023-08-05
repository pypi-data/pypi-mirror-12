'''
The persistent ordered dict is a data struture that can be interacted with
like a python dict, and which is easy to keep synced with an on-disk copy

This allows you to easily persist data between non-concurrent runs of a
program.  It's useful for keeping track of progress in long jobs.
'''
import signal
import time
import sys
import multiprocessing
import subprocess
import json
import os
import re
import copy
from file_utils import lsfiles



class GracefulDeath(object):
	'''
	Catches kill singals and acknowledges kill signals so that other
	clients can finish critical steps before dying

	The client callable should instantiate a GracefulDeath, and then
	watch it's kill_now flag to know when it should die
	'''
	kill_now = False
	def __init__(self):
		signal.signal(signal.SIGINT, self.exit_gracefully)
		signal.signal(signal.SIGTERM, self.exit_gracefully)

	def exit_gracefully(self,signum, frame):
		self.kill_now = True


class DuplicateKeyException(Exception):
	pass


class PersistentOrderedDict(object):

	LINES_PER_FILE = 1000
	ESCAPE_TAB_PATTERN = re.compile('\t')
	UNESCAPE_TAB_PATTERN = re.compile(r'(?P<prefix>^|[^\\])\\t')
	ESCAPE_SLASH_PATTERN = re.compile(r'\\')
	UNESCAPE_SLASH_PATTERN = re.compile(r'\\\\')


	def __init__(self, path):
		self.path = path

		# if the path doesn't exist, make it
		if not os.path.exists(path):
			os.makedirs(path)

		# if the path exists but points to a file, raise
		elif os.path.isfile(path):
			raise IOError(
				'The path given to PersistentOrderedDict should correspond '
				'to a folder.  A file was found instead: %s' % path
			)

		# read in all data (if any)
		self.read()

		# Hold is off by default -> updates are immediately written to file
		self._hold = False

		# Keep track of files whose contents don't match values in memory
		self.dirty_files = set()



	def hold(self):
		'''
		temporarily prevent writing updates to file
		'''
		self._hold = True

	
	def unhold(self):
		'''
		Resume writing updates to file, synchronize any dirty files.
		'''
		self._hold = False
		self.sync()


	def keys(self):
		return copy.copy(self.key_order)


	def values(self):
		return copy.deepcopy([self.data[k] for k in self.key_order])


	def read(self):

		self.key_order = []
		self.index_lookup = {}
		self.data = {}

		i=0
		for fname in lsfiles(self.path):

			# ensure that files are in expected order,
			# that none are missing, and that no lines are missing.
			assert(fname == '%d.json' % i)
			if i > 0:
				prev_file_path = os.path.join(self.path, '%d.json' % (i-1))
				num_lines_prev_file = len(
					open(prev_file_path, 'r').readlines()
				)
				if num_lines_prev_file != self.LINES_PER_FILE:
					raise ValueError(
						"PersistentOrderedDict: "
						"A file on disk appears to be corrupted, because "
						"it's missing lines: %s " % prev_file_path
					)

			i += 1

			for entry in open(os.path.join(self.path, fname)):

				# skip blank lines (there's always one at end of file)
				if entry=='':
					continue

				key, json_record = entry.split('\t', 1)
				key = self.UNESCAPE_TAB_PATTERN.sub('\g<prefix>\t', key)
				key = self.UNESCAPE_SLASH_PATTERN.sub(r'\\', key)
				key = key.decode('utf8')
				
				# remove the newline of the end of json_record, and read it
				record = json.loads(json_record[:-1])
				self.data[key] = record
				self.key_order.append(key)
				self.index_lookup[key] = len(self.key_order)-1


	def mark_dirty(self, key):

		index = self.index_lookup[key]
		file_num = index / self.LINES_PER_FILE
		self.dirty_files.add(file_num)


	def sync(self):

		graceful = GracefulDeath()


		# No synchronization happens when hold is on.  This reduces I/O
		# when many values need to be updated
		if self._hold:
			return

		for file_num in self.dirty_files:

			# Get the dirty file
			fname =  '%d.json' % file_num
			f = open(os.path.join(self.path, fname), 'w')

			# Go through keys mapped to this file and re-write them
			start = file_num * self.LINES_PER_FILE
			stop = start + self.LINES_PER_FILE
			for key in self.key_order[start:stop]:

				record = self.data[key]
				# Escape tabs in key, and encode using utf8
				key = self.escape_key(key)
				f.write('%s\t%s\n' % (key, json.dumps(record)))

		# No more dirty files
		self.dirty_files = set()
		if graceful.kill_now:
			print 'dying gracefully'
			sys.exit(0)
			


	def escape_key(self, key):
		key = key.encode('utf8')
		key = self.ESCAPE_SLASH_PATTERN.sub(r'\\\\', key)
		key = self.ESCAPE_TAB_PATTERN.sub(r'\\t', key)
		return key


	def __iter__(self):
		self.pointer = 0
		return self


	def next(self):
		try:
			key = self.key_order[self.pointer]
		except IndexError:
			raise StopIteration

		val = self.data[key]
		self.pointer += 1

		return key, val


	def __contains__(self, key):
		key = self.ensure_unicode(key)
		return key in self.index_lookup


	def __len__(self):
		return len(self.key_order)


	def __getitem__(self, key):
		key = self.ensure_unicode(key)
		return self.data[key]


	def ensure_unicode(self, key):

		# ensure that the key is string-like
		if not isinstance(key, basestring):
			raise ValueError(
				'Keys must be str or unicode, and will be converted to '
				'unicode type internally.'
			)

		# cast the key into unicode if necessary
		if not isinstance(key, unicode):
			key = key.decode('utf8')

		return key


	def update(self, key):
		'''
		This can be called to ensure that a specific key will be synchronized.
		It's helpful if a mutable object is stored at that key, since it
		could be changed without triggering __setitem__; this provides a way
		to notify PersistentOrderedDict that the value at that key has changed.
		'''
		self.mark_dirty(key)
		self.sync()


	def set_item(self, key, val):

		key = self.ensure_unicode(key)
		val = copy.deepcopy(val)

		# if there isn't already an entry, we need to allocate a new slot
		if key not in self.data:
			self.key_order.append(key)
			self.index_lookup[key] = len(self.key_order)-1

		# update the value held at <key>
		self.data[key] = val
		self.mark_dirty(key)
		self.sync()


	def __setitem__(self, key, val):

		key = self.ensure_unicode(key)
		val = copy.deepcopy(val)

		# if there isn't already an entry, we need to allocate a new slot
		if key not in self.data:
			self.key_order.append(key)
			self.index_lookup[key] = len(self.key_order)-1

		# update the value held at <key>
		self.data[key] = val
		self.mark_dirty(key)
		self.sync()


	def set(self, key, subkey, value):
		self[key][subkey] = value
		self.update(key)


	def add(self, key):
		if key in self:
			raise DuplicateKeyException(
				'PersistentOrderedDict: key "%s" already exists.' % key)
		else:
			self[key] = True

	def convert_to_tracker(self):

		# Rewrite every value to satisfy the form of a progress tracker
		self.hold()
		for key, spec in self:

			# Ensure the value at key is a dict, and add special keys
			if not isinstance(spec, dict):
				self[key] = {'val':spec, '_done':False, '_tries':0}
			else:
				self[key].update({'_done':False, '_tries':0})

			# Mark the key as updated
			self.update(key)

		self.unhold()


class ProgressTracker(PersistentOrderedDict):

	def check_or_add(self, key):
		'''
		checks if there is an entry for key already marked as done
		(returns True if so).  If no entry exists for key, it makes one
		and provides it with a defualt value of _done:False and _tries:0
		'''
		if key in self:
			if self[key]['_done']:
				return True
			else:
				return False
		else:
			self[key] = {'_done':False, '_tries':0}
			return False


	def check(self, key):
		if key in self:
			if self[key]['_done']:
				return True
			else:
				return False
		else:
			return False

	def add(self, key):
		if key in self:
			raise DuplicateKeyException(
				'ProgressTracker: key "%s" already exists.' % key)
		else:
			self[key] = {'_done':False, '_tries':0}

	def increment_tries(self, key):
		self[key]['_tries'] += 1
		self.update(key)

	def reset_tries(self, key):
		self[key]['_tries'] = 0
		self.update(key)

	def mark_done(self, key):
		self[key]['_done'] = True
		self.update(key)

	def mark_not_done(self, key):
		self[key]['_done'] = False
		self.update(key)

def requires_lock(lock):
	def decorator(f):
		def f_with_lock(*args, **kwargs):
			lock.acquire()
			return_val = f(*args, **kwargs)
			lock.release()
			return return_val

		return f_with_lock
	return decorator


def requires_tracker_open(f):
	def f_that_requires_tracker_open(self, *args, **kwargs):
		if not self.tracker_open:
			raise CalledClosedTrackerException
		return f(self, *args, **kwargs)

	return f_that_requires_tracker_open



class CalledClosedTrackerException(Exception):
	pass



class SharedProgressTracker(object):
	pass

	CLOSE = 0
	LOCK = multiprocessing.RLock()

	def __init__(self, path):

		self.client_pipe, server_pipe = multiprocessing.Pipe()
		self.lock = multiprocessing.Lock()

		# create a real progress_tracker and a listen loop around it
		client_tracker = multiprocessing.Process(
			target=progress_tracker_serve,
			args=(path, server_pipe)
		)
		client_tracker.start()

		self.tracker_open = True

	@requires_lock(LOCK)
	def close(self):
		self.client_pipe.send(self.CLOSE)

	@requires_tracker_open
	def hold(self):
		self.LOCK.acquire()
		self.client_pipe.send(('hold',))
		return self.client_pipe.recv()

	@requires_tracker_open
	def unhold(self):
		self.client_pipe.send(('unhold',))
		return_val = self.client_pipe.recv()
		self.LOCK.release()
		return return_val

	@requires_tracker_open
	@requires_lock(LOCK)
	def read(self):
		self.client_pipe.send(('read',))
		return self.client_pipe.recv()

	@requires_tracker_open
	@requires_lock(LOCK)
	def mark_dirty(self, key):
		self.client_pipe.send(('mark_dirty', key))
		return self.client_pipe.recv()

	@requires_tracker_open
	@requires_lock(LOCK)
	def sync(self):
		self.client_pipe.send(('sync',))
		return self.client_pipe.recv()

	@requires_tracker_open
	@requires_lock(LOCK)
	def __contains__(self, key):
		self.client_pipe.send(('__contains__', key))
		return self.client_pipe.recv()

	@requires_tracker_open
	@requires_lock(LOCK)
	def __len__(self):
		self.client_pipe.send(('__len__',))
		return self.client_pipe.recv()

	@requires_tracker_open
	@requires_lock(LOCK)
	def __getitem__(self, key):
		self.client_pipe.send(('__getitem__', key))
		return self.client_pipe.recv()

	@requires_tracker_open
	@requires_lock(LOCK)
	def update(self, key):
		self.client_pipe.send(('update', key))
		return self.client_pipe.recv()

	@requires_tracker_open
	@requires_lock(LOCK)
	def __setitem__(self, key, val):
		self.client_pipe.send(('__setitem__', key, val))
		return self.client_pipe.recv()

	@requires_tracker_open
	@requires_lock(LOCK)
	def check_or_add(self, key):
		self.client_pipe.send(('check_or_add', key))
		return self.client_pipe.recv()

	@requires_tracker_open
	@requires_lock(LOCK)
	def set(self, key, subkey, val):
		self.client_pipe.send(('set', key, subkey, val))
		return self.client_pipe.recv()

	@requires_tracker_open
	@requires_lock(LOCK)
	def check(self, key):
		self.client_pipe.send(('check', key))
		return self.client_pipe.recv()

	@requires_tracker_open
	@requires_lock(LOCK)
	def add(self, key):
		self.client_pipe.send(('add', key))
		return self.client_pipe.recv()

	@requires_tracker_open
	@requires_lock(LOCK)
	def increment_tries(self, key):
		self.client_pipe.send(('increment_tries', key))
		return self.client_pipe.recv()

	@requires_tracker_open
	@requires_lock(LOCK)
	def reset_tries(self, key):
		self.client_pipe.send(('reset_tries', key))
		return self.client_pipe.recv()

	@requires_tracker_open
	@requires_lock(LOCK)
	def mark_done(self, key):
		self.client_pipe.send(('mark_done', key))
		return self.client_pipe.recv()

	@requires_tracker_open
	@requires_lock(LOCK)
	def mark_not_done(self, key):
		self.client_pipe.send(('mark_not_done', key))
		return self.client_pipe.recv()


	
def progress_tracker_serve(path, pipe):
	progress_tracker = ProgressTracker(path)
	is_open = True
	while is_open:
		message = pipe.recv()
		if message == SharedProgressTracker.CLOSE:
			is_open = False
		else:
			attr, args = message[0], message[1:]
			pipe.send(getattr(progress_tracker, attr)(*args))

		


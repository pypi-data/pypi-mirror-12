# -*- coding: utf-8 -*-

import random
import zmq
import sys
import time
import json
import importlib
import imp
import abc
from pdb import Pdb
from datetime import datetime
from six import with_metaclass
import thread
from zmq.eventloop import ioloop, zmqstream
import linecache
import multiprocessing

from ipykernel.jsonutil import json_clean
# from keystone.app_client.client import StrategyClient, byteify
from keystone.strategy import KSStrategy, KSStrategyRunner
from keystone.sources import KSCsvSource
from keystone.performance.analyzer import KSDefaultAnalyzer, KSCumulativeAnalyzer

class KPdb(Pdb):
	def __init__(self, session, notify_url, completekey='tab', stdin=None, stdout=None, skip=None):
		Pdb.__init__(self, completekey, stdin, stdout, skip)
		self.stop_flag = True
		self.lock = multiprocessing.Lock() 
		self.init_notify_sock(notify_url)
		self.session = session

	def init_notify_sock(self, notify_url):
		context = zmq.Context()
		notify_socket = context.socket(zmq.PUB)
		notify_socket.linger = 1000
		notify_socket.bind(notify_url)
		self.notify_socket = notify_socket

	def notify_frontend(self, frame):
		if not frame:
			return
		fname = self.canonic(frame.f_code.co_filename)
		lineno = frame.f_lineno
		content = json_clean(dict(filename=fname, lineno=lineno))
		msg = self.session.send(self.notify_socket, u'break_notify', content = content, ident = 'stream.notify')
		# print >>sys.stderr, "kpdb send %s"%(msg)

	def do_forget(self):
		with self.lock:
			self.stop_flag = False

	@property
	def is_running(self):
		with self.lock:
			is_stop = self.stop_flag
		return not is_stop

	def user_call(self, frame, argument_list):
		with self.lock:
			self.stop_flag = True
		# print >>sys.stdout, "this is KPdb user_call(quitting=" + str(self.quitting) + ')'
		self.notify_frontend(frame)
		Pdb.user_call(self, frame, argument_list)
		self.do_forget()

	def user_line(self, frame):
		with self.lock:
			self.stop_flag = True
		# print >>sys.stdout, "this is KPdb user_line(quitting=" + str(self.quitting) + ')'
		self.notify_frontend(frame)
		Pdb.user_line(self, frame)
		self.do_forget()

	'''
	def do_break(self, arg, temporary = 0):
		print >>sys.stdout, "this is KPdb do_break"
		filename = None
		lineno = None
		colon = arg.rfind(':')
		if colon >= 0:
			filename = arg[:colon].rstrip()
			arg = arg[colon+1:].lstrip()
			try:
			    lineno = int(arg)
			except ValueError, msg:
			    print >>self.stdout, '*** Bad lineno:', arg
			    return
			err = self.do_break_at_line(filename, lineno, temporary)
			if err:
				print >>sys.stdout, err
		else:
			err = self.do_break_at_function(arg, temporary)
			if err:
				print >>sys.stdout, err

		# Pdb.do_break(self, arg, temporary)
	'''

	def do_break_at_line(self, filename, lineno, temporary = 0, cond = None):
		funcname = None
		filename = filename.rstrip()
		f = self.lookupmodule(filename)
		if not f:
			return '***(KPdb) ' + repr(filename) + 'not found'
		else:
		    filename = f
		try:
		    lineno = int(lineno)
		except ValueError, msg:
		    return '***(KPdb) Bad lineno:' + str(lineno)

		# now check line
		err = self._checkline(filename, lineno)
		if err:
			return '***(KPdb) ' + err
		# now set the break point
		err = self.set_break(filename, lineno, temporary, cond, funcname)
		if err: 
			return '***(KPdb) ' + err
		# bp = self.get_breaks(filename, line)[-1]
		# print >>self.stdout, "Breakpoint %d at %s:%d" % (bp.number,
		#                                                  bp.file,
		#                                                  bp.line)
	def do_break_at_function(self, arg, temporary = 0, cond = None):
		try:
		    func = eval(arg, self.curframe.f_globals, self.curframe_locals)
		except:
		    func = arg
		try:
		    if hasattr(func, 'im_func'):
		        func = func.im_func
		    code = func.func_code
		    #use co_name to identify the bkpt (function names
		    #could be aliased, but co_name is invariant)
		    funcname = code.co_name
		    lineno = code.co_firstlineno
		    filename = code.co_filename
		except:
		    # last thing to try
		    (ok, filename, ln) = self.lineinfo(arg)
		    if not ok:
		        return '***(KPdb) The specified object' + repr(arg) + 'is not a function or was not found along sys.path.'

		    funcname = ok # ok contains a function name
		    lineno = int(ln)

		# now check line
		err = self._checkline(filename, lineno)
		if err:
			return '***(KPdb) ' + err
		# now set the break point
		err = self.set_break(filename, lineno, temporary, cond, funcname)
		if err: 
			return '***(KPdb) ' + err

	def _checkline(self, filename, lineno):
		# Check whether specified line seems to be executable.
		globs = self.curframe.f_globals if hasattr(self, 'curframe') and self.curframe is not None else None
		line = linecache.getline(filename, lineno, globs)
		if not line:
		    return '***(KPdb) End of file'
		line = line.strip()
		# Don't allow setting breakpoint at a blank line
		if (not line or (line[0] == '#') or
		     (line[:3] == '"""') or line[:3] == "'''"):
		    return '***(KPdb) Blank or comment'

'''
class StrategyDebugger2(StrategyClient):
	def __init__(self, control_url):
		StrategyClient.__init__(self)
		self.pdb = KPdb(stdout=sys.stdout);
		self.pdb.use_rawinput = True
		self.control_url = control_url
		self.init_control_socket(control_url)
		ioloop.IOLoop.instance().start()

	def __del__(self):
		self._thread_exit()

	def init_control_socket(self, url):
		print >>sys.stdout, "control bind to %s"%(url)
		sock = self.context.socket(zmq.ROUTER)
		sock.linger = 1000
		sock.bind(url)
		stream = zmqstream.ZMQStream(sock)
		self.control_stream = stream
		self.control_stream.on_recv(self.dispatch_control_msg)

	def dispatch_control_msg(self, msg):
		try:
			ident, request = self.session.deserialize(msg)
		except Exception as e:
			print >>sys.stderr, e
			return
		request = byteify(request)
		# print >>sys.stderr, str(request)
		msg_type = request['msg_type']
		if msg_type == u'run_request':
			# print >>sys.stderr, "run_request"
			thread.start_new_thread(self.run, (request['content']['config'],))
		elif msg_type == u'continue_request':
			self.continue_request(ident)
		elif msg_type == u'next_request':
			self.next_request(ident)
		elif msg_type == u'break_line_request':
			self.break_at_line_request(request, ident)
		else:
			print >>sys.stderr, 'unrecognized msg_type \'' + msg_type + '\''
			return

	def continue_request(self, ident = None):
		try:
			if self.pdb.is_running:
				content = json_clean({'code': -2, 'result': 'cannot set breakpoint when program is running'})
				self.session.send(self.control_stream, u'continue_reply', content, ident = ident)
				return
			self.pdb.do_continue('')
			content = json_clean({
				'code': 0,
				'result': 'ok'})
			self.session.send(self.control_stream, u'continue_reply', content, ident = ident)
		except Exception as e:
			print >>sys.stderr, e
			err_msg = str(e)
			self.session.send(self.control_stream, u'continue_reply', {'code':-4, 'result':err_msg}, ident = ident)

	def next_request(self, ident = None):
		try:
			if self.pdb.is_running:
				content = json_clean({'code': -2, 'result': 'cannot set breakpoint when program is running'})
				self.session.send(self.control_stream, u'next_reply', content, ident = ident)
				return
			self.pdb.do_quit('')
			content = json_clean({
				'code': 0,
				'result': 'ok'})
			self.session.send(self.control_stream, u'next_reply', content, ident = ident)
		except Exception as e:
			print >>sys.stderr, e
			err_msg = str(e)
			self.session.send(self.control_stream, u'next_reply', {'code':-4, 'result':err_msg}, ident = ident)

	def break_at_line_request(self, request, ident = None):
		try:
			# check parameter
			if not (request['content'].has_key('filename') or request['content'].has_key('lineno')):
				content = json_clean({'code': -1, 'result': 'missing filename or lineno'})
				self.session.send(self.control_stream, u'break_line_reply', content, ident = ident)
				return
			if self.pdb.is_running:
				content = json_clean({'code': -2, 'result': 'cannot set breakpoint when program is running'})
				self.session.send(self.control_stream, u'break_line_reply', content, ident = ident)
				return
			filename = request['content']['filename']
			lineno = request['content']['lineno']
			err = self.pdb.do_break_at_line(filename, lineno)
			if err:
				self.session.send(self.control_stream, u'break_reply', {'code':-3, 'result':err}, ident = ident)
				return

			# return breakpoint info
			bp = self.pdb.get_breaks(filename, lineno)[-1]
			content = json_clean({
				'code': 0,
				'result': 'ok',
				'file': bp.file,
				'line': bp.line,
				'number': bp.number})
			self.session.send(self.control_stream, u'break_reply', content, ident = ident)
		except Exception as e:
			print >>sys.stderr, e
			err_msg = str(e)
			self.session.send(self.control_stream, u'break_reply', {'code':-4, 'result':err_msg}, ident = ident)

	def _thread_listen(self):
		ioloop.IOLoop.instance().start()

	def _thread_exit(self):
		thread.exit()

	def run(self, config):
		if isinstance(config, basestring):
		    config = json.loads(config)
		elif isinstance(config, dict):
		    config = dict(config)
		else:
		    raise TypeError("input config MUST BE 'string' or 'dict'")
		self.config = byteify(config)
		self.check_config(config)
		self.strategy_runner = KSStrategyRunner()

		self.init_session()
		self.init_strategy()
		self.init_strategy_runner()
		self.init_socket()
		self.io_redirect()
		# my_pdb.do_break('/Users/rk/Desktop/share_folder/keystone-strategy-engine/node/example.py:17')
		# my_pdb.do_break('/Users/rk/Desktop/share_folder/keystone-strategy-engine/node/example.py:17')
		# my_pdb.do_break('/Users/rk/Desktop/share_folder/keystone-strategy-engine/node/example.py:17')
		# my_pdb.do_break('/Users/rk/Desktop/share_folder/keystone-strategy-engine/node/example.py:18')
		self.pdb.runeval('self.strategy_runner.run()', globals(), locals())
		# stop thread when pdb exit
		# self._thread_exit()
'''
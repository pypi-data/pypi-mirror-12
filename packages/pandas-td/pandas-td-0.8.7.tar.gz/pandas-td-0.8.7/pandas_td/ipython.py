# ipython.py

import argparse
import os
import re
import sys
import numpy as np
import pandas as pd
import pandas_td as td
import tdclient

import IPython
from IPython.core import magic

MAGIC_CONTEXT_NAME = '_td_magic'

class MagicContext(object):
    def __init__(self):
        self.database = None

    def connect(self):
        return td.connect()

class MagicTable(object):
    def __init__(self, table):
        print("INFO: import {0}".format(table.name))
        self.table = table
        data = [c if len(c) == 3 else [c[0], c[1], ''] for c in table.schema]
        self.columns = [c[2] if c[2] else c[0] for c in data]
        self.frame = pd.DataFrame(data, columns=['field', 'type', 'alias'])

    def __dir__(self):
        return self.columns

    def _repr_html_(self):
        return self.frame._repr_html_()

def get_td_magic_context():
    ipython = get_ipython()
    try:
        ctx = ipython.ev(MAGIC_CONTEXT_NAME)
    except NameError:
        ctx = MagicContext()
        ipython.push({MAGIC_CONTEXT_NAME: ctx})
    return ctx

class TDMagics(magic.Magics):
    def __init__(self, shell):
        super(TDMagics, self).__init__(shell)
        self.context = get_td_magic_context()

@magic.magics_class
class DatabasesMagics(TDMagics):
    @magic.line_magic
    def td_databases(self, pattern):
        con = self.context.connect()
        columns = ['name', 'count', 'permission', 'created_at', 'updated_at']
        values = [[getattr(db, c) for c in columns]
                  for db in con.client.databases()
                  if re.search(pattern, db.name)]
        return pd.DataFrame(values, columns=columns)

@magic.magics_class
class TablesMagics(TDMagics):
    @magic.line_magic
    def td_tables(self, pattern):
        con = self.context.connect()
        columns = ['db_name', 'name', 'count', 'estimated_storage_size', 'last_log_timestamp', 'created_at']
        values = [[getattr(t, c) for c in columns]
                  for db in con.client.databases()
                  for t in con.client.tables(db.name)
                  if re.search(pattern, t.identifier)]
        return pd.DataFrame(values, columns=columns)

@magic.magics_class
class JobsMagics(TDMagics):
    @magic.line_magic
    def td_jobs(self, pattern):
        con = self.context.connect()
        columns = ['status', 'job_id', 'type', 'start_at', 'query']
        values = [[j.status(), j.job_id, j.type, j._start_at, j.query]
                  for j in con.client.jobs()]
        return pd.DataFrame(values, columns=columns)

@magic.magics_class
class UseMagics(TDMagics):
    @magic.line_magic
    def td_use(self, line):
        con = self.context.connect()
        try:
            tables = con.client.tables(line)
        except tdclient.api.NotFoundError:
            sys.stderr.write("ERROR: Database '{0}' not found.".format(line))
            return
        # update context
        self.context.database = line
        # push table names
        get_ipython().push({t.name: MagicTable(t) for t in tables})

@magic.magics_class
class QueryMagics(TDMagics):
    def create_parser(self, engine_type):
        parser = argparse.ArgumentParser(
            prog = engine_type,
            description = 'Cell magic to run a query.',
            add_help = False)
        parser.add_argument('database', nargs='?',
                            help='database name')
        parser.add_argument('--pivot', action='store_true',
                            help='run pivot_table against dimensions')
        parser.add_argument('--plot', action='store_true',
                            help='plot the query result')
        parser.add_argument('-n', '--dry-run', action='store_true',
                            help='output translated code without running query')
        parser.add_argument('-v', '--verbose', action='store_true',
                            help='verbose output')
        parser.add_argument('-e', '--engine',
                            help='use specified engine')
        parser.add_argument('-a', '--queue',
                            help='run asynchronously using a queue')
        parser.add_argument('-o', '--out',
                            help='store the result to variable')
        parser.add_argument('-O', '--out-file',
                            help='store the result to file')
        parser.add_argument('-q', '--quiet', action='store_true',
                            help='disable progress output')
        return parser

    def parse_args(self, engine_type, line):
        parser = self.create_parser(engine_type)
        args = parser.parse_args(line.split())

        # implicit options
        if args.queue:
            args.quiet = True
        if args.plot:
            args.pivot = True

        # context
        if args.database is None:
            args.database = self.context.database

        return args

    def push_code(self, code, end='\n'):
        self.code_list.append(code + end)

    def display_code_block(self):
        html = '<pre style="background-color: #ffe;">'
        html += ''.join(self.code_list)
        html += '</pre>\n'
        IPython.display.display(IPython.display.HTML(html))

    def build_query(self, cell):
        ip = get_ipython()
        query = cell.format(**ip.user_ns)
        self.push_code("_q = '''")
        self.push_code(query)
        self.push_code("'''")
        return query

    def build_engine(self, engine_type, args):
        ip = get_ipython()
        if args.engine:
            # Use the existing one
            engine = ip.ev(args.engine)
            self.push_code("_e = {0}".format(args.engine))
            return engine
        else:
            # Create a new one
            name = '{0}:{1}'.format(engine_type, args.database)
            if args.quiet:
                params = {'show_progress': False, 'clear_progress': False}
            elif args.verbose:
                params = {'show_progress': True, 'clear_progress': False}
            else:
                params = {}
            args = [repr(name)] + ['{0}={1}'.format(k, v) for k, v in params.items()]
            self.push_code("_e = td.create_engine({0})".format(', '.join(args)))
            return td.create_engine(name, con=self.context.connect(), **params)

    def build_queue(self, args):
        ip = get_ipython()
        self.push_code("{0} = td.create_queue(name='{0}')".format(args.queue))
        if not args.dry_run:
            queue = td.create_queue(name=args.queue)
            ip.push({args.queue: queue})
            return queue

    def submit_query(self, query, engine, args):
        ip = get_ipython()
        try:
            queue = ip.ev(args.queue)
        except NameError:
            queue = self.build_queue(args)
        self.push_code("{0}.query(_q, _e)".format(args.queue))
        if args.dry_run:
            return self.display_code_block()
        name = "In[{0}]".format(ip.ev("len(In) - 1"))
        def query_callback(d):
            return self.post_process(d, args)
        task = queue.submit_query(query, engine, name=name, callback=query_callback)
        print('Queued as {0}[{1}]'.format(args.queue, task.index))

    def convert_time(self, d):
        if 'time' in d.columns:
            if d['time'].dtype == np.dtype('O'):
                self.push_code("_d['time'] = pd.to_datetime(_d['time'])")
                d['time'] = pd.to_datetime(d['time'])
            else:
                self.push_code("_d['time'] = pd.to_datetime(_d['time'], unit='s')")
                d['time'] = pd.to_datetime(d['time'], unit='s')

    def pivot(self, d):
        def is_dimension(c, t):
            return c.endswith('_id') or t == np.dtype('O')
        index = d.columns[0]
        dimension = [c for c, t in zip(d.columns[1:], d.dtypes[1:]) if is_dimension(c, t)]
        measure = [c for c, t in zip(d.columns[1:], d.dtypes[1:]) if not is_dimension(c, t)]
        if len(dimension) == 0:
            self.push_code("_d.set_index({0}, inplace=True)".format(repr(index)))
            d.set_index(index, inplace=True)
            return d
        if len(dimension) == 1:
            dimension = dimension[0]
        if len(measure) == 1:
            measure = measure[0]
        self.push_code("_d = _d.pivot({0}, {1}, {2})".format(repr(index), repr(dimension), repr(measure)))
        return d.pivot(index, dimension, measure)

    def post_process(self, d, args):
        ip = IPython.get_ipython()

        # convert 'time' to datetime
        self.convert_time(d)

        # pivot_table
        if args.pivot:
            d = self.pivot(d)
        elif 'time' in d.columns:
            self.push_code("_d.set_index('time', inplace=True)")
            d.set_index('time', inplace=True)

        # return value
        r = d
        if args.out:
            self.push_code("{0} = _d".format(args.out))
            ip.push({args.out: d})
            r = None
        if args.out_file:
            if args.out_file[0] in ["'", '"']:
                path = os.path.expanduser(ip.ev(args.out_file))
            else:
                path = os.path.expanduser(args.out_file)
            if d.index.name:
                self.push_code("_d.to_csv({0})".format(repr(path)))
                d.to_csv(path)
            else:
                self.push_code("_d.to_csv({0}, index=False)".format(repr(path)))
                d.to_csv(path, index=False)
            print("INFO: saved to '{0}'".format(path))
            r = None
        if args.plot:
            self.push_code("_d.plot()")
            r = d.plot()
        elif r is not None:
            self.push_code("_d")
        return r

    def run_query(self, engine_type, line, cell):
        ip = get_ipython()

        try:
            args = self.parse_args(engine_type, line)
        except SystemExit:
            return

        self.code_list = []
        self.push_code("# translated code")
        query = self.build_query(cell)
        engine = self.build_engine(engine_type, args)

        # queue
        if args.queue:
            return self.submit_query(query, engine, args)

        # read_td_query
        self.push_code("_d = td.read_td_query(_q, _e)")
        if args.dry_run:
            return self.display_code_block()
        d = td.read_td_query(query, engine)

        # output
        r = self.post_process(d, args)
        if args.verbose:
            self.display_code_block()
        return r

    @magic.cell_magic
    def td_hive(self, line, cell):
        return self.run_query('hive', line, cell)

    @magic.cell_magic
    def td_pig(self, line, cell):
        return self.run_query('pig', line, cell)

    @magic.cell_magic
    def td_presto(self, line, cell):
        return self.run_query('presto', line, cell)

# extension

def load_ipython_extension(ipython):
    ipython.push('get_td_magic_context')
    ipython.register_magics(DatabasesMagics)
    ipython.register_magics(TablesMagics)
    ipython.register_magics(JobsMagics)
    ipython.register_magics(UseMagics)
    ipython.register_magics(QueryMagics)

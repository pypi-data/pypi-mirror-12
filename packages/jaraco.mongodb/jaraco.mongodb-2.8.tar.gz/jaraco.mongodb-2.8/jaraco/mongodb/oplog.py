from __future__ import unicode_literals, absolute_import

import argparse
import time
import json
import logging
import pymongo
import bson
import re
import textwrap


def parse_args(*args, **kwargs):
    parser = argparse.ArgumentParser(add_help=False)

    parser.add_argument("--help",
        help="show usage information",
        action="help")

    parser.add_argument("--from", metavar="host[:port]", dest="fromhost",
        help="host to pull from")

    parser.add_argument('--oplogns', default='local.oplog.rs',
        help="source namespace for oplog")

    parser.add_argument("-h", "--host", "--to", metavar="host[:port]",
        default="localhost",
        help="mongo host to push to (<set name>/s1,s2 for sets)")

    parser.add_argument("-p", "--port", metavar="host[:port]",
        default=27017, type=int,
        help="server port. Can also use --host hostname:port")

    parser.add_argument("-s", "--seconds", type=int, default=None,
        help="""seconds to go back. If not set, try read
        timestamp from --resume-file. If the file not found,
        assume --seconds=86400 (24 hours)""")

    parser.add_argument("-f", "--follow", action="store_true",
        help="wait for new data in oplog, run forever.")

    parser.add_argument("--ns", nargs="*", default=[],
        help="this namespace(s) only ('dbname' or 'dbname.coll')")

    parser.add_argument("-x", "--exclude", nargs="*", default=[],
        help="exclude namespaces ('dbname' or 'dbname.coll')")

    parser.add_argument("--rename", nargs="*", default=[],
        metavar="ns_old=ns_new",
        type=rename_item,
        help="rename namespaces before processing on dest")

    help = textwrap.dedent("""
        resume from timestamp read from this file and
        write last processed timestamp back to this file
        (default is %(default)s).
        Pass empty string or 'none' to disable this
        feature.
        """)
    parser.add_argument("--resume-file", default="mongooplog.ts",
        metavar="FILENAME",
        help=help,
    )
    parser.add_argument('-l', '--log-level', default=logging.INFO,
        type=log_level, help="Set log level (DEBUG, INFO, WARNING, ERROR)")

    args = parser.parse_args(*args, **kwargs)
    args.rename = dict(args.rename)
    return args

def log_level(level_string):
    """
    Return a log level for a string
    """
    return getattr(logging, level_string.upper())

def rename_item(spec):
    """
    Return a pair of old namespace (regex) to the new namespace (string).

    spec should be a pair separated by equal sign ('=').
    """
    old_ns, new_ns = spec.split('=')
    regex = re.compile(r"^{0}(\.|$)".format(re.escape(old_ns)))

    return regex, new_ns + "."

def _calculate_start(args):
    """
    Return the start time as a bson timestamp.
    """
    utcnow = int(time.time())

    if args.seconds:
        return bson.timestamp.Timestamp(utcnow - args.seconds, 0)

    day_ago = bson.timestamp.Timestamp(utcnow - 24*60*60, 0)
    return read_ts(args.resume_file) or day_ago

def main():
    args = parse_args()
    log_format = '%(asctime)s - %(levelname)s - %(message)s'
    logging.basicConfig(level=args.log_level, format=log_format)

    logging.info("going to connect")

    src = pymongo.MongoClient(args.fromhost)
    dest = pymongo.MongoClient(args.host, args.port)

    if src == dest:
        if any(not any(exp.match(ns) for exp in args.rename) for ns in args.ns) or not args.ns:
            logging.error(
                "source and destination hosts can be the same only "
                "when both --ns and --rename arguments are given")
            return 1

    logging.info("connected")

    start = _calculate_start(args)

    logging.info("starting from %s", start)
    db_name, sep, coll_name = args.oplogns.partition('.')
    oplog_coll = src[db_name][coll_name]
    num = 0

    class_ = TailingOplog if args.follow else Oplog
    generator = class_(oplog_coll)

    try:
        for num, doc in enumerate(generator.since(start)):
            _handle(dest, doc, args, num)
        logging.info("all done")
    except KeyboardInterrupt:
        logging.info("Got Ctrl+C, exiting...")
    finally:
        if 'doc' in locals():
            save_ts(doc['ts'], args.resume_file)

def _handle(dest, op, args, num):
    # Skip "no operation" items
    if op['op'] == 'n':
        return

    # Update status
    ts = op['ts']
    if not num % 1000:
        save_ts(ts, args.resume_file)
        logging.info(
            "%s\t%s\t%s -> %s",
            num, ts.as_datetime(),
            op.get('op'),
            op.get('ns'),
        )

    # Skip excluded namespaces or namespaces that does not match --ns
    excluded = any(op['ns'].startswith(ns) for ns in args.exclude)
    included = any(op['ns'].startswith(ns) for ns in args.ns)

    if excluded or (args.ns and not included):
        logging.debug("skipping ns %s", op['ns'])
        return

    # Rename namespaces
    for old_ns, new_ns in args.rename.items():
        if old_ns.match(op['ns']):
            ns = old_ns.sub(new_ns, op['ns']).rstrip(".")
            logging.debug("renaming %s to %s", op['ns'], ns)
            op['ns'] = ns

    # Apply operation
    try:
        dbname = op['ns'].split('.')[0] or "admin"
        dest[dbname].command("applyOps", [op])
    except pymongo.errors.OperationFailure as e:
        logging.warning(repr(e))

class Oplog(object):
    def __init__(self, coll):
        self.coll = coll

    def get_latest_ts(self):
        cur = self.coll.find().sort('$natural', pymongo.DESCENDING).limit(-1)
        latest_doc = next(cur)
        return latest_doc['ts']

    def query(self, spec):
        return self.coll.find(spec)

    def since(self, ts):
        """
        Query the oplog for items since ts and then return
        """
        spec = {'ts': {'$gt': ts}}
        cursor = self.query(spec)
        while True:
            # todo: trap InvalidDocument errors:
            # except bson.errors.InvalidDocument as e:
            #  logging.info(repr(e))
            for doc in cursor:
                yield doc
            if not cursor.alive:
                break
            time.sleep(1)


class TailingOplog(Oplog):
    def query(self, spec):
        cur = self.coll.find(spec, tailable=True, await_data=True)
        # set the oplogReplay flag - not exposed in the public API
        cur.add_option(8)
        return cur

    def since(self, ts):
        """
        Tail the oplog, starting from ts.
        """
        while True:
            items = super(TailingOplog, self).since(ts)
            for doc in items:
                yield doc
                ts = doc['ts']


def save_ts(ts, filename):
    """Save last processed timestamp to file. """
    try:
        if filename and filename.lower() != 'none':
            with open(filename, 'w') as f:
                obj = {"ts": {"time": ts.time, "inc":  ts.inc}}
                json.dump(obj, f)
    except IOError:
        return False
    else:
        return True

def read_ts(filename):
    """Read last processed timestamp from file. Return next timestamp that
    need to be processed, that is timestamp right after last processed one.
    """
    try:
        with open(filename, 'r') as f:
            data = json.load(f)['ts']
            ts = bson.Timestamp(data['time'], data['inc'] + 1)
            return ts

    except (IOError, KeyError):
        return None


if __name__ == '__main__':
    main()

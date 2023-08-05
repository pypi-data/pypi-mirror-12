######################################
# Setup logging before anything else #
######################################

import sys
import logging

# make twisted use standard library logging module
from twisted.python import log
observer = log.PythonLoggingObserver()
observer.start()

# setup standard logging module
LOG_FORMAT = "%(levelname)s %(name)s %(lineno)d: %(message)s"
if "--debug" in sys.argv:  # debug shows everything
    logging.basicConfig(format=LOG_FORMAT, level=logging.DEBUG)
elif "--quiet" in sys.argv:  # quiet disables logging
    logging.basicConfig(format=LOG_FORMAT, level=60)
else:  # default level INFO
    logging.basicConfig(format=LOG_FORMAT, level=logging.WARNING)


import binascii
import argparse
import time
import storjnode
import btctxstore


def _add_programm_args(parser):

    # port
    default = 4653
    parser.add_argument("--port", default=default, type=int,
                        help="Node port. Default: {0}.".format(default))

    # bootstrap
    default = None
    msg = "Optional bootstrap node. Example: 127.0.0.1:1234"
    parser.add_argument("--bootstrap", default=default,
                        help=msg.format(default))

    # key
    default = None
    msg = ("Bitcoin wif/hwif for node id, auth and signing. "
           "If not given a one will be generated.")
    parser.add_argument("--key", default=default,
                        help=msg)

    # debug
    parser.add_argument('--debug', action='store_true',
                        help="Show debug information.")

    # quiet
    parser.add_argument('--quiet', action='store_true',
                        help="Only show warning and error information.")


def _add_put(command_parser):
    parser = command_parser.add_parser(
        "put", help="Put key, value pair into DHT."
    )
    parser.add_argument("key", help="Key to retrieve value.")
    parser.add_argument("value", help="Value to insert into the DHT")


def _add_get(command_parser):
    parser = command_parser.add_parser(
        "get", help="Get value from DHT."
    )
    parser.add_argument("key", help="Key to retrieve value by.")


def _add_run(command_parser):
    command_parser.add_parser(
        "run", help="Run node and extend DHT network."
    )


def _add_version(command_parser):
    command_parser.add_parser(
        "version", help="Show version number and exit."
    )


def _add_message(command_parser):
    parser = command_parser.add_parser(
        "message", help="Send message to a peer."
    )
    parser.add_argument("id", help="ID of the peer to receive the message.")
    parser.add_argument("message", help="The message to sent the peer.")


def _add_showid(command_parser):
    command_parser.add_parser(
        "showid", help="Show node id."
    )


def _parse_args(args):
    class ArgumentParser(argparse.ArgumentParser):
        def error(self, message):
            sys.stderr.write('error: %s\n' % message)
            self.print_help()
            sys.exit(2)

    # setup parser
    description = "Low level reference node command-line interface."
    parser = ArgumentParser(description=description)
    _add_programm_args(parser)
    command_parser = parser.add_subparsers(
        title='commands', dest='command', metavar="<command>"
    )

    _add_version(command_parser)
    _add_put(command_parser)
    _add_get(command_parser)
    _add_run(command_parser)
    _add_showid(command_parser)
    _add_message(command_parser)

    # get values
    arguments = vars(parser.parse_args(args=args))
    command = arguments.pop("command")
    if not command:
        parser.error("No command given!")
    return command, arguments


def run(node, args):
    args["id"] = binascii.hexlify(node.get_id())
    print("Running node on port {port} with id {id}...".format(**args))
    while True:
        time.sleep(1)
        for received in node.get_messages():
            print("Received message: {0}".format(received["message"]))


def message(node, args):
    peerid = binascii.unhexlify(args["id"])
    result = node.send_message(peerid, args["message"])
    print("RESULT:", result)
    print("Unsuccessfully sent!" if result is None else "Successfully sent!")


def _get_bootstrap_nodes(args):
    # FIXME doesn't work with ipv6 addresses
    if args["bootstrap"] is not None:
        bootstrap = args["bootstrap"].split(":")
        return [(bootstrap[0], int(bootstrap[1]))]
    return None


def _get_key(args):
    if args["key"] is not None:
        return args["key"]
    return btctxstore.BtcTxStore().create_wallet()


def main(args):
    command, args = _parse_args(args)

    # show version
    if command == "version":
        print("v{0}".format(storjnode.__version__))
        exit(0)

    # setup node
    key = _get_key(args)
    port = args["port"]
    bootstrap_nodes = _get_bootstrap_nodes(args)
    node = storjnode.network.BlockingNode(key, port=port,
                                          bootstrap_nodes=bootstrap_nodes)

    print("Giving node 12sec to find peers ...")
    time.sleep(12)

    if command == "run":
        run(node, args)
    elif command == "put":
        node[args["key"]] = args["value"]
        print("Put '{key}' => '{value}'!".format(**args))
    elif command == "get":
        value = node[args["key"]]
        print("Got '{key}' => '{value}'!".format(key=args["key"], value=value))
    elif command == "message":
        message(node, args)
    elif command == "showid":
        print("Node id: {0}".format(binascii.hexlify(node.get_id())))

    print("Stopping node")
    node.stop_reactor()

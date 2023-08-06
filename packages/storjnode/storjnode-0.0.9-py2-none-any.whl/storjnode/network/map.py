import os
import time
import logging
import binascii
from kademlia.node import Node
from crochet import TimeoutError
from threading import Thread
from threading import RLock
from graphviz import Digraph
from storjnode import util
from storjnode.network.server import QUERY_TIMEOUT


_log = logging.getLogger(__name__)


class _NetworkMapper(object):  # will not scale but good for now

    def __init__(self, storjnode, worker_num=32):
        """Network crawler used to map the network.

        Args:
            storjnode: Node used to crawl the network.
            worker_num: Number of workers used to crawl the network.
        """
        # pipeline: toscan -> scanning -> scanned
        self.toscan = {}  # {id: (ip, port)}
        self.scanning = {}  # {id: (ip, port)}
        self.scanned = {}  # {id: {"addr":(ip, port), "peers":[(id, ip, port)]}}

        self.mutex = RLock()
        self.server = storjnode.server
        self.worker_num = worker_num

        # start crawl at self
        self.toscan[storjnode.get_id()] = ("127.0.0.1", storjnode.port)

    def get_next_node(self):
        """Moves node from toscan to scanning.

        Returns moved node or None if toscan is empty.
        """
        with self.mutex:
            if len(self.toscan) > 0:
                node_id, transport_address = self.toscan.popitem()
                self.scanning[node_id] = transport_address
                return Node(node_id, transport_address[0], transport_address[1])
            else:
                return None

    def processed(self, node, neighbours):
        """Move node from scanning to scanned and add new nodes to pipeline."""
        with self.mutex:
            del self.scanning[node.id]
            self.scanned[node.id] = {
                "addr": (node.ip, node.port), "peers": neighbours
            }
            for peer in neighbours:
                peer = Node(*peer)
                if(peer.id not in self.scanning and
                        peer.id not in self.scanned):
                    self.toscan[peer.id] = (peer.ip, peer.port)

    def worker(self):
        """Process nodes from toscan to scanned until network walked."""
        while True:
            time.sleep(0.002)

            # get next node to scan
            with self.mutex:
                node = self.get_next_node()
                if node is None and len(self.scanning) == 0:
                    return  # done! Nothing to scan and nothing being scanned

            # no node to scan but other workers still scanning, so more may come
            if node is None:
                continue

            # get neighbors
            d = self.server.protocol.callFindNode(node, node)
            d = util.default_defered(d, [])
            try:
                neighbours = util.wait_for_defered(d, timeout=QUERY_TIMEOUT)
            except TimeoutError:  # pragma: no cover
                msg = "Timeout when getting neighbors of %s"  # pragma: no cover
                hexid = binascii.hexlify(node.id)
                _log.debug(msg % hexid)  # pragma: no cover
                neighbours = []  # pragma: no cover

            # add to results and neighbours to scanned
            self.processed(node, neighbours)

    def crawl(self):
        """Start workers and block until network is crawled."""
        workers = [Thread(target=self.worker) for i in range(self.worker_num)]
        for worker in workers:
            worker.start()
        for worker in workers:
            worker.join()
        return self.scanned


def render(network_map, path, name, view=True):

    dot = Digraph(comment=name, engine="circo")

    # add nodes
    for nodeid, results in network_map.items():
        nodehexid = binascii.hexlify(nodeid)
        ip, port = results["addr"]
        label = "%s\n%s:%i" % (nodehexid, ip, port)
        dot.node(nodehexid, label)

    # add connections
    for nodeid, results in network_map.items():
        nodehexid = binascii.hexlify(nodeid)
        for peerid, ip, port in results["peers"]:
            peerhexid = binascii.hexlify(peerid)
            dot.edge(nodehexid, peerhexid, constraint='false')

    # render graph
    dot.render(os.path.join(path, '%s.gv' % name), view=view)


def generate(storjnode, worker_num=32):
    """Crawl the network to get a map of all nodes and connections.

    Args:
        storjnode: Node used to crawl the network.
        worker_num: Number of workers used to crawl the network.

    Returns: {
            nodeid: {"addr":(ip, port), "peers":[(id, ip, port)]},
        }
    """
    return _NetworkMapper(storjnode, worker_num=worker_num).crawl()

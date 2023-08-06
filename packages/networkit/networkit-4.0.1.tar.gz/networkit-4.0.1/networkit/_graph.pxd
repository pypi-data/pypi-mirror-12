# type imports
from libc.stdint cimport uint64_t
from libc.stdint cimport int64_t

# the C++ standard library
from libcpp cimport bool
from libcpp.vector cimport vector
from libcpp.utility cimport pair
from libcpp.map cimport map
from libcpp.set cimport set
from libcpp.stack cimport stack
from libcpp.string cimport string
from libcpp.unordered_set cimport unordered_set
from libcpp.unordered_map cimport unordered_map

# NetworKit typedefs
ctypedef uint64_t count
ctypedef uint64_t index
ctypedef uint64_t edgeid
ctypedef index node
ctypedef index cluster
ctypedef double edgeweight

cdef extern from "cpp/graph/Graph.h" namespace "NetworKit":
	cdef cppclass Graph:
		Graph() except +
		Graph(count, bool, bool) except +
		Graph(const Graph& other) except +
		Graph(const Graph& other, bool weighted, bool directed) except +
		void indexEdges() except +
		bool hasEdgeIds() except +
		edgeid edgeId(node, node) except +
		count numberOfNodes() except +
		count numberOfEdges() except +
		pair[count, count] size() except +
		index upperNodeIdBound() except +
		index upperEdgeIdBound() except +
		count degree(node u) except +
		count degreeIn(node u) except +
		count degreeOut(node u) except +
		bool isIsolated(node u) except +
		Graph copyNodes() except +
		node addNode() except +
		void removeNode(node u) except +
		bool hasNode(node u) except +
		void addEdge(node u, node v, edgeweight w) except +
		void setWeight(node u, node v, edgeweight w) except +
		void removeEdge(node u, node v) except +
		void removeSelfLoops() except +
		void swapEdge(node s1, node t1, node s2, node t2) except +
		void compactEdges() except +
		void sortEdges() except +
		bool hasEdge(node u, node v) except +
		edgeweight weight(node u, node v) except +
		vector[node] nodes() except +
		vector[pair[node, node]] edges() except +
		vector[node] neighbors(node u) except +
		#void forEdges[Callback](Callback c) except +
		#void forNodes[Callback](Callback c) except +
		#void forNodePairs[Callback](Callback c) except +
		#void forNodesInRandomOrder[Callback](Callback c) except +
		#void forEdgesOf[Callback](node u, Callback c) except +
		#void forInEdgesOf[Callback](node u, Callback c) except +
		bool isWeighted() except +
		bool isDirected() except +
		string toString() except +
		string getName() except +
		void setName(string name) except +
		edgeweight totalEdgeWeight() except +
		node randomNode() except +
		node randomNeighbor(node) except +
		pair[node, node] randomEdge() except +
		#Point[float] getCoordinate(node v) except +
		#void setCoordinate(node v, Point[float] value) except +
		void initCoordinates() except +
		count numberOfSelfLoops() except +
		Graph toUndirected() except +
		Graph transpose() except +
		#void BFSfromNode "BFSfrom"[Callback] (node r, Callback c) except +
		#void BFSfrom[Callback](vector[node] startNodes, Callback c) except +
		#void BFSEdgesFrom[Callback](node r, Callback c) except +
		#void DFSfrom[Callback](node r, Callback c) except +
		#void DFSEdgesFrom[Callback](node r, Callback c) except +
=========
nxbimatch
=========

The nxbimatch package is for generation of matchings in bipartite graphs.
The prefix "nx" means that the package is based on NetworkX.


Usage
=====

You need NetworkX installed.  I use with 1.7 but older versions may work.
Then, Install the bimatch.py file into your site-packages.

Example::

   >>> import bimatch
   >>> G = bimatch.bipartite_graph(
   ...    [0, 1, 2], # first vertex set
   ...    [3, 4, 5], # second vertex set
   ...    [(0, 3), (0, 4), (1, 3), (1, 5), (2, 4), (2, 5)] # edge set
   ... )
   >>> for matching in bimatch.generate_maximum_matchings(G):
   ...    # do your tasks with matching

Currently, only maximum matchings can be generated.
If the graph has a perfect matching, then generate
through perfect matchings generator runs slightly faster.
Each matching is generated as a set of edges.
Each edge is represented as a tuple of two vertices. 


License
=======
The BSD 2-clause license.


Contact
=======
MATSUI Tetsushi <VED03370@nifty.ne.jp>

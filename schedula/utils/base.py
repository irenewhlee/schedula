#!/usr/bin/env python
# -*- coding: UTF-8 -*-
#
# Copyright 2015-2020, Vincenzo Arcidiacono;
# Licensed under the EUPL (the 'Licence');
# You may not use this work except in compliance with the Licence.
# You may obtain a copy of the Licence at: http://ec.europa.eu/idabc/eupl

"""
It provides a base class for dispatcher objects.
"""

import copy
from .cst import NONE


class Base:
    """Base class for dispatcher objects."""
    def __deepcopy__(self, memo):
        cls = self.__class__
        memo[id(self)] = result = cls.__new__(cls)
        for k, v in self.__dict__.items():
            # noinspection PyArgumentList
            setattr(result, k, copy.deepcopy(v, memo))
        return result

    def web(self, depth=-1, node_data=NONE, node_function=NONE, directory=None,
            sites=None, run=True):
        """
        Creates a dispatcher Flask app.

        :param depth:
            Depth of sub-dispatch plots. If negative all levels are plotted.
        :type depth: int, optional

        :param node_data:
            Data node attributes to view.
        :type node_data: tuple[str], optional

        :param node_function:
            Function node attributes to view.
        :type node_function: tuple[str], optional

        :param directory:
            Where is the generated Flask app root located?
        :type directory: str, optional

        :param sites:
            A set of :class:`~schedula.utils.drw.Site` to maintain alive the
            backend server.
        :type sites: set[~schedula.utils.drw.Site], optional

        :param run:
            Run the backend server?
        :type run: bool, optional

        :return:
            A WebMap.
        :rtype: ~schedula.utils.web.WebMap

        Example:

        From a dispatcher like this:

        .. dispatcher:: dsp
           :opt: graph_attr={'ratio': '1'}
           :code:

            >>> from schedula import Dispatcher
            >>> dsp = Dispatcher(name='Dispatcher')
            >>> def fun(a):
            ...     return a + 1, a - 1
            >>> dsp.add_function('fun', fun, ['a'], ['b', 'c'])
            'fun'

        You can create a web server with the following steps::

            >>> webmap = dsp.web()
            >>> print("Starting...\\n"); site = webmap.site().run(); site
            Starting...
            Site(WebMap([(Dispatcher, WebMap())]), host='localhost', ...)
            >>> import requests
            >>> url = '%s/%s/%s' % (site.url, dsp.name, fun.__name__)
            >>> requests.post(url, json={'args': (0,)}).json()['return']
            [1, -1]
            >>> site.shutdown()  # Remember to shutdown the server.
            True

        .. note::
           When :class:`~schedula.utils.drw.Site` is garbage collected, the
           server is shutdown automatically.
        """

        options = {'node_data': node_data, 'node_function': node_function}
        options = {k: v for k, v in options.items() if v is not NONE}
        from .web import WebMap
        from .sol import Solution

        obj = self.dsp if isinstance(self, Solution) else self

        webmap = WebMap()
        webmap.add_items(obj, workflow=False, depth=depth, **options)

        if sites is not None:
            import tempfile
            directory = directory or tempfile.mkdtemp()
            sites.add(webmap.site(directory, view=run))

        return webmap

    def plot(self, workflow=None, view=True, depth=-1, name=NONE, comment=NONE,
             format=NONE, engine=NONE, encoding=NONE, graph_attr=NONE,
             node_attr=NONE, edge_attr=NONE, body=NONE, node_styles=NONE,
             node_data=NONE, node_function=NONE, edge_data=NONE, max_lines=NONE,
             max_width=NONE, directory=None, sites=None, index=False):
        """
        Plots the Dispatcher with a graph in the DOT language with Graphviz.

        :param workflow:
           If True the latest solution will be plotted, otherwise the dmap.
        :type workflow: bool, optional

        :param view:
            Open the rendered directed graph in the DOT language with the sys
            default opener.
        :type view: bool, optional

        :param edge_data:
            Edge attributes to view.
        :type edge_data: tuple[str], optional

        :param node_data:
            Data node attributes to view.
        :type node_data: tuple[str], optional

        :param node_function:
            Function node attributes to view.
        :type node_function: tuple[str], optional

        :param node_styles:
            Default node styles according to graphviz node attributes.
        :type node_styles: dict[str|Token, dict[str, str]]

        :param depth:
            Depth of sub-dispatch plots. If negative all levels are plotted.
        :type depth: int, optional

        :param name:
            Graph name used in the source code.
        :type name: str

        :param comment:
            Comment added to the first line of the source.
        :type comment: str

        :param directory:
            (Sub)directory for source saving and rendering.
        :type directory: str, optional

        :param format:
            Rendering output format ('pdf', 'png', ...).
        :type format: str, optional

        :param engine:
            Layout command used ('dot', 'neato', ...).
        :type engine: str, optional

        :param encoding:
            Encoding for saving the source.
        :type encoding: str, optional

        :param graph_attr:
            Dict of (attribute, value) pairs for the graph.
        :type graph_attr: dict, optional

        :param node_attr:
            Dict of (attribute, value) pairs set for all nodes.
        :type node_attr: dict, optional

        :param edge_attr:
            Dict of (attribute, value) pairs set for all edges.
        :type edge_attr: dict, optional

        :param body:
            Dict of (attribute, value) pairs to add to the graph body.
        :type body: dict, optional

        :param directory:
            Where is the generated Flask app root located?
        :type directory: str, optional

        :param sites:
            A set of :class:`~schedula.utils.drw.Site` to maintain alive the
            backend server.
        :type sites: set[~schedula.utils.drw.Site], optional

        :param index:
            Add the site index as first page?
        :type index: bool, optional

        :param max_lines:
            Maximum number of lines for rendering node attributes.
        :type max_lines: int, optional

        :param max_width:
            Maximum number of characters in a line to render node attributes.
        :type max_width: int, optional

        :param view:
            Open the main page of the site?
        :type view: bool, optional

        :return:
            A SiteMap.
        :rtype: schedula.utils.drw.SiteMap

        Example:

        .. dispatcher:: dsp
           :opt: graph_attr={'ratio': '1'}
           :code:

            >>> from schedula import Dispatcher
            >>> dsp = Dispatcher(name='Dispatcher')
            >>> def fun(a):
            ...     return a + 1, a - 1
            >>> dsp.add_function('fun', fun, ['a'], ['b', 'c'])
            'fun'
            >>> dsp.plot(view=False, graph_attr={'ratio': '1'})
            SiteMap([(Dispatcher, SiteMap())])
        """

        d = {
            'name': name, 'comment': comment, 'format': format,
            'engine': engine, 'encoding': encoding, 'graph_attr': graph_attr,
            'node_attr': node_attr, 'edge_attr': edge_attr, 'body': body,
        }
        options = {
            'digraph': {k: v for k, v in d.items() if v is not NONE} or NONE,
            'node_styles': node_styles,
            'node_data': node_data,
            'node_function': node_function,
            'edge_data': edge_data,
            'max_lines': max_lines,  # 5
            'max_width': max_width,  # 200
        }
        options = {k: v for k, v in options.items() if v is not NONE}
        from .drw import SiteMap
        from .sol import Solution

        if workflow is None and isinstance(self, Solution):
            workflow = True
        else:
            workflow = workflow or False

        sitemap = SiteMap()
        sitemap.add_items(self, workflow=workflow, depth=depth, **options)
        if view:
            import tempfile
            directory = directory or tempfile.mkdtemp()
            if sites is None:
                sitemap.render(directory=directory, view=True, index=index)
            else:
                sites.add(sitemap.site(directory, view=True, index=index))
        return sitemap

    def get_node(self, *node_ids, node_attr=NONE):
        """
        Returns a sub node of a dispatcher.

        :param node_ids:
            A sequence of node ids or a single node id. The id order identifies
            a dispatcher sub-level.
        :type node_ids: str

        :param node_attr:
            Output node attr.

            If the searched node does not have this attribute, all its
            attributes are returned.

            When 'auto', returns the "default" attributes of the searched node,
            which are:

              - for data node: its output, and if not exists, all its
                attributes.
              - for function and sub-dispatcher nodes: the 'function' attribute.

            When 'description', returns the "description" of the searched node,
            searching also in function or sub-dispatcher input/output
            description.

            When 'output', returns the data node output.

            When 'default_value', returns the data node default value.

            When 'value_type', returns the data node value's type.

            When `None`, returns the node attributes.
        :type node_attr: str, None, optional

        :return:
            Node attributes and its real path.
        :rtype: (T, (str, ...))

        **Example**:

        .. dispatcher:: o
           :opt: graph_attr={'ratio': '1'}, depth=-1

            >>> import schedula as sh
            >>> sub_dsp = sh.Dispatcher(name='Sub-dispatcher')
            >>> def fun(a, b):
            ...     return a + b
            ...
            >>> sub_dsp.add_function('a + b', fun, ['a', 'b'], ['c'])
            'a + b'
            >>> dispatch = sh.SubDispatch(sub_dsp, ['c'], output_type='dict')
            >>> dsp = sh.Dispatcher(name='Dispatcher')
            >>> dsp.add_function('Sub-dispatcher', dispatch, ['a'], ['b'])
            'Sub-dispatcher'

            >>> o = dsp.dispatch(inputs={'a': {'a': 3, 'b': 1}})
            ...

        Get the sub node output::

            >>> dsp.get_node('Sub-dispatcher', 'c')
            (4, ('Sub-dispatcher', 'c'))
            >>> dsp.get_node('Sub-dispatcher', 'c', node_attr='type')
            ('data', ('Sub-dispatcher', 'c'))

        .. dispatcher:: sub_dsp
           :opt: workflow=True, graph_attr={'ratio': '1'}
           :code:

            >>> sub_dsp, sub_dsp_id = dsp.get_node('Sub-dispatcher')
        """
        kw = {}

        from .sol import Solution
        if node_attr is NONE:
            node_attr = 'output' if isinstance(self, Solution) else 'auto'

        if isinstance(self, Solution):
            kw['solution'] = self

        from .alg import get_sub_node
        dsp = getattr(self, 'dsp', self)

        # Returns the node.
        return get_sub_node(dsp, node_ids, node_attr=node_attr, **kw)

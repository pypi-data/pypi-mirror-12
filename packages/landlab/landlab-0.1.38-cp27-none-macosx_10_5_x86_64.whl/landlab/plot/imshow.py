#! /usr/bin/env python

import numpy as np
import inspect
from landlab.field.scalar_data_fields import FieldError
try:
    import matplotlib.pyplot as plt
except ImportError:
    import warnings
    warnings.warn('matplotlib not found', ImportWarning)

from landlab.grid.raster import RasterModelGrid
from landlab.grid.voronoi import VoronoiDelaunayGrid


def assert_array_size_matches(array, size, msg=None):
    if size != array.size:
        if msg is None:
            msg = '%d != %d' % (size, array.size)
        raise ValueError(msg)


def imshow_node_grid(grid, values, **kwds):
    """Prepare a map view of data over all nodes in the grid.

    Data is plotted with the surrounding cell shaded with the value
    at the node at its center. Outer edges of perimeter cells are
    extrapolated. Closed nodes are colored uniformly (default black,
    overridden with kwd 'color_for_closed'); other open boundary nodes get
    their actual values.

    Parameters
    ----------
    grid : RasterModelGrid
        Grid containing node field to plot.
    values : array_like or str
        Node values or a field name as a string from which to draw the data.
    var_name : str, optional
        Name of the variable to put in plot title.
    var_units : str, optional
        Units for the variable being plotted.
    grid_units : tuple of str
        Units for y, and x dimensions.
    symmetric_cbar : bool
        Make the colormap symetric about 0.
    cmap : str
        Name of a colormap
    limits : tuple of float
        Minimum and maximum of the colorbar.
    vmin, vmax: floats
        Alternatives to limits
    allow_colorbar : bool
        If True, include the colorbar.
    norm : matplotlib.colors.Normalize
        The normalizing object which scales data, typically into the interval
        [0, 1].
    shrink : float
        Fraction by which to shrink the colorbar.
    color_for_closed : str
        Color to use for closed nodes (default 'black')
    show_elements : bool
        If True, and grid is a Voronoi, extra grid elements (nodes, faces,
        corners) will be plotted along with just the colour of the cell
        (defaults False).

    Use matplotlib functions like xlim, ylim to modify your
    plot after calling imshow_node_grid, as desired.
    """
    if type(values) == str:
        value_str = values
        values = grid.at_node[values]

    assert_array_size_matches(values, grid.number_of_nodes,
                              'number of values does not match number of nodes')

    data = values.view()

    if RasterModelGrid in inspect.getmro(grid.__class__):
        data.shape = grid.shape
        data = np.ma.masked_where((grid.status_at_node == 4).reshape(grid.shape),
                              data)
    else:
        data = np.ma.masked_where(grid.status_at_node == 4, data)

    myimage = _imshow_grid_values(grid, data, **kwds)

    try:
        plt.title(value_str)
    except NameError:
        pass

    return myimage


def imshow_active_node_grid(grid, values, other_node_val='min', **kwds):
    """
    Prepares a map view of data over only the active (i.e., not closed) nodes
    in the grid.
    Method can take any of the same **kwds as imshow().

    requires:
    grid: the grid
    values: the values on the open, active nodes OR the values on all nodes in
    the grid. If the latter is provided, this method will only plot the active
    subset.

    If *other_node_val* is set, this is the value that will be displayed for
    all nodes that are not active. It defaults to 'min', which is the minimum
    value found on any active node in the grid.
    """
    active_nodes = grid.active_nodes
    try:
        assert_array_size_matches(values, active_nodes.size,
                                  'number of values does not match number of active nodes')
    except ValueError:
        assert_array_size_matches(values[active_nodes], active_nodes.size,
                                  'number of values does not match number of active nodes')
        values_to_use = values[active_nodes]
    else:
        values_to_use = values

    data = np.zeros(grid.number_of_nodes)
    if other_node_val != 'min':
        data.fill(other_node_val)
    else:
        data.fill(np.min(values_to_use))
    data[active_nodes] = values_to_use.flat

    if RasterModelGrid in inspect.getmro(grid.__class__):
        data.shape = grid.shape

    myimage = _imshow_grid_values(grid, data, **kwds)

    if type(values) == str:
        plt.title(values)

    return myimage


def imshow_core_node_grid(grid, values, other_node_val='min', **kwds):
    """
    Prepares a map view of data over only the core nodes
    in the grid.
    Method can take any of the same **kwds as imshow().

    requires:
    grid: the grid
    values: the values on the core nodes OR the values on all nodes in
    the grid. If the latter is provided, this method will only plot the core
    subset. Alternatively, can be a string giving the name of a grid field,
    defined either on core nodes or all nodes.

    If *other_node_val* is set, this is the value that will be displayed for
    all nodes that are not core. It defaults to 'min', which is the minimum
    value found on any core node in the grid.
    """
    active_nodes = grid.core_nodes

    if type(values) == str:
        value_str = values
        try:
            values = grid.at_core_node[values]
        except FieldError:
            values = grid.at_node[values][active_nodes]

    try:
        assert_array_size_matches(values, active_nodes.size,
                                  'number of values does not match number of active nodes')
    except ValueError:
        assert_array_size_matches(values[active_nodes], active_nodes.size,
                                  'number of values does not match number of active nodes')
        values_to_use = values[active_nodes]
    else:
        values_to_use = values

    data = np.zeros(grid.number_of_nodes)
    if other_node_val != 'min':
        data.fill(other_node_val)
    else:
        data.fill(np.min(values_to_use))
    data[active_nodes] = values_to_use.flat

    if RasterModelGrid in inspect.getmro(grid.__class__):
        data.shape = grid.shape

    myimage = _imshow_grid_values(grid, data, **kwds)

    try:
        plt.title(value_str)
    except NameError:
        pass

    return myimage


def imshow_cell_grid(grid, values, **kwds):
    """
    Prepares a map view of data over all cells in the grid.
    Method can take any of the same **kwds as imshow().

    requires:
    grid: the grid
    values: the values on the cells OR the values on all nodes in the grid, from
    which the cell values will be extracted. Alternatively, can be a field
    name (string) from which to draw the data from the grid.
    """
    cells = grid.node_at_cell

    if type(values) == str:
        value_str = values
        try:
            values = grid.at_cell[values]
        except FieldError:
            values = grid.at_node[values][cells]

    try:
        assert_array_size_matches(values, cells.size,
                                  'number of values does not match number of cells')
    except ValueError:
        assert_array_size_matches(values[cells], cells.size,
                                  'number of values does not match number of cells')
        values_to_use = values[cells]
    else:
        values_to_use = values

    data = values_to_use.view()
    if RasterModelGrid in inspect.getmro(grid.__class__):
        data.shape = (grid.shape[0] - 2, grid.shape[1] - 2)

    myimage = _imshow_grid_values(grid, data, **kwds)

    try:
        plt.title(value_str)
    except NameError:
        pass

    return myimage


def imshow_active_cell_grid(grid, values, other_node_val='min', **kwds):
    """
    Prepares a map view of data over all active (i.e., core and open boundary)
    cells in the grid.
    Method can take any of the same **kwds as imshow().

    requires:
    grid: the grid
    values: the values on the active cells OR the values on all nodes in the
    grid, from which the active cell values will be extracted.

    If *other_node_val* is set, this is the value that will be displayed for
    all cells that are not active. It defaults to 'min', which is the minimum
    value found on any active cell in the grid.
    """

    active_cells = grid.node_at_core_cell

    try:
        assert_array_size_matches(values, active_cells.size,
                                  'number of values does not match number of active cells')
    except ValueError:
        assert_array_size_matches(values[active_cells], active_cells.size,
                                  'number of values does not match number of active cells')
        values_to_use = values[active_cells]
    else:
        values_to_use = values

    data = np.zeros(grid.number_of_nodes)
    if other_node_val != 'min':
        data.fill(other_node_val)
    else:
        data.fill(np.min(values_to_use))
    data[active_cells] = values_to_use
    data = data[grid.node_at_cell]
    if RasterModelGrid in inspect.getmro(grid.__class__):
        data.shape = (grid.shape[0] - 2, grid.shape[1] - 2)

    myimage = _imshow_grid_values(grid, data, **kwds)

    return myimage


def _imshow_grid_values(grid, values, var_name=None, var_units=None,
                        grid_units=(None, None), symmetric_cbar=False,
                        cmap='pink', limits=None, allow_colorbar=True,
                        vmin=None, vmax=None,
                        norm=None, shrink=1., color_for_closed='black',
                        show_elements=False):

    gridtypes = inspect.getmro(grid.__class__)

    cmap = plt.get_cmap(cmap)
    cmap.set_bad(color=color_for_closed)

    if RasterModelGrid in gridtypes:
        if len(values.shape) != 2:
            raise ValueError(
                'dimension of values must be 2 (%s)' % values.shape)

        y = np.arange(values.shape[0] + 1) * grid.dx - grid.dx * .5
        x = np.arange(values.shape[1] + 1) * grid.dx - grid.dx * .5

        kwds = dict(cmap=cmap)
        (kwds['vmin'], kwds['vmax']) = (values.min(), values.max())
        # ^default condition
        if (limits is None) and ((vmin is None) and (vmax is None)):
            if symmetric_cbar:
                (var_min, var_max) = (values.min(), values.max())
                limit = max(abs(var_min), abs(var_max))
                (kwds['vmin'], kwds['vmax']) = (- limit, limit)
            else:
                pass
        elif limits is not None:
            (kwds['vmin'], kwds['vmax']) = (limits[0], limits[1])
        else:
            if vmin is not None:
                kwds['vmin'] = vmin
            if vmax is not None:
                kwds['vmax'] = vmax

        myimage = plt.pcolormesh(x, y, values, **kwds)

        plt.gca().set_aspect(1.)
        plt.autoscale(tight=True)

        if allow_colorbar:
            plt.colorbar(norm=norm, shrink=shrink)

        plt.xlabel('X (%s)' % grid_units[1])
        plt.ylabel('Y (%s)' % grid_units[0])

        if var_name is not None:
            plt.title('%s (%s)' % (var_name, var_units))

        # plt.show()

    elif VoronoiDelaunayGrid in gridtypes:
        # This is still very much ad-hoc, and needs prettifying.
        # We should save the modifications needed to plot color all the way
        # to the diagram edge *into* the grid, for faster plotting.
        # (see http://stackoverflow.com/questions/20515554/colorize-voronoi-diagram)
        # (This technique is not implemented yet)
        from scipy.spatial import voronoi_plot_2d
        import matplotlib.colors as colors
        import matplotlib.cm as cmx
        cm = plt.get_cmap(cmap)
        if limits is None:
            # only want to work with NOT CLOSED nodes
            open_nodes = grid.status_at_node != 4
            if symmetric_cbar:
                (var_min, var_max) = (values.flat[
                    open_nodes].min(), values.flat[open_nodes].max())
                limit = max(abs(var_min), abs(var_max))
                (vmin, vmax) = (- limit, limit)
            else:
                (vmin, vmax) = (values.flat[
                    open_nodes].min(), values.flat[open_nodes].max())
        else:
            (vmin, vmax) = (limits[0], limits[1])
        cNorm = colors.Normalize(vmin, vmax)
        scalarMap = cmx.ScalarMappable(norm=cNorm, cmap=cm)
        colorVal = scalarMap.to_rgba(values)

        if show_elements:
            myimage = voronoi_plot_2d(grid.vor)
        mycolors = (i for i in colorVal)
        for order in grid.vor.point_region:
            region = grid.vor.regions[order]
            colortouse = next(mycolors)
            if -1 not in region:
                polygon = [grid.vor.vertices[i] for i in region]
                plt.fill(*zip(*polygon), color=colortouse)

        plt.gca().set_aspect(1.)
        # plt.autoscale(tight=True)
        plt.xlim((np.min(grid.node_x), np.max(grid.node_x)))
        plt.ylim((np.min(grid.node_y), np.max(grid.node_y)))

        scalarMap.set_array(values)
        plt.colorbar(scalarMap)

        plt.xlabel('X (%s)' % grid_units[1])
        plt.ylabel('Y (%s)' % grid_units[0])

        if var_name is not None:
            plt.title('%s (%s)' % (var_name, var_units))

    return None


def imshow_grid(grid, values, **kwds):
    show = kwds.pop('show', False)
    values_at = kwds.pop('values_at', 'node')

    if values_at == 'node':
        imshow_node_grid(grid, values, **kwds)
    elif values_at == 'cell':
        imshow_cell_grid(grid, values, **kwds)
    elif values_at == 'active_node':
        imshow_active_node_grid(grid, values, **kwds)
    elif values_at == 'active_cell':
        imshow_active_cell_grid(grid, values, **kwds)
    else:
        raise TypeError('value location %s not understood' % values_at)

    if show:
        plt.show()


def imshow_field(field, name, **kwds):
    values_at = kwds['values_at']
    imshow_grid(field, field.field_values(values_at, name), var_name=name,
                var_units=field.field_units(values_at, name), **kwds)

###
# Added by Sai Nudurupati 29Oct2013
# This function is exactly the same as imshow_grid but this function plots
# arrays spread over cells rather than nodes
# DEJH: Sai, this is duplicating what we already had I think. I deprecated it.


def imshow_active_cells(grid, values, var_name=None, var_units=None,
                        grid_units=(None, None), symmetric_cbar=False,
                        cmap='pink'):
    """
    .. deprecated:: 0.6
    Use :meth:`imshow_active_cell_grid`, above, instead.
    """
    data = values.view()
    data.shape = (grid.shape[0] - 2, grid.shape[1] - 2)

    y = np.arange(data.shape[0]) - grid.dx * .5
    x = np.arange(data.shape[1]) - grid.dx * .5

    if symmetric_cbar:
        (var_min, var_max) = (data.min(), data.max())
        limit = max(abs(var_min), abs(var_max))
        limits = (-limit, limit)
    else:
        limits = (None, None)

    plt.pcolormesh(x, y, data, vmin=limits[0], vmax=limits[1], cmap=cmap)

    plt.gca().set_aspect(1.)
    plt.autoscale(tight=True)

    plt.colorbar()

    plt.xlabel('X (%s)' % grid_units[1])
    plt.ylabel('Y (%s)' % grid_units[0])

    if var_name is not None:
        plt.title('%s (%s)' % (var_name, var_units))

    plt.show()

###

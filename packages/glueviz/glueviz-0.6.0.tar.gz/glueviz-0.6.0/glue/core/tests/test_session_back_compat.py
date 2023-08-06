# Make sure that session files can be read in a backward-compatible manner

import os
import numpy as np

from ...tests.helpers import requires_astropy, requires_h5py

from ..state import GlueUnSerializer

DATA = os.path.join(os.path.dirname(__file__), 'data')


@requires_astropy
def test_load_simple_tables_04():

    # This loads a session file made with Glue v0.4. In this session, we have
    # loaded four tables. The first two are from the same file, but one loaded
    # via the auto loader and the other via the Astropy FITS table loader. The
    # second two were loaded similarly to the first two, but the file contains
    # two HDUs this time. However, in Glue v0.4, only the first HDU was read so
    # we shouldn't have access to columns c and d in ``double_tables.fits``.

    with open(os.path.join(DATA, 'simple_tables.glu'), 'r') as f:
        template = f.read()

    content = template.replace('{DATA_PATH}', (DATA + os.sep).replace('\\', '\\\\'))
    state = GlueUnSerializer.loads(content)

    ga = state.object('__main__')

    dc = ga.session.data_collection

    # All tables should actually be the same because the FITS reader back at
    # 0.4 only read in the first HDU so the new reader is back-compatible
    # since it preserves HDU order.

    assert len(dc) == 4

    assert dc[0].label == 'single_table_auto'
    assert dc[1].label == 'single_table'
    assert dc[2].label == 'double_tables_auto'
    assert dc[3].label == 'double_tables'

    np.testing.assert_equal(dc[0]['a'], [1,2,3])
    np.testing.assert_equal(dc[0]['b'], [4,5,6])
    np.testing.assert_equal(dc[0]['a'], dc[1]['a'])
    np.testing.assert_equal(dc[0]['b'], dc[1]['b'])
    np.testing.assert_equal(dc[0]['a'], dc[2]['a'])
    np.testing.assert_equal(dc[0]['b'], dc[2]['b'])
    np.testing.assert_equal(dc[0]['a'], dc[3]['a'])
    np.testing.assert_equal(dc[0]['b'], dc[3]['b'])

    ga.close()


@requires_h5py
def test_load_hdf5_grids_04():

    # This loads a session file made with Glue v0.4. In this session, we have
    # loaded two gridded datasets from an HDF5 datafile: the first one loaded
    # via the auto loader and the other via the FITS/HDF5 loader.

    with open(os.path.join(DATA, 'simple_hdf5_grid.glu'), 'r') as f:
        template = f.read()

    content = template.replace('{DATA_PATH}', (DATA + os.sep).replace('\\', '\\\\'))
    state = GlueUnSerializer.loads(content)

    ga = state.object('__main__')

    dc = ga.session.data_collection

    assert len(dc) == 2

    assert dc[0].label == 'single_grid_auto'
    assert dc[1].label == 'single_grid'

    np.testing.assert_equal(dc[0]['/array1'], 1)
    np.testing.assert_equal(dc[0]['/array1'].shape, (2, 3, 4))

    ga.close()

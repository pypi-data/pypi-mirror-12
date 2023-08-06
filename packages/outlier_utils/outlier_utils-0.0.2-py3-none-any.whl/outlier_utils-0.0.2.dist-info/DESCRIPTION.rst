=============
outlier-utils
=============

This is the utils library for removing outliers.

- Smirnov Grubbs Tests

::

   >>> from outliers import smirnov_grubbs as grubbs

   >>> import pandas as pd
   >>> data = pd.Series([1, 8, 9, 10, 9])
   >>> grubbs.test(data, 0.05)
   1     8
   2     9
   3    10
   4     9
   dtype: int64

   >>> import numpy as np
   >>> data = np.array([1, 8, 9, 10, 9])
   >>> grubbs.test(data, 0.05)
   [ 8  9 10  9]


CHANGES
=======

0.0.2 (2015-12-02)
------------------

Update setup.py

0.0.1 (2015-12-01)
------------------

Publish to pypi

0.0.0 (2015-07-28)
------------------

Create this project.



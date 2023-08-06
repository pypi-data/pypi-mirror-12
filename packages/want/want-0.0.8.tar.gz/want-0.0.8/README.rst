want
=========

Make sure you are using python3 on Linux or OSX.
If not, it might not works.


::

  $ pip3 install want

  $ want [-a | --all] http://www.catfootwear.com.tw/

  # Get images if size between 100~2000 bytes.
  $ want [-s | --size=] 100-2000 http://www.catfootwear.com.tw/

  # Default size filter is 10000~200000 bytes.
  $ want http://www.catfootwear.com.tw/

  $ want -r urls.txt

.. image:: images/photo.png
   :width: 40pt

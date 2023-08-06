reportlogging
========================================

temporary logging data store, inmemory.

how to use
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

in application code

.. code-block:: python

  from reportlogging import manager
  import logging
  logger = logging.getLogger(__name__)
  report_logger = manager.getlogger(logger)


  def do_something():
      report_logger("report info: %s", data)

in batch script

.. code-block:: python

  def main():
      from reportlogging import manager
      manager.activate(logging.DEBUG, format="%(message)s")

      do_something()

      manager.getvalue()  # => "report info: xxxx"

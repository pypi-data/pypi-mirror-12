User Guide
==========

The workflow is broken down into three main steps, each one provided by a different package:

* **Launchgen**: Aids in the process of defining experiments and creating the necessary files to run them.
* **Launcher**: Takes the result of `~sciexp2.launchgen` and integrates with some well-known execution systems to execute and keep track of the execution of the experiments.
* **Data**: Aids in the process of collecting and analyzing the results of the experiments.

.. toctree::
   :maxdepth: 2

   user_guide/installing.rst
   user_guide/concepts.rst
   user_guide/launchgen.rst
   user_guide/launcher.rst
   user_guide/data.rst

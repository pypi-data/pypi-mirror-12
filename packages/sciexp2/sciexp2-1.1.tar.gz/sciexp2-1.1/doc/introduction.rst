Introduction
============

SciExp² (aka *SciExp square* or simply *SciExp2*) stands for *Scientific Experiment Exploration*, which contains a comprehensive framework for easing the workflow of creating, executing and evaluating experiments.

The driving idea behind SciExp² is the need for quick and effortless *design-space exploration*. This implies the definition and evaluation of experiments that are based on the permutation of different parameters in the design space. The framework is available in the form of Python modules which can be easily integrated into your own applications or used as a scripting environment.


Quick example
-------------

As a quick example, we'll see how to generate scripts to run an application, run these scripts, and evaluate their results. First, we'll start by generating the per-experiment scripts in the ``experiments`` directory, which will basically execute ``my-program`` with different values of the ``--foo`` argument, generating a CSV file with results for each experiment::


  #!/usr/bin/env python
  # -*- python -*-

  from sciexp2.launchgen.env import *

  l = Launchgen(out="experiments")
  l.pack("/path/to/my-program", "bin/my-program")
  l.params(foo=[1, 2, 4, 8])
  l.launchgen("shell", "scripts/@foo@.sh",
              CMD="bin/my-program --foo=@foo@ --out=results/@foo@.csv"
             )


The ``experiments`` directory now contains all the files we need. Then, we'll execute all the experiments with::

  ./experiments/jobs.jd submit

The relevant contents of the ``experiments`` directory after executing the experiments are thus::

  experiments
  |- bin
  |  `- my-program
  |- scripts
  |  |- 1.sh
  |  |- 2.sh
  |  |- 4.sh
  |  `- 8.sh
  `- results
     |- 1.csv
     |- 2.csv
     |- 4.csv
     `- 8.csv

Let's assume that ``my-program`` runs the same operation multiple times, and the output CSV files contain a line with the execution time for each of these runs, like::

  run,time(sec)
  0,3.2
  1,2.9
  ...

Finally, we'll gather the results of all experiments and print the average execution time across runs for each value of the ``foo`` parameter::

  #!/usr/bin/env python
  # -*- python -*-

  from sciexp2.data.env import *

  d = extract_txt('experiments/results/@foo@.csv',
                  fields_to_vars=["run"])
  d = d.reshape(["foo"], ["run"])
  d = d.mean(axis="run")
  for foo in d.dims["foo"]:
      print foo, d[foo]

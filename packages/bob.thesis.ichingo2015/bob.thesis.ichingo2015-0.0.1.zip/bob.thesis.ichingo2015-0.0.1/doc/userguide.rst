.. vim: set fileencoding=utf-8 :
.. author: Ivana Chingovska <ivana.chingovska@idiap.ch>
.. date: Tue Jul  8 17:39:09 CEST 2014

.. bob.thesis.ichingo2015 documentation master file, created by
   sphinx-quickstart on Tue Jul  8 17:39:28 CEST 2014
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

==========
User guide
==========

This package depends on `Replay-Attack <https://www.idiap.ch/dataset/replayattack>`_ database and all the scripts and methods are using the `Replay-Attack API 
<https://www.idiap.ch/PUTCORRECTLINK>`_ which is based on Bob_. The database needs to be downloaded and installed prior to usage. This database has a specific database structure which needs to be preserved when generating features and scores as inputs and outputs. This is how communication between scripts is preserved. 

This User Guide consists of three parts:

1. **Part 1**: we are going to show how to generate anti-spoofing features and face verification features, which are used later by the other methods.

2. **Part 2**: we are going to show how to generate client-indepdendent and client-specific face anti-spoofing scores.

3. **Part 3**: we are going to show how to generate fusion scores for face verification and anti-spoofing systems.

4. **Part 4**: we are going to show the use of EPS framework for evaluation of biometric verification systms under spoofing attacks

.. [#] Contact ivana.chingovska@idiap.ch

.. _Bob: http://www.idiap.ch/software/bob
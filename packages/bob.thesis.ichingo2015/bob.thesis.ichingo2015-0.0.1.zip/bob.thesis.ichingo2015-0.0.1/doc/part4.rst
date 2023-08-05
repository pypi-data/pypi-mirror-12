.. vim: set fileencoding=utf-8 :
.. author: Ivana Chingovska <ivana.chingovska@idiap.ch>
.. date: Tue Jul  8 17:39:09 CEST 2014

.. bob.thesis.ichingo2015 documentation master file, created by
   sphinx-quickstart on Tue Jul  8 17:39:28 CEST 2014
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.


Part 4: EPS for evaluation of biometric verification systems under spoofing attacks
-----------------------------------------------------------------------------------

The implementation of the EPS evaluation framework is performed in the package `antispoofing.evaluation <https://pypi.python.org/pypi/antispoofing.evaluation>`_. Please refer to the documentation of that package for:

	1. An API of EPS to evaluate your own systems

	2. An explanation about how to generate diverse plots, like score distribution, DET, Evaluation Methodology 2 etc.

	3. An explanation about how to generate EPSC plots

	4. An explanation about how to generate EPSC plots to compare several different systems

	5. An explanation about how to generate different error rates

In addition to the methods available in the package `antispoofing.evaluation <https://pypi.python.org/pypi/antispoofing.evaluation>`_, there are additional methods which allow plotting EPSC curves for systems fused at decision-level. If your anti-spoofing system is client-independent, run::

	$ ./bin/and_decision_epsc.py -d path_to_faceverif_scores -a path_to_antispoof_scores --ft faceverif_threshold --at faceverif_threshold --op path_to_output_pdf replay

Note that the decision thresholds for the face verification and anti-spoofing systems need to be known in advance. You can obtain them using the scripts ``faceverif_threshold.py``	and ``antispoofing_threshold.py`` from the package `antispoofing.fusion_faceverif <https://pypi.python.org/pypi/antispoofing.fusion_faceverif>`_.

If your anti-spoofing system is lient-specific, run::

	$ ./bin/and_decision_epsc.py -d path_to_faceverif_scores -a path_to_antispoof_scores --op path_to_output_pdf replay

Besides plotting the EPSC curves, these methods can output an HDF5 file with the parameters of the EPSC, like the values of the parameter omega and the values of the error rates for each omega. Use the ``--oh`` option to specify the output HDF5 file. This file can be later used with the ``--inoepsc`` option of the script ``cmp_systems_epsc.py`` from the package `antispoofing.evaluation <https://pypi.python.org/pypi/antispoofing.evaluation>`_, in order to do an EPSC plot of a system fused with decision-level fusion alongside systems fused with score-level fusion.

.. _Bob: http://www.idiap.ch/software/bob
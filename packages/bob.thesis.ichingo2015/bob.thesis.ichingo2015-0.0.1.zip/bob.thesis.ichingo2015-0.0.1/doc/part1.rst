.. vim: set fileencoding=utf-8 :
.. author: Ivana Chingovska <ivana.chingovska@idiap.ch>
.. date: Tue Jul  8 17:39:09 CEST 2014

.. bob.thesis.ichingo2015 documentation master file, created by
   sphinx-quickstart on Tue Jul  8 17:39:28 CEST 2014
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Part 1: Generate anti-spoofing and face verification features
--------------------------------------------------------------

Generating anti-spoofing scores
===============================

In this thesis, we look at 4 different anti-spoofing features, each of them proposed in a different State-Of-The-Art paper. They are referred to as LBP, LBP-TOP, MOTION and HOG. All of the features are generated on per-frame basis.

To generate LBP features, use the script ``calcframelbp.py``, from the package `antispoofing.lbp <https://pypi.python.org/pypi/antispoofing.lbp>`_ with the following parameters::

    $ ./bin/calcframelbp.py -v path_to_replay_attack -d path_to_features -n 64 --ff 50 -l uniform -c replay

To generate LBP-TOP features, use the script ``lbptop_calculate_parameters.py`` from the package `antispoofing.lbptop <http://pypi.python.org/pypi/antispoofing.lbptop>`_ with the following parameters::

    $ ./bin/lbptop_calculate_parameters.py -n 64 --ff 50 -lXY uniform -lXT uniform -lYT uniform -rX 1 -rY 1 -rT 1 -cXY -cXT -cYT path_to_replay_attack path_to_features replay
 
To generate MOTION features, you have to use the scripts ``framediff.py`` and ``diffcluster.py`` from the package `antispoofing.motion <https://pypi.python.org/pypi/antispoofing.motion>`_. We used the default parameters to extract these features. The call of the scripts is as follows::

	$ ./bin/motion_framediff.py path_to_replay_attack path_to_intermediate_features replay

	$ ./bin/motion_diffcluster.py path_to_intermediate_features path_to_features replay

To generate HOG features, use the script ``calchog.py``, from the package `antispoofing.lbp <https://pypi.python.org/pypi/antispoofing.lbp>`_ with the following parameters::

    $ ./bin/calchog.py -v path_to_replay_attack -d path_to_features -n 64 --ff 50 -c 16 --co 8 --nn replay

You need to run all the commands above once again using the ``-e`` option to extract the features for the enrollment videos of the database. More information about the parameters of the methods can be found in the corresponding satellite packages. Also, all the parameters for each script are available by typing ``--help`` after the script call.

Generating face verification scores
===================================

In this thesis, we look at 4 different face verification scores, generated using FaceRecLib_. They are referred to as: UBMGMM, LGBPHS, GJet and ISV.

To generate the face verifications scores, you need to create a protocol for matching real-access (`licit` protocol) and spoof (SPOOF protocol) samples to user models that the algorithms has learned. The LICIT protocol is created by exhaustively matching each real access sample to the user model belonging to the sample's user and to all the other models. The SPOOF protocol is created my matching the spoof samples to the user model belonging to the sample's user. In our case, the algorithms work on a frame-by-frame basis. Due to computational limitations, we computed the scores only for every 10th frame of each video. 

The list of files to be matched needs to be provided to FaceRecLib by means of using the package `bob.db.verification.filelist <https://pypi.python.org/pypi/bob.db.verification.filelist>`. We provide the listfiles that we have already generated in the directory `provided_data/replay_attack_filelists`. Alternatively, you can use the script ``replay_attack_frames.py`` to generate these file lists, as well as to extract each 10th frame of the videos. The example usage below will generate the filelists for all the videos and save the extracted frames (``--sf`` option)::

	$ ./bin/replay_attack_frames.py -d path_to_output_filelists --sf

Type ``--help`` at the command line to see other options for this script.

Once the filelists are generated, please refer to the documentation of FaceRecLib_ to see how to generate the face verification scores. Alternatively, we also provide already generated face verification scores for the four methods that you can directly use. They are situated in the directory `facereclib_scores`.

TODO: Provide facereclib_scores directory.

.. _FaceRecLib: https://pypi.python.org/pypi/facereclib
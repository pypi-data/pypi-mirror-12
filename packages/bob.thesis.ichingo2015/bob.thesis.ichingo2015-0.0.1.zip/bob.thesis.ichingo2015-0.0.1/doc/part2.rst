.. vim: set fileencoding=utf-8 :
.. author: Ivana Chingovska <ivana.chingovska@idiap.ch>
.. date: Tue Jul  8 17:39:09 CEST 2014

.. bob.thesis.ichingo2015 documentation master file, created by
   sphinx-quickstart on Tue Jul  8 17:39:28 CEST 2014


Part 2: Generate client-independent and client-specific anti-spoofing scores
----------------------------------------------------------------------------

Some of the scripts that need to be used for generating these scores are contained in this satellite package. However, some of them are from the package `antispoofing.clientspec <https://pypi.python.org/pypi/antispoofing.clientspec>`_.

Generative client-independent scores
====================================

Generating the generative client-idependent scores can be done in 5 steps. The values of the hyper-parameters (number of Gaussians) which are given in the commands below are optimized for the grandtest set of Replay-Attack. Please find a table at the end of the section for the parameter values optimized for other Replay-Attack protocols. Note that the models are created for features which are **normalized** using standard normalization and *PCA reduced*. The examples are given for LBP features, but generating the scores for the other features is analogous. You just have to change the number of the Gaussians using the ``--gaussians`` parameter. You can always type ``--help`` after any of the commands to see all their available options. You can also type ``--help`` after the option ``replay`` to see the available options for the database.

The scripts used for this task belong to the package `antispoofing.clientspec <https://pypi.python.org/pypi/antispoofing.clientspec>`_.

1. **Create model for Real Accesses** (LBP features)::

   $ ./bin/naive_modelling.py --featname lbp --gaussians 5 --modeltype real -n -r -c -j -o path_to_output_dir/lbp/dir-models/real path_to_features replay --protocol grandtest
   
   The parameter ``-e 0.995`` should be set denoting the kept energy during PCA reduction for the MOTION features. The default values are used for the other features. The parameter ``--featname`` can be any custom name that you choose to give to your features, but pay attention to use it consistently through the calls of all the scripts. Don't forget to change the protocol (``--protocol``) to the corresponding protocol of Replay-Attack that you want to use. Specifying several protocols is possible.

2. **Create model for Attacks** (LBP features)::

   $ ./bin/naive_modelling.py --featname lbp --gaussians 10 --modeltype attack -n -r -c -j -o path_to_output_dir/lbp/dir-models/attack path_to_features replay --protocol grandtest
   
   Again, the parameter ``-e 0.995`` should be set denoting the kept energy during PCA reduction for the MOTION features.

3. **Calculate likelihoods to real access model** ::

   ./bin/naive_likelihood.py --featname lbp --gaussians 5 --modeldir path_to_output_dir/lbp/dir-models/real -o path_to_output_dir/lbp/dir-likelihoods/real path_to_features replay
   
4. **Calculate likelihoods to attack model** ::

   ./bin/naive_likelihood.py --featname lbp --gaussians 10 --modeldir path_to_output_dir/lbp/dir-models/attack -o path_to_output_dir/lbp/dir-likelihoods/attack path_to_features replay

5. **Calculate likelihood ratios** ::

   ./bin/naive_likelihood_ratio.py --dirreal path_to_output_dir/lbp/dir-likelihoods/real/GMM-5 --dirattack path_to_output_dir/lbp/dir-likelihoods/attack/GMM-10 -o path_to_output_dir/lbp/likelihood_ratio/GMM-5/GMM-10/llr_real.vs.attack replay
   
	Generating the likelihood ratios for other features is analogous. You just need to change the number of Gaussians in the input and output folders to the corresponding values. 

Type ``--help`` after the command to see all its available options.

After this, you will have scores for all the videos of Replay-Attack in the directory ``path_to_output_dir/lbp/likelihood_ratio/GMM-5/GMM-10/llr_real.vs.attack`` (or analogous for the other features). The scores will be written as an array in .hdf files with the name of the video, and one score per frame. 

**The optimized values (obtained via grid search) for the number of Gaussians for each of the protocols of Replay-Atatck are given in the following table**:

=================  ====== ====== ====== ====== ====== ====== ====== ======
  features              LBP         LBP-TOP       MOTION          HOG
-----------------  ------------- ------------- ------------- -------------
  protocol          real  attack  real  attack  real  attack  real  attack
=================  ====== ====== ====== ====== ====== ====== ====== ====== 
**grandtest**         5     10      5     50     10     300    210    190   
**print**            250    235     5     10     35     5      30     175
**digital**          15     35      10    15    100     115    235    105
**video**             5     20      5     30     10     60     120    110
**print+digital**     5     10      5     25     45    165     115     30
**print+video**       5     15      10    75     10     240    125    195
**digital+video**     5     10      5     30    100     295    290    165
=================  ====== ====== ====== ====== ====== ====== ====== ======


Generative client-specific scores
=================================

Generating the client-specific results can be done in 7 steps. The values of the hyper-parameters (number of Gaussians and relevance factor) which are given in the commands below are optimized for the grandtest set of Replay-Attack. Please find a table at the end of the section for the parameter values optimized for other Replay-Attack protocols. Note that the models are created for features which are **normalized** using standard normalization and *PCA reduced*. The examples are given for LBP features, but generating the scores for the other features is analogous. You just have to change the number of the Gaussians using the ``--gaussians`` parameter and the relevance factor using the ``--rel`` parameter. You can always type ``--help`` after any of the commands to see all their available options. You can also type ``--help`` after the option ``replay`` to see the available options for the database.
   
The majority of the scripts used for this task belong to the package `antispoofing.clientspec <https://pypi.python.org/pypi/antispoofing.clientspec>`_.

1. **Create model for Real Accesses**. This step is exactly the same as step 1 of the previous section. Just replace the values of the number of Gaussians optimized for the client-specific models, which are given in the table at the end of the section.

2. **Create model for Attacks**. This step is exactly the same as step 2. of the previous section. Just replace the values of the number of Gaussians optimized for the client-specific models, which are given in the table at the end of the section.
   
3. **Enroll clients from the Real Access model using MAP adaptation**::

   $ ./bin/map_adapt_per_client.py --featname lbp --modelfile path_to_output_dir/lbp/dir-models/real/GMM-275.hdf5 -o path_to_output_dir/lbp/dir-map-models/TEST/GMM-275/reals.hdf5 --group test --rel 1 --clss enroll path_to_features replay

   This step needs to be run three times: for the training, development and test subset. The above examples shows how to run it for the test set. The class of samples using for the MAP adaptation is specified with ``--clss`` parameter and needs to be the *enrollment* samples in this case. The output is an .hdf5 file where the MAP adapted models are stored for each client of the particular subset.

   Generating the MAP models for the other features is analogous. Just change the number of Gaussians in the model filename and the output directory.
   
4. **Create cohort models from the Attack model using MAP adaptation**. As before, use the script ``map_adapt_per_client.py`` from the package `antispoofing.clientspec <https://pypi.python.org/pypi/antispoofing.clientspec>`_::

   $ ./bin/map_adapt_per_client.py --featname lbp --modelfile path_to_output_dir/lbp/dir-models/attack/GMM-25.hdf5 -o path_to_output_dir/lbp/dir-map-models/TRAIN/GMM-25/attacks.hdf5 --group train --rel 1 --clss attack path_to_features replay --protocol grandtest

   This step needs to be run only once, because the cohorts are created from the training set. The class of samples using for the MAP adaptation is specified with ``--clss`` parameter and needs to be the *attack* samples in this case. Don't forget to change the protocol (``--protocol``) to the corresponding protocol of Replay-Attack that you want to use. The output is an .hdf5 file where all the cohort models are stored.

   Generating the cohort models for the other features is analogous. Just change the number of Gaussians in the model filename and the output directory.

5. **Calculate likelihoods to real access client-specific models**::

   $ ./bin/naive_likelihood_clientspecmodel.py --featname lbp --mapmodelfile path_to_output_dir/lbp/dir-map-models/TEST/GMM-275/reals.hdf5 -o path_to_output_dir/lbp/dir-likelihood-clientspec/GMM-275 --group test path_to_features replay

   This step needs to be run three times: for the training, development and test subset. The above examples shows how to run it for the test set. Generating the likelihoods for other features is analogous. Just change the number of Gaussians in the MAP model filename and the output directory.
   
6. **Calculate likelihoods to attack cohort models**::

   $ ./bin/naive_likelihood_cohortmodels.py --featname lbp --cohortfile path_to_output_dir/lbp/dir-map-models/TRAIN/GMM-25/attacks.hdf5 -o path_to_output_dir/lbp/dir-likelihood-cohort/likelihood-cohort-all/GMM-25 --group test path_to_features replay

   This step needs to be run three times: for the training, development and test subset. The above examples shows how to run it for the test set. Generating the likelihoods for other features is analogous. Just change the number of Gaussians in the MAP model filename and the output directory. Note that you can specify the number N of cohorts that you want to use to compute the likelihood, using the ``-s`` option. In such a case, the highest N cohorts will be taken into account only.
   
7. **Calculate the likelihood ratio**::
  
   $ ./bin/naive_likelihood_ratio.py --dirreal path_to_output_dir/lbp/dir-likelihood-clientspec/GMM-275 --dirattack path_to_output_dir/lbp/dir-likelihood-cohort/likelihood-cohort-all/GMM-25 -o path_to_output_dir/lbp/likelihood_ratio/GMM-275/GMM-25/llr_clientspec.vs.cohortall replay

   Generating the likelihood ratios for other features is analogous. You just need to change the number of Gaussians in the input and output folders to the corresponding values.

   After this, you will have scores for all the videos of Replay-Attack in the directory ``path_to_output_dir/lbp/likelihood_ratio/GMM-275/GMM-25/llr_clientspec.vs.cohortall`` (or analogous for the other features). The scores will be written as an array in .hdf files with the name of the video, and one score per frame. 

In addition to these steps, the likelihood to the attack models can be done on a subset of cohort models which are sorted by some criteria. They can be sorted statically and dynamically, using the scripts ``sort_cohort_models_kl.py`` and ``sort_cohort_models_reynolds.py``, respectively. Then, the likelihood from sorted cohorts can be computed using the script ``naive_likelihood_sorted_cohortmodels.py``.

8. **Sorting the cohort models**.

   To run the static sort, run::

   $ ./bin/sort_cohort_models_kl.py --featname lbp --mapmodelfile path_to_output_dir/lbp/dir-map-models/TEST/GMM-275/reals.hdf5 --cohortfile path_to_output_dir/lbp/dir-map-models/TRAIN/GMM-25/attacks.hdf5 -o path_to_output_dir/lbp/sorted_cohorts.hdf5 --gr test replay

   To run the dynamic sort, run::

   $ ./bin/sort_cohort_models_reynolds.py --featname lbp --mapmodelfile path_to_output_dir/lbp/dir-map-models/TEST/GMM-275/reals.hdf5 --cohortfile path_to_output_dir/lbp/dir-map-models/TRAIN/GMM-25/attacks.hdf5 --sf path_to_output_dir/lbp/sorted_cohorts.hdf5 -o path_to_output_dir/lbp/sorted_cohorts --gr test replay
   
   This step needs to be run three times: for the training, development and test subset. The above examples shows how to run it for the test set.

9. **Calculate likelihood to sorted cohort models**::

   $ ./bin/naive_likelihood_sorted_cohortmodels.py --featname lbp --cohortfile path_to_output_dir/lbp/dir-map-models/TRAIN/GMM-25/attacks.hdf5 --sort_cohort 5 -o path_to_output_dir/lbp/dir-likelihood-cohort/sorted-cohort-likelihood/likelihood-cohort-5/GMM-25 --group test path_to_features replay

   This step needs to be run three times: for the training, development and test subset. The parameter ``--sort_cohort`` controls the number of cohorts to be considered when computing the likelhood.

 After steps 8. and 9., step 7. can be repeated to compute the likelhood ratio. 

**The optimized values (via grid search) for the number of Gaussians and the MAP relevance factor for each of the protocols of Replay-Attack are given in the following table**:

=================  ====== ====== === ====== ====== === ====== ====== === ====== ====== ===
  features                 LBP            LBP-TOP            MOTION             HOG
-----------------  ----------------- ----------------- ----------------- -----------------
  protocol          real  attack rel  real  attack rel  real  attack rel  real  attack rel
=================  ====== ====== === ====== ====== === ====== ====== === ====== ====== ===
**grandtest**        275    25    1    295    100   5    10      45   5    295    55    1
**print**            160    20    1    300    210   1    70      10   1     30    105   1
**digital**          250     5    4    300     35   3   100     165   1    205    255   1
**video**            275    15    5    295     55   5    15     230   5    15     220   5
**print+digital**    275    20    1    295     60   5    50     100   1    295    85    2
**print+video**      280    15    3    240     80   5    15      90   5    25     80    1
**digital+video**    250    10    3    240     85   5    45      65   2    5      110   2
=================  ====== ====== === ====== ====== === ====== ====== === ====== ====== ===


Discriminative client-independent scores
========================================

Generating the generative client-idependent scores can be done in 2 steps.

1. **Training the SVM**

	The training can be done using kernels, or using kernel approximation. The option ``--scikit`` specifies that scikit_learn_ will be used instead of Bob_. You can always type ``--help``after any of the commands to see all their available options. You can also type ``--help`` after the option ``replay`` to see the available options for the database.

	The command below shows how to do the training with RBF kernels after min-max normalization of the data::

	$ ./bin/svmtrain.py -v path_to_features -d path_to_machine --min-max-normalize --kernel-type RBF --scikit replay

	To do the SVM training using Chi2 kernel with Nystrom approximation, run::

	./bin/svmtrain.py -v path_to_features -d path_to_machine --kernel-approx-type nystrom-chi2 replay

2. **Calculating the scores**	

    If the machine is trained using kernels, run::

    $ ./bin/svmeval.py -i path_to_features --svmdir path_to_machine -o path_to_scores --scikit -s replay

    If the machine is trained using approximation, run:: 

    $ ./bin/svmapprox_eval.py -i path_to_features --svmdir path_to_machine -o path_to_scores -s replay

Discriminative client-specific scores
=====================================

Generating the client-specific scores can be done in 2 steps.

The examples below are given for LBP features, but the procedure for the other features is analogous.

1. **Training the SVM**

   The training can be done using kernels, or using kernel approximation. The option ``--scikit`` specifies that scikit_learn_ will be used instead of Bob_. You can always type ``--help``after any of the commands to see all their available options. You can also type ``--help`` after the option ``replay`` to see the available options for the database.

   The command below shows how to do the training with RBF kernels after standard normalization of the data::

   ./bin/svm_clientspec_train.py -f lbp -o path_to_machine --gr test --std-normalize --scikit path_to_features replay

   To do the SVM training using Chi2 kernel with Nystrom approximation, run::

   ./bin/svmapprox_clientspec_train.py -f lbp -o path_to_machine --gr test --std-normalize --kernel-approx-type nystrom-chi2 path_to_features replay

   These steps needs to be run three times: for the training, development and test subset. The above examples shows how to run it for the test set.

2. **Calculating the scores**

   To generate the client-specific scores, run one of the following two commands, depending on whether the SVM is trained using kernel or kernel approximation::

   $ ./bin/svm_clientspec_eval.py -f lbp --svmdir path_to_machine -o path_to_scores --gr test -s path_to_features replay
   $ ./bin/svmapprox_clientspec_eval.py -f lbp --svmdir path_to_machine -o path_to_scores --gr test -s path_to_features replay

   If you want to generate client-specific scores for zero-effort impostors for which wrong identity claim will be given to the client-specific anti-spoofing system, run one of the following two commands::

   $ ./bin/svm_clientspec_eval_impostors.py -f lbp --svmdir path_to_machine -o path_to_scores --gr test -s path_to_features replay   
   $ ./bin/svmapprox_clientspec_eval_impostors.py -f lbp --svmdir path_to_machine -o path_to_scores --gr test -s path_to_features replay   

   These steps needs to be run three times: for the training, development and test subset. The above examples shows how to run it for the test set.

Computing the error rates
=========================   

After the scores have been generated, you can use the script ``./bin/score_evaluation_crossdb.py`` to compute the error rates. For example, to compute the error rates for the scores obtained using the client-specific SVM approach, call::

   $ ./bin/score_evaluation_crossdb.py --devel-scores-dir path_to_scores --test_scores-dir path_to_scores --dev-set replay --test-set replay --attack-devel grandtest --attack-test grandtest --verbose

Type ``--help`` after the command to see all its available options. For the cross-protocol evaluation, you can specify separate protocols used for decision threshold and evaluation (use ``--ad`` and ``--at`` parameters). In such a case, most likely the values of the parameters ``--sd`` and ``--st`` will be different too.

Plotting the box plots
======================

Here is an example how to plot the box plots of the scores for each users, for the scores obtained using the client-specific GMM approach::

   $ ./bin/scores_box_plot.py --devel-scores-dir path_to_scores --test_scores-dir path_to_scores --dev-set replay --test-set replay --attack-devel grandtest --attack-test grandtest --normalization --reject-outlier --verbose

Type ``--help`` after the command to see all its available options. It is recommended that the scores are always normalized (``--normalization`` option) with outliers rejected during the normalization (``--reject-outlier`` option).  

.. _Bob: http://www.idiap.ch/software/bob
.. _scikit_learn: http://scikit-learn.org 
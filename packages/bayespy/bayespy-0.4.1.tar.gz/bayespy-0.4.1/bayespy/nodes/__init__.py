################################################################################
# Copyright (C) 2013 Jaakko Luttinen
#
# This file is licensed under the MIT License.
################################################################################


"""
Package for nodes used to construct the model.

Stochastic nodes
================

.. currentmodule:: bayespy.nodes

Nodes for Gaussian variables:

.. autosummary::
   :toctree: generated/

   Gaussian
   GaussianARD

Nodes for precision and scale variables:

.. autosummary::
   :toctree: generated/

   Gamma
   Wishart
   Exponential

Nodes for modelling Gaussian and precision variables jointly (useful as prior
for Gaussian nodes):

.. autosummary::
   :toctree: generated/

   GaussianGammaISO
   GaussianGammaARD
   GaussianWishart

Nodes for discrete count variables:

.. autosummary::
   :toctree: generated/

   Bernoulli
   Binomial
   Categorical
   Multinomial
   Poisson

Nodes for probabilities:

.. autosummary::
   :toctree: generated/

   Beta
   Dirichlet

Nodes for dynamic variables:

.. autosummary::
   :toctree: generated/

   CategoricalMarkovChain
   GaussianMarkovChain
   SwitchingGaussianMarkovChain
   VaryingGaussianMarkovChain

Other stochastic nodes:

.. autosummary::
   :toctree: generated/

   Mixture



Deterministic nodes
===================

.. autosummary::
   :toctree: generated/

   Dot
   SumMultiply
   Gate
"""

# Currently, model construction and the inference network are not separated so
# the model is constructed using variational message passing nodes.
from bayespy.inference.vmp.nodes import *


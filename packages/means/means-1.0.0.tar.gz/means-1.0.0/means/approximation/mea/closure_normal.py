"""
Normal moment closure
------

This part of the package provides the original the Normal (Gaussian) closure.
"""

import sympy as sp
from sympy.utilities.iterables import multiset_partitions
import operator
from means.util.sympyhelpers import product
from closure_scalar import ClosureBase


class NormalClosure(ClosureBase):
    """
    A class providing normal closure to
    :class:`~means.approximation.mea.moment_expansion_approximation.MomentExpansionApproximation`.
    Expression for higher order (max_order + 1) central moments are directly
    computed using Isserlis' Theorem.
    As a result, any higher order moments will be replaced by a symbolic expression
    depending on mean and variance only.
    """

    def __init__(self, max_order, multivariate=True):
        """
        :param max_order: the maximal order of moments to be modelled.
        :type max_order: `int`
        :param multivariate: whether to consider covariances
        :return:
        """

        self._min_order = 2
        super(NormalClosure, self).__init__(max_order, multivariate)


    def _get_covariance_symbol(self, q_counter, sp1_idx, sp2_idx):
        r"""
        Compute second order moments i.e. variances and covariances
        Covariances equal to 0 in univariate case

        :param q_counter: moment matrix
        :param sp1_idx: index of one species
        :param sp2_idx: index of another species
        :return: second order moments matrix of size n_species by n_species
        """

        # The diagonal positions in the matrix are the variances
        if sp1_idx == sp2_idx:
            return [q.symbol for q in q_counter if q.n_vector[sp1_idx] == 2 and q.order == 2][0]

        # In multivariate cases, return covariances
        elif self.is_multivariate:
            return [q.symbol for q in q_counter if q.n_vector[sp1_idx] == 1 and q.n_vector[sp2_idx] == 1 and q.order == 2][0]

        # In univariate cases, covariances are 0s
        else:
            return sp.Integer(0)


    def _compute_one_closed_central_moment(self, moment, covariance_matrix):
        r"""
        Compute each row of closed central moment based on Isserlis' Theorem of calculating higher order moments
        of multivariate normal distribution in terms of covariance matrix

        :param moment: moment matrix
        :param covariance_matrix: matrix containing variances and covariances
        :return: each row of closed central moment
        """

        # If moment order is odd, higher order moments equals 0
        if moment.order % 2 != 0:
            return sp.Integer(0)

        # index of species
        idx = [i for i in range(len(moment.n_vector))]

        # repeat the index of a species as many time as its value in counter
        list_for_partition = reduce(operator.add, map(lambda i, c: [i] * c, idx, moment.n_vector))

        # If moment order is even, :math: '\mathbb{E} [x_1x_2 \ldots  x_2_n] = \sum \prod\mathbb{E} [x_ix_j] '
        # e.g.:math: '\mathbb{E} [x_1x_2x_3x_4] = \mathbb{E} [x_1x_2] +\mathbb{E} [x_1x_3] +\mathbb{E} [x_1x_4]
        # +\mathbb{E} [x_2x_3]+\mathbb{E} [x_2x_4]+\mathbb{E} [x_3x_4]'
        # For second order moment, there is only one way of partitioning. Hence, no need to generate partitions
        if moment.order == 2:
            return covariance_matrix[list_for_partition[0], list_for_partition[1]]

        # For even moment order other than 2, generate a list of partitions of the indices of covariances
        else:
            each_row = []
            for idx_pair in self._generate_partitions(list_for_partition):
                # Retrieve the pairs of covariances using the pairs of partitioned indices
                l = [covariance_matrix[i, j] for i,j in idx_pair]
                # Calculate the product of each pair of covariances
                each_row.append(product(l))

            # The corresponding closed central moment of that moment order is the sum of the products
            return sum(each_row)


    def _compute_closed_central_moments(self, central_from_raw_exprs, n_counter, k_counter):
        """
        Computes parametric expressions (e.g. in terms of mean, variance, covariances) for all central moments
        up to max_order + 1 order.

        :param central_from_raw_exprs:
        :param n_counter: a list of :class:`~means.core.descriptors.Moment`\s representing central moments
        :type n_counter: list[:class:`~means.core.descriptors.Moment`]
        :param k_counter: a list of :class:`~means.core.descriptors.Moment`\s representing raw moments
        :type k_counter: list[:class:`~means.core.descriptors.Moment`]
        :return: a vector of parametric expression for central moments
        """
        n_species = len([None for pm in k_counter if pm.order == 1])
        covariance_matrix = sp.Matrix(n_species, n_species, lambda x,y: self._get_covariance_symbol(n_counter,x,y))
        positive_n_counter = [n for n in n_counter if n.order > 1]
        out_mat = [self._compute_one_closed_central_moment(n, covariance_matrix) for n in positive_n_counter ]
        return sp.Matrix(out_mat)


    def _generate_partitions(self, list_for_par):
        for p in multiset_partitions(range(len(list_for_par)), m=len(list_for_par)/2):
            # keep partitions of size = 2
            if all([(len(k) == 2) for k in p]):
                # retrieve index in original list
                yield [[list_for_par[i] for i in k] for k in p]


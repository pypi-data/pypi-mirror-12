import unittest
import sympy
from means.util.sympyhelpers import sympy_expressions_equal
from means.util.sympyhelpers import to_sympy_matrix
from means.approximation.mea.closure_gamma import GammaClosure
from means.core import Moment

class TestLogNormalCloser(unittest.TestCase):
    __n_counter = [
    Moment([0, 0, 0], symbol=sympy.Integer(0)),
    Moment([0, 0, 2], symbol=sympy.Symbol("yx2")),
    Moment([0, 1, 1], symbol=sympy.Symbol("yx3")),
    Moment([0, 2, 0], symbol=sympy.Symbol("yx4")),
    Moment([1, 0, 1], symbol=sympy.Symbol("yx5")),
    Moment([1, 1, 0], symbol=sympy.Symbol("yx6")),
    Moment([2, 0, 0], symbol=sympy.Symbol("yx7")),
    Moment([0, 0, 3], symbol=sympy.Symbol("yx8")),
    Moment([0, 1, 2], symbol=sympy.Symbol("yx9")),
    Moment([0, 2, 1], symbol=sympy.Symbol("yx10")),
    Moment([0, 3, 0], symbol=sympy.Symbol("yx11")),
    Moment([1, 0, 2], symbol=sympy.Symbol("yx12")),
    Moment([1, 1, 1], symbol=sympy.Symbol("yx13")),
    Moment([1, 2, 0], symbol=sympy.Symbol("yx14")),
    Moment([2, 0, 1], symbol=sympy.Symbol("yx15")),
    Moment([2, 1, 0], symbol=sympy.Symbol("yx16")),
    Moment([3, 0, 0], symbol=sympy.Symbol("yx17")),

    ]
    __k_counter = [
        Moment([0, 0, 0], symbol=sympy.Integer(1)),
        Moment([1, 0, 0], symbol=sympy.Symbol("y_0")),
        Moment([0, 1, 0], symbol=sympy.Symbol("y_1")),
        Moment([0, 0, 1], symbol=sympy.Symbol("y_2")),
        Moment([0, 0, 2], symbol=sympy.Symbol("x_0_0_2")),
        Moment([0, 1, 1], symbol=sympy.Symbol("x_0_1_1")),
        Moment([0, 2, 0], symbol=sympy.Symbol("x_0_2_0")),
        Moment([1, 0, 1], symbol=sympy.Symbol("x_1_0_1")),
        Moment([1, 1, 0], symbol=sympy.Symbol("x_1_1_0")),
        Moment([2, 0, 0], symbol=sympy.Symbol("x_2_0_0")),
        Moment([0, 0, 3], symbol=sympy.Symbol("x_0_0_3")),
        Moment([0, 1, 2], symbol=sympy.Symbol("x_0_1_2")),
        Moment([0, 2, 1], symbol=sympy.Symbol("x_0_2_1")),
        Moment([0, 3, 0], symbol=sympy.Symbol("x_0_3_0")),
        Moment([1, 0, 2], symbol=sympy.Symbol("x_1_0_2")),
        Moment([1, 1, 1], symbol=sympy.Symbol("x_1_1_1")),
        Moment([1, 2, 0], symbol=sympy.Symbol("x_1_2_0")),
        Moment([2, 0, 1], symbol=sympy.Symbol("x_2_0_1")),
        Moment([2, 1, 0], symbol=sympy.Symbol("x_2_1_0")),
        Moment([3, 0, 0], symbol=sympy.Symbol("x_3_0_0"))
    ]
    __mfk = to_sympy_matrix([
    ["c_0 - c_1*y_0 - c_2*y_0*y_2/(c_6 + y_0) - c_2*y_2*yx17*(-y_0/(c_6 + y_0) + 1)/(c_6 + y_0)**3 - c_2*y_2*yx7*(y_0/(c_6 + y_0) - 1)/(c_6 + y_0)**2 - c_2*yx15*(y_0/(c_6 + y_0) - 1)/(c_6 + y_0)**2 - c_2*yx5*(-y_0/(c_6 + y_0) + 1)/(c_6 + y_0)"],
    ["c_3*y_0 - c_4*y_1"],
    ["c_4*y_1 - c_5*y_2"],
    ["2*c_4*y_1*y_2 + c_4*y_1 + 2*c_4*yx3 - 2*c_5*y_2**2 + c_5*y_2 - 2*c_5*yx2 - 2*y_2*(c_4*y_1 - c_5*y_2)"],
    ["c_3*y_0*y_2 + c_3*yx5 + c_4*y_1**2 - c_4*y_1*y_2 - c_4*y_1 + c_4*yx4 - c_5*y_1*y_2 - y_1*(c_4*y_1 - c_5*y_2) - y_2*(c_3*y_0 - c_4*y_1) + yx3*(-c_4 - c_5)"],
    ["2*c_3*y_0*y_1 + c_3*y_0 + 2*c_3*yx6 - 2*c_4*y_1**2 + c_4*y_1 - 2*c_4*yx4 - 2*y_1*(c_3*y_0 - c_4*y_1)"],
    ["c_0*y_2 - c_1*y_0*y_2 - c_2*y_0*y_2**2/(c_6 + y_0) - c_2*y_0*yx2/(c_6 + y_0) - c_2*y_2*yx15*(y_0/(c_6 + y_0) - 1)/(c_6 + y_0)**2 - c_2*yx12*(-y_0/(c_6 + y_0) + 1)/(c_6 + y_0) + c_4*y_0*y_1 + c_4*yx6 - c_5*y_0*y_2 - y_0*(c_4*y_1 - c_5*y_2) - y_2*(c_0 - c_1*y_0 - c_2*y_0*y_2/(c_6 + y_0)) + yx5*(-c_1 - c_2*y_2*(-y_0/(c_6 + y_0) + 1)/(c_6 + y_0) - c_5)"],
    ["c_0*y_1 - c_1*y_0*y_1 - c_2*y_0*y_1*y_2/(c_6 + y_0) - c_2*y_0*yx3/(c_6 + y_0) - c_2*y_2*yx16*(y_0/(c_6 + y_0) - 1)/(c_6 + y_0)**2 - c_2*yx13*(-y_0/(c_6 + y_0) + 1)/(c_6 + y_0) + c_3*y_0**2 + c_3*yx7 - c_4*y_0*y_1 - y_0*(c_3*y_0 - c_4*y_1) - y_1*(c_0 - c_1*y_0 - c_2*y_0*y_2/(c_6 + y_0)) + yx6*(-c_1 - c_2*y_2*(-y_0/(c_6 + y_0) + 1)/(c_6 + y_0) - c_4)"],
    ["2*c_0*y_0 + c_0 - 2*c_1*y_0**2 + c_1*y_0 - 2*c_2*y_0**2*y_2/(c_6 + y_0) + c_2*y_0*y_2/(c_6 + y_0) - 2*y_0*(c_0 - c_1*y_0 - c_2*y_0*y_2/(c_6 + y_0)) + yx15*(2*c_2*y_0*(y_0/(c_6 + y_0) - 1)/(c_6 + y_0)**2 - 2*c_2*(y_0**2/(c_6 + y_0)**2 - 2*y_0/(c_6 + y_0) + 1)/(c_6 + y_0) + c_2*(y_0/(c_6 + y_0) - 1)/(c_6 + y_0)**2) + yx17*(2*c_2*y_0*y_2*(-y_0/(c_6 + y_0) + 1)/(c_6 + y_0)**3 - 2*c_2*y_2*(-y_0**2/(c_6 + y_0)**2 + 2*y_0/(c_6 + y_0) - 1)/(c_6 + y_0)**2 + c_2*y_2*(-y_0/(c_6 + y_0) + 1)/(c_6 + y_0)**3) + yx5*(2*c_2*y_0*(-y_0/(c_6 + y_0) + 1)/(c_6 + y_0) - 2*c_2*y_0*(-y_0/(c_6 + y_0) + 2)/(c_6 + y_0) + c_2*(-y_0/(c_6 + y_0) + 1)/(c_6 + y_0)) + yx7*(-2*c_1 + 2*c_2*y_0*y_2*(y_0/(c_6 + y_0) - 1)/(c_6 + y_0)**2 - 2*c_2*y_2*(y_0**2/(c_6 + y_0)**2 - 2*y_0/(c_6 + y_0) + 1)/(c_6 + y_0) + c_2*y_2*(y_0/(c_6 + y_0) - 1)/(c_6 + y_0)**2)"]
    ])

    def test_close_type_one(self):
        central_from_raw_exprs = to_sympy_matrix(
                    [["x_0_0_2-y_2**2"],
                    ["x_0_1_1-y_1*y_2"],
                    ["x_0_2_0-y_1**2"],
                    ["x_1_0_1-y_0*y_2"],
                    ["x_1_1_0-y_0*y_1"],
                    ["x_2_0_0-y_0**2"],
                    ["-3*x_0_0_2*y_2+x_0_0_3+2*y_2**3"],
                    ["-x_0_0_2*y_1-2*x_0_1_1*y_2+x_0_1_2+2*y_1*y_2**2"],
                    ["-2*x_0_1_1*y_1-x_0_2_0*y_2+x_0_2_1+2*y_1**2*y_2"],
                    ["-3*x_0_2_0*y_1+x_0_3_0+2*y_1**3"],
                    ["-x_0_0_2*y_0-2*x_1_0_1*y_2+x_1_0_2+2*y_0*y_2**2"],
                    ["-x_0_1_1*y_0-x_1_0_1*y_1-x_1_1_0*y_2+x_1_1_1+2*y_0*y_1*y_2"],
                    ["-x_0_2_0*y_0-2*x_1_1_0*y_1+x_1_2_0+2*y_0*y_1**2"],
                    ["-2*x_1_0_1*y_0-x_2_0_0*y_2+x_2_0_1+2*y_0**2*y_2"],
                    ["-2*x_1_1_0*y_0-x_2_0_0*y_1+x_2_1_0+2*y_0**2*y_1"],
                    ["-3*x_2_0_0*y_0+x_3_0_0+2*y_0**3"]
         ])


        max_order = 2

        expected = to_sympy_matrix([
            ["yx5*(c_2*y_0/(c_6 + y_0)**2 - c_2/(c_6 + y_0)) + yx7*(-c_2*y_0*y_2/(c_6 + y_0)**3 + c_2*y_2/(c_6 + y_0)**2) + c_0 - c_1*y_0 - c_2*y_0*y_2/(c_6 + y_0) + (-c_2*y_0/(c_6 + y_0)**3 + c_2/(c_6 + y_0)**2)*(2*yx5*yx7/y_0 + 2*yx5*y_0 + yx7*y_2 + 3*y_0**2*y_2 - 2*y_0*(yx5 + y_0*y_2) - y_2*(yx7 + y_0**2)) + (c_2*y_0*y_2/(c_6 + y_0)**4 - c_2*y_2/(c_6 + y_0)**3)*(2*yx7**2/y_0 + 3*yx7*y_0 + 3*y_0**3 - 3*y_0*(yx7 + y_0**2))"],
            ["c_3*y_0-c_4*y_1"],
            ["c_4*y_1-c_5*y_2"],
            ["c_4*y_1+c_5*y_2+2*c_4*yx3-2*c_5*yx2"],
            ["c_3*yx5-c_4*yx3-c_4*y_1+c_4*yx4-c_5*yx3"],
            ["c_3*y_0+c_4*y_1-2*c_4*yx4+2*c_3*yx6"],
            ["-yx2*c_2*y_0/(c_6 + y_0) + yx5*(-c_1 + 2*c_2*y_0*y_2/(c_6 + y_0)**2 - 2*c_2*y_2/(c_6 + y_0) - c_5 - y_2*(c_2*y_0/(c_6 + y_0)**2 - c_2/(c_6 + y_0))) + yx6*c_4 + yx7*(-c_2*y_0*y_2**2/(c_6 + y_0)**3 + c_2*y_2**2/(c_6 + y_0)**2 - y_2*(-c_2*y_0*y_2/(c_6 + y_0)**3 + c_2*y_2/(c_6 + y_0)**2)) + c_0*y_2 - c_1*y_0*y_2 - c_2*y_0*y_2**2/(c_6 + y_0) + c_4*y_0*y_1 - c_5*y_0*y_2 - y_0*(c_4*y_1 - c_5*y_2) - y_2*(c_0 - c_1*y_0 - c_2*y_0*y_2/(c_6 + y_0)) + (c_2*y_0/(c_6 + y_0)**2 - c_2/(c_6 + y_0))*(2*yx2*yx5/y_2 + yx2*y_0 + 2*yx5*y_2 + 3*y_0*y_2**2 - y_0*(yx2 + y_2**2) - 2*y_2*(yx5 + y_0*y_2)) + (-2*c_2*y_0*y_2/(c_6 + y_0)**3 + 2*c_2*y_2/(c_6 + y_0)**2 - y_2*(-c_2*y_0/(c_6 + y_0)**3 + c_2/(c_6 + y_0)**2))*(2*yx5*yx7/y_0 + 2*yx5*y_0 + yx7*y_2 + 3*y_0**2*y_2 - 2*y_0*(yx5 + y_0*y_2) - y_2*(yx7 + y_0**2)) + (c_2*y_0*y_2**2/(c_6 + y_0)**4 - c_2*y_2**2/(c_6 + y_0)**3 - y_2*(c_2*y_0*y_2/(c_6 + y_0)**4 - c_2*y_2/(c_6 + y_0)**3))*(2*yx7**2/y_0 + 3*yx7*y_0 + 3*y_0**3 - 3*y_0*(yx7 + y_0**2))"],
            ["-yx3*c_2*y_0/(c_6 + y_0) + yx5*(c_2*y_0*y_1/(c_6 + y_0)**2 - c_2*y_1/(c_6 + y_0) - y_1*(c_2*y_0/(c_6 + y_0)**2 - c_2/(c_6 + y_0))) + yx6*(-c_1 + c_2*y_0*y_2/(c_6 + y_0)**2 - c_2*y_2/(c_6 + y_0) - c_4) + yx7*(-c_2*y_0*y_1*y_2/(c_6 + y_0)**3 + c_2*y_1*y_2/(c_6 + y_0)**2 + c_3 - y_1*(-c_2*y_0*y_2/(c_6 + y_0)**3 + c_2*y_2/(c_6 + y_0)**2)) + c_0*y_1 - c_1*y_0*y_1 - c_2*y_0*y_1*y_2/(c_6 + y_0) + c_3*y_0**2 - c_4*y_0*y_1 - y_0*(c_3*y_0 - c_4*y_1) - y_1*(c_0 - c_1*y_0 - c_2*y_0*y_2/(c_6 + y_0)) + (c_2*y_0/(c_6 + y_0)**2 - c_2/(c_6 + y_0))*(yx3*y_0 + yx5*y_1 + yx6*y_2 + 3*y_0*y_1*y_2 - y_0*(yx3 + y_1*y_2) - y_1*(yx5 + y_0*y_2) - y_2*(yx6 + y_0*y_1)) + (-c_2*y_0*y_2/(c_6 + y_0)**3 + c_2*y_2/(c_6 + y_0)**2)*(2*yx6*yx7/y_0 + 2*yx6*y_0 + yx7*y_1 + 3*y_0**2*y_1 - 2*y_0*(yx6 + y_0*y_1) - y_1*(yx7 + y_0**2)) + (-c_2*y_0*y_1/(c_6 + y_0)**3 + c_2*y_1/(c_6 + y_0)**2 - y_1*(-c_2*y_0/(c_6 + y_0)**3 + c_2/(c_6 + y_0)**2))*(2*yx5*yx7/y_0 + 2*yx5*y_0 + yx7*y_2 + 3*y_0**2*y_2 - 2*y_0*(yx5 + y_0*y_2) - y_2*(yx7 + y_0**2)) + (c_2*y_0*y_1*y_2/(c_6 + y_0)**4 - c_2*y_1*y_2/(c_6 + y_0)**3 - y_1*(c_2*y_0*y_2/(c_6 + y_0)**4 - c_2*y_2/(c_6 + y_0)**3))*(2*yx7**2/y_0 + 3*yx7*y_0 + 3*y_0**3 - 3*y_0*(yx7 + y_0**2))"],
            ["yx5*(2*c_2*y_0**2/(c_6 + y_0)**2 - 4*c_2*y_0/(c_6 + y_0) - c_2*y_0/(c_6 + y_0)**2 + c_2/(c_6 + y_0) - 2*y_0*(c_2*y_0/(c_6 + y_0)**2 - c_2/(c_6 + y_0))) + yx7*(-2*c_1 - 2*c_2*y_0**2*y_2/(c_6 + y_0)**3 + 4*c_2*y_0*y_2/(c_6 + y_0)**2 + c_2*y_0*y_2/(c_6 + y_0)**3 - 2*c_2*y_2/(c_6 + y_0) - c_2*y_2/(c_6 + y_0)**2 - 2*y_0*(-c_2*y_0*y_2/(c_6 + y_0)**3 + c_2*y_2/(c_6 + y_0)**2)) + 2*c_0*y_0 + c_0 - 2*c_1*y_0**2 + c_1*y_0 - 2*c_2*y_0**2*y_2/(c_6 + y_0) + c_2*y_0*y_2/(c_6 + y_0) - 2*y_0*(c_0 - c_1*y_0 - c_2*y_0*y_2/(c_6 + y_0)) + (2*yx7**2/y_0 + 3*yx7*y_0 + 3*y_0**3 - 3*y_0*(yx7 + y_0**2))*(2*c_2*y_0**2*y_2/(c_6 + y_0)**4 - 4*c_2*y_0*y_2/(c_6 + y_0)**3 - c_2*y_0*y_2/(c_6 + y_0)**4 + 2*c_2*y_2/(c_6 + y_0)**2 + c_2*y_2/(c_6 + y_0)**3 - 2*y_0*(c_2*y_0*y_2/(c_6 + y_0)**4 - c_2*y_2/(c_6 + y_0)**3)) + (2*yx5*yx7/y_0 + 2*yx5*y_0 + yx7*y_2 + 3*y_0**2*y_2 - 2*y_0*(yx5 + y_0*y_2) - y_2*(yx7 + y_0**2))*(-2*c_2*y_0**2/(c_6 + y_0)**3 + 4*c_2*y_0/(c_6 + y_0)**2 + c_2*y_0/(c_6 + y_0)**3 - 2*c_2/(c_6 + y_0) - c_2/(c_6 + y_0)**2 - 2*y_0*(-c_2*y_0/(c_6 + y_0)**3 + c_2/(c_6 + y_0)**2))"]
        ])

        closer = GammaClosure(max_order, multivariate=True)
        answer = closer.close(self.__mfk, central_from_raw_exprs, self.__n_counter, self.__k_counter)
        self.assertTrue(sympy_expressions_equal(answer, expected))


    def test_close_type_zero(self):

        central_from_raw_exprs = to_sympy_matrix(
                    [["x_0_0_2-y_2**2"],
                    ["x_0_1_1-y_1*y_2"],
                    ["x_0_2_0-y_1**2"],
                    ["x_1_0_1-y_0*y_2"],
                    ["x_1_1_0-y_0*y_1"],
                    ["x_2_0_0-y_0**2"],
                    ["-3*x_0_0_2*y_2+x_0_0_3+2*y_2**3"],
                    ["-x_0_0_2*y_1-2*x_0_1_1*y_2+x_0_1_2+2*y_1*y_2**2"],
                    ["-2*x_0_1_1*y_1-x_0_2_0*y_2+x_0_2_1+2*y_1**2*y_2"],
                    ["-3*x_0_2_0*y_1+x_0_3_0+2*y_1**3"],
                    ["-x_0_0_2*y_0-2*x_1_0_1*y_2+x_1_0_2+2*y_0*y_2**2"],
                    ["-x_0_1_1*y_0-x_1_0_1*y_1-x_1_1_0*y_2+x_1_1_1+2*y_0*y_1*y_2"],
                    ["-x_0_2_0*y_0-2*x_1_1_0*y_1+x_1_2_0+2*y_0*y_1**2"],
                    ["-2*x_1_0_1*y_0-x_2_0_0*y_2+x_2_0_1+2*y_0**2*y_2"],
                    ["-2*x_1_1_0*y_0-x_2_0_0*y_1+x_2_1_0+2*y_0**2*y_1"],
                    ["-3*x_2_0_0*y_0+x_3_0_0+2*y_0**3"]
         ])

        max_order = 2
        expected = to_sympy_matrix([
            ["c_0-c_1*y_0-(c_2*c_6*yx5)/(c_6+y_0) ** 2-(c_2*y_0*y_2)/(c_6+y_0)+(c_2*c_6*y_2*yx7)/(c_6+y_0) ** 3-(2*c_2*c_6*y_2*yx7 ** 2)/(y_0*(c_6+y_0) ** 4)"],
            ["c_3*y_0-c_4*y_1"],
            ["c_4*y_1-c_5*y_2"],
            ["c_4*y_1+c_5*y_2+2*c_4*yx3-2*c_5*yx2"],
            ["c_3*yx5-c_4*yx3-c_4*y_1+c_4*yx4-c_5*yx3"],
            ["c_3*y_0+c_4*y_1-2*c_4*yx4+2*c_3*yx6"],
            ["c_4*yx6-c_1*yx5-c_5*yx5-(c_2*y_0*yx2)/(c_6+y_0)-(c_2*y_2*yx5)/(c_6+y_0)+(c_2*y_0*y_2*yx5)/(c_6+y_0) ** 2"],
            ["c_3*yx7-c_1*yx6-c_4*yx6-(c_2*y_0*yx3)/(c_6+y_0)-(c_2*y_2*yx6)/(c_6+y_0)+(c_2*y_0*y_2*yx6)/(c_6+y_0) ** 2"],
            ["(c_0*y_0 ** 5+c_1*y_0 ** 6+c_2*y_0 ** 5*y_2-2*c_2*y_0 ** 5*yx5-2*c_1*y_0 ** 5*yx7+6*c_0*c_6 ** 2*y_0 ** 3+4*c_0*c_6 ** 3*y_0 ** 2+6*c_1*c_6 ** 2*y_0 ** 4+4*c_1*c_6 ** 3*y_0 ** 3+c_1*c_6 ** 4*y_0 ** 2+4*c_0*c_6*y_0 ** 4+c_0*c_6 ** 4*y_0+4*c_1*c_6*y_0 ** 5+3*c_2*c_6*y_0 ** 4*y_2+c_2*c_6*y_0 ** 3*yx5+c_2*c_6 ** 3*y_0*yx5-6*c_2*c_6*y_0 ** 4*yx5-8*c_1*c_6*y_0 ** 4*yx7-2*c_1*c_6 ** 4*y_0*yx7+2*c_2*c_6*y_2*yx7 ** 2+3*c_2*c_6 ** 2*y_0 ** 3*y_2+c_2*c_6 ** 3*y_0 ** 2*y_2+2*c_2*c_6 ** 2*y_0 ** 2*yx5-6*c_2*c_6 ** 2*y_0 ** 3*yx5-2*c_2*c_6 ** 3*y_0 ** 2*yx5-12*c_1*c_6 ** 2*y_0 ** 3*yx7-8*c_1*c_6 ** 3*y_0 ** 2*yx7+4*c_2*c_6 ** 2*y_2*yx7 ** 2-4*c_2*c_6 ** 2*y_0 ** 2*y_2*yx7+4*c_2*c_6*y_0*y_2*yx7 ** 2-c_2*c_6*y_0 ** 2*y_2*yx7-c_2*c_6 ** 2*y_0*y_2*yx7-2*c_2*c_6*y_0 ** 3*y_2*yx7-2*c_2*c_6 ** 3*y_0*y_2*yx7)/(y_0*(c_6+y_0) ** 4)"]
        ])
        closer = GammaClosure(max_order, multivariate=False)
        answer = closer.close(self.__mfk, central_from_raw_exprs, self.__n_counter, self.__k_counter)
        self.assertTrue(sympy_expressions_equal(answer, expected))

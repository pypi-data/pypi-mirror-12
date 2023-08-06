#!/usr/bin/env python

import unittest
import numbers
import fractions

import qsoptex

from six import b, u


class TestVariableType(unittest.TestCase):
    def test_variable_str(self):
        """Test that a variable of bytes type works"""
        self._problem = qsoptex.ExactProblem()
        self._problem.add_variable(name=b('x'))

    def test_variable_unicode(self):
        """Test that a variable of unicode type works"""
        self._problem = qsoptex.ExactProblem()
        self._problem.add_variable(name=u('x'))


class TestSmallExactProblem(unittest.TestCase):
    def setUp(self):
        self._problem = qsoptex.ExactProblem()
        self._problem.add_variable(
            name='x', objective=2, lower=3.5, upper=17.5)
        self._problem.add_variable(
            name='y', objective=-1, lower=None, upper=2)
        self._problem.add_linear_constraint(
            qsoptex.ConstraintSense.EQUAL, {'x': 1, 'y': 1}, rhs=0, name='c1')
        self._problem.set_objective_sense(qsoptex.ObjectiveSense.MAXIMIZE)

    def test_add_infinity_variable_bound(self):
        self._problem.add_variable(
            name='z1', lower=float('-inf'), upper=10)
        self._problem.add_variable(
            name='z2', lower=0, upper=float('inf'))

    def test_reaches_status_optimal(self):
        status = self._problem.solve()
        self.assertEqual(status, qsoptex.SolutionStatus.OPTIMAL)

    def test_reaches_status_infeasible(self):
        self._problem.add_variable(name='z', lower=200, upper=None)
        self._problem.add_linear_constraint(
            qsoptex.ConstraintSense.GREATER, {'y': 1, 'z': -1}, rhs=0)
        status = self._problem.solve()
        self.assertEqual(status, qsoptex.SolutionStatus.INFEASIBLE)

    def test_reaches_status_unbounded(self):
        self._problem.add_variable(
            name='z', lower=200, upper=None, objective=1)
        status = self._problem.solve()
        self.assertEqual(status, qsoptex.SolutionStatus.UNBOUNDED)

    def test_objective_value_is_correct(self):
        self._problem.solve()
        obj = self._problem.get_objective_value()
        self.assertEqual(obj, fractions.Fraction('105/2'))

    def test_objective_value_is_rational(self):
        self._problem.solve()
        obj = self._problem.get_objective_value()
        self.assertIsInstance(obj, numbers.Rational)

    def test_solution_values_by_name_are_rational(self):
        self._problem.solve()
        x = self._problem.get_value('x')
        self.assertIsInstance(x, numbers.Rational)

        y = self._problem.get_value('y')
        self.assertIsInstance(y, numbers.Rational)

    def test_solution_values_by_index_are_same(self):
        self._problem.solve()
        x = self._problem.get_value('x')
        self.assertEqual(x, self._problem.get_value(0))

        y = self._problem.get_value('y')
        self.assertEqual(y, self._problem.get_value(1))

    def test_solution_get_all_values_are_correct(self):
        self._problem.solve()
        values = self._problem.get_values()
        self.assertEqual(values, [fractions.Fraction('35/2'),
                                  fractions.Fraction('-35/2')])

    def test_solution_value_index_negative(self):
        self._problem.solve()
        with self.assertRaises(IndexError):
            self._problem.get_value(-1)

    def test_solution_value_index_too_high(self):
        self._problem.solve()
        with self.assertRaises(IndexError):
            self._problem.get_value(10)

    def test_get_status_method(self):
        s = self._problem.solve()
        self.assertEqual(s, self._problem.get_status())

    def test_get_constraint_count(self):
        self.assertEqual(self._problem.get_constraint_count(), 1)

    def test_get_variable_count(self):
        self.assertEqual(self._problem.get_variable_count(), 2)

    def test_rerun_solve(self):
        self._problem.solve()

        # Modified problem
        self._problem.add_variable(name='z', objective=1, lower=0, upper=200)
        self._problem.add_linear_constraint(
            qsoptex.ConstraintSense.LESS, {'z': 1, 'x': -10}, rhs=-50)
        self._problem.solve()

        self.assertEqual(
            self._problem.get_objective_value(), fractions.Fraction('355/2'))

    def test_delete_variable(self):
        self._problem.add_variable(name='z', objective=1, lower=0, upper=1)
        status = self._problem.solve()
        self.assertEqual(status, qsoptex.SolutionStatus.OPTIMAL)
        obj = self._problem.get_objective_value()
        self.assertEqual(obj, fractions.Fraction('107/2'))

        self._problem.delete_variable('z')

        # Solve problem again without z
        status = self._problem.solve()
        self.assertEqual(status, qsoptex.SolutionStatus.OPTIMAL)
        obj = self._problem.get_objective_value()
        self.assertEqual(obj, fractions.Fraction('105/2'))

    def test_delete_constraint(self):
        self._problem.add_linear_constraint(
            qsoptex.ConstraintSense.LESS, {'x': 1}, rhs=15, name='constr2')
        status = self._problem.solve()
        self.assertEqual(status, qsoptex.SolutionStatus.OPTIMAL)
        self.assertEqual(self._problem.get_value('x'), 15)

        self._problem.delete_linear_constraint('constr2')

        status = self._problem.solve()
        self.assertEqual(status, qsoptex.SolutionStatus.OPTIMAL)
        self.assertEqual(
            self._problem.get_value('x'), fractions.Fraction('35/2'))


if __name__ == '__main__':
    unittest.main()

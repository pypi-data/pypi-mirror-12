
"""
Automatically generated by pymola
"""

# imports
from __future__ import print_function
import sympy
import sympy.physics.mechanics as mech
sympy.init_printing()
mech.init_vprinting()
import scipy.integrate
import argparse
import pylab as pl
import sys
class Model(object):

    def __init__(self):

        # parameters
        self.p = {
            'g' : 9.81,
            'c' : 0.90,
        }

        # states
        self.x0 = {
            'height' : 10,
            'velocity' : 0,
        }

		# equations
		self.eqs = [der(height)=velocityder(velocity)=-gwhenheight<0thenreinit(velocity,-c*velocity);endwhen
		]

    def simulate(self, do_plot):
        "Simulate model."

        t = sympy.symbols('t')

        x = sympy.Matrix(x)
        x_dot = x.diff(t)

        sol = sympy.solve(self.eqs, x_dot)

        f = sympy.Matrix([sol[xi] for xi in x_dot])

        p_vect = [locals()[key] for key in p]

        f_lam = sympy.lambdify((t, x, p_vect), f)

        t0 = 0
        x0 = [0, 0]
        p0 = [1, 1]

        sim = scipy.integrate.ode(f_lam)
        sim.set_initial_value(t0, x0)
        sim.set_f_params(p0)
        tf = 10
        dt = 0.1

        data = {
            'x': [],
            't': [],
        }

        while  sim.t < tf:
            sim.integrate(sim.t + dt)
            data['x'] += [sim.y]
            data['t'] += [sim.t]

        if do_plot:
            pl.plot(data['t'], data['x'])

def main(argv):
    "main function"
    parser = argparse.ArgumentParser()
    parser.add_argument('--plot', '-p', action='store_true')
    args = parser.parse_args(argv)
    parser.set_defaults(plot=False)
    model = Model()
    model.simulate(do_plot=args.plot)

if __name__ == "__main__":
    main(sys.argv[1:])


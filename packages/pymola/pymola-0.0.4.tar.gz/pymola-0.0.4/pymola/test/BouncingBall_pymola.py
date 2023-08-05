
#############################################################################
# Automatically generated by pymola

from __future__ import print_function
import sympy
import sympy.physics.mechanics as mech
sympy.init_printing()
mech.init_vprinting()
import scipy.integrate
import pylab as pl

#pylint: disable=too-few-public-methods, too-many-locals, invalid-name, no-member

class Model(object):
    """
    Modelica Model.
    """

    def __init__(self):
        """
        Constructor.
        """

        self.t = sympy.symbols('t')

        
        # symbols
        c, g = \
            sympy.symbols('c, g')
        

        # dynamic symbols
        velocity, height = \
            mech.dynamicsymbols('velocity, height')

        # parameters
        self.p_dict = {
            'c': 0.90,
            'g': 9.81,
        }

        # initial sate
        self.x0_dict = {
            'velocity': 0,
            'height': 10,
        }

        # state space
        self.x = sympy.Matrix([
            velocity, height
        ])

        # equations
        self.eqs = [
            height.diff(self.t) - velocity,
            velocity.diff(self.t) - -(g),
            ]


        # when equations



        self.x = sympy.Matrix(self.x)
        self.x_dot = self.x.diff(self.t)

        self.sol = sympy.solve(self.eqs, self.x_dot)

        self.f = sympy.Matrix([self.sol[xi] for xi in self.x_dot])
        print('x:', self.x)
        print('f:', self.f)

        self.p_vect = [locals()[key] for key in self.p_dict.keys()]
        self.p0 = [self.p_dict[key] for key in self.p_dict.keys()]

        print('p:', self.p_vect)

        self.f_lam = sympy.lambdify((self.t, self.x, self.p_vect), self.f)

        self.x0 = [self.x0_dict[key] for key in self.x0_dict.keys()]

    def simulate(self, tf=30, dt=0.001, show=False):
        """
        Simulation function.
        """

        sim = scipy.integrate.ode(self.f_lam)
        sim.set_initial_value(self.x0, 0)
        sim.set_f_params(self.p0)

        data = {
            'x': [],
            't': [],
        }

        while  sim.t < tf:
            sim.integrate(sim.t + dt)
            t = sim.t

            # TODO replace hardcoded when statement
            # below
            #velocity = sim.y[0]
            #height = sim.y[1]
            #c = self.p0[0]
            #if velocity < 0 and height < 0:
            #    velocity = -c*velocity
            #    height = 0
            #    sim.set_initial_value([velocity, height], t)

            # data['x'] += [[velocity, height]]
            data['x'] += [sim.y]
            data['t'] += [t]

        pl.plot(data['t'], data['x'])
        if show:
            pl.show()

        return data

if __name__ == "__main__":
    model = Model()
    model.simulate()

#############################################################################

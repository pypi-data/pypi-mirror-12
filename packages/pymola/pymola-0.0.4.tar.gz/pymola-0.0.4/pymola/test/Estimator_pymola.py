
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
        a_z, a_y, a_x = \
            sympy.symbols('a_z, a_y, a_x')
        

        # dynamic symbols
        y, x, z, v_x, v_y, v_z = \
            mech.dynamicsymbols('y, x, z, v_x, v_y, v_z')

        # parameters
        self.p_dict = {
            'a_z': 1,
            'a_y': 1,
            'a_x': 1,
        }

        # initial sate
        self.x0_dict = {
            'y': 0,
            'x': 0,
            'z': 0,
            'v_x': 0,
            'v_y': 0,
            'v_z': 0,
        }

        # state space
        self.x = sympy.Matrix([
            y, x, z, v_x, v_y, v_z
        ])

        # equations
        self.eqs = [
            x.diff(self.t) - v_x,
            y.diff(self.t) - v_y,
            z.diff(self.t) - v_z,
            v_x.diff(self.t) - a_x,
            v_y.diff(self.t) - a_y,
            v_z.diff(self.t) - a_z,
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

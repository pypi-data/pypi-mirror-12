import numpy as np
from astropy.constants import G as conG
from ..model_src import Model

class Plummer(Model.Model):

    def __init__(self,rc,Mtot,G='kpc km2 / (M_sun s2)'):
        """
        Analytic Plummer model
        :param rc: Plummer scale length
        :param Mtot:  Plummer total mass
        :param G: Value of the gravitational constant G, it can be a number of a string.
                    If G=1, the physical value of the potential will be Phi/G.
                    If string it must follow the rule of the unity of the module.astropy constants.
                    E.g. to have G in unit of kpc3/Msun s2, the input string is 'kpc3 / (M_sun s2)'
                    See http://astrofrog-debug.readthedocs.org/en/latest/constants/

        :return:
        """
        self.rc=rc
        self.Mtot=Mtot
        if isinstance(G,float) or isinstance(G,int): self.G=G
        else:
            GG=conG.to(G)
            self.G=GG.value

        self._use_nparray=True
        self.use_c=False
        self._densnorm=(3*Mtot)/(4*np.pi*rc*rc*rc)
        self._potnorm=self.G*Mtot

    def _evaluatedens(self,R):

        dd= (1 + ( (R*R) / (self.rc*self.rc) ) )

        return self._densnorm*(dd)**(-2.5)

    def _evaluatemass(self,R):

        x=R/self.rc

        return self.Mtot*( (x*x*x) / (1+x*x)**(1.5)  )

    def _evaluatepot(self,R):

        den=np.sqrt(R*R + self.rc*self.rc)

        return self._potnorm/den

    def df_plummer(self,dens,e):
        """
        Analytic plummer density to be used to make a model.

        :param dens: This paramters is not uses and it is present only to use to called as the numerical df function
        :param e: Energy grid
        :return: the energy grid, the df grid, the df function
        """

        dffunc=lambda x: x**(3.5)*((24*np.sqrt(2))/(7*np.pi*np.pi*np.pi))*((self.rc*self.rc)/(self.G**5 * self.Mtot**4))
        df_grid=e**(3.5)*((24*np.sqrt(2))/(7*np.pi*np.pi*np.pi))*((self.rc*self.rc)/(self.G**5 * self.Mtot**4))

        return e,df_grid,dffunc




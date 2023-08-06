import numpy as np
from astropy.constants import G as conG
from scipy.interpolate import UnivariateSpline
from scipy.linalg import eigh
import copy

from ..particle_src.particle import  Particles
from ..io_src.LoadSnap import load_snap
from ..utility_src.utility import nparray_check, Continue_check
from ..grid_src.grid import grid



class Analysis:

    def __init__(self, particles=None, safe=True, auto_centre=False ,**kwargs):

        #Check input
        if 'filename' in kwargs: self.p=load_snap(kwargs['filename'])
        elif isinstance(particles,Particles):
            if safe==True: self.p=copy.deepcopy(particles)
            else: self.p=particles
        else: raise IOError('Incorrect particles or filename')

        #Assure that rad and total vel are stored
        self.p.setrad()
        self.p.setvelt()
        self._set_pindex()
        if auto_centre==True:
            if 'mq' in kwargs:
                mq=kwargs['mq']
                self.center(mq=mq)
            else:
                self.center()

    def qmass(self,q,safe_mode=True,type=None):
        """
        Calculate the radius in which the mass is a q % fraction of the total mass.
        :param q: q is the mass fraction, it can range from 0 to 100
        :param safe_mode:
        :param type:
        :return: An array with the value of the radius where mass is a q % fraction of the total mass.
                 and the total value of the mass for the type choosen.
        """

        if type is None:
            rad_array=self.p.Radius[:]
            mas_array=self.p.Mass[:]
        else:
            type= nparray_check(type)
            rad_array=self._make_array(self.p.Radius,type)
            mas_array=self._make_array(self.p.Mass,type)



        ret_value,_=self.qradius_ext(rad_array,mas_array,q,safe_mode=safe_mode)

        return  ret_value

    def com(self,mq=None,minrad=None,maxrad=None,type=None):
        """
        Calculate the position of the center of mass and its velocity
        :param mq [0-100]: Fraction of the mass where to calc the com. If different from None, the com will be calculated from 0 to rq, where rq is the mass that contain the fraction mq
                            mq will have the proprity with respect of minrad and maxrad, that will be used only in the case mq=None.
        :param minrad: Min radius to use to calculate the com. If None use the minimum radius of the particles.
        :param maxrad: Max radius to use to calculate the com. If None use maximum radius of the particles.
        :param type: Particle type to use to calculate the mean. If None use all the component together
        :return: com: array with the xyz position of the com, vcom: array with vx vy vz of the com.
        """
        if type is None:
            rad_array=self.p.Radius[:]
            vel_array=self.p.Vel[:]
            pos_array=self.p.Pos[:]
            mas_array=self.p.Mass[:]
        else:
            type= nparray_check(type)
            rad_array=self._make_array(self.p.Radius,type)
            vel_array=self._make_array(self.p.Vel,type)
            pos_array=self._make_array(self.p.Pos,type)
            mas_array=self._make_array(self.p.Mass,type)

        if mq is None:
            if minrad is None: minrad=np.min(rad_array)
            if maxrad is None: maxrad=np.max(rad_array)
        else:
            minrad=np.min(rad_array)
            maxrad,_=self.qradius_ext(rad_array,mas_array,mq)


        idx_bound=  (rad_array>=minrad) & (rad_array<=maxrad)

        ret_com= self.massw_mean(pos_array[idx_bound], mas_array[idx_bound])
        ret_vom= self.massw_mean(vel_array[idx_bound], mas_array[idx_bound])


        return ret_com, ret_vom

    def tdyn(self,mq=100,type=None,G='(kpc3)/(M_sun s2)'):
        """
        Calculate the dynamical time of a stystem as Tdyn=0.5*pi*Sqrt(Rh^3/(G*Mh)).
        where Rh is the radius that contains the fraction Mh=h*M of the mass.
        This is the time for a particle at distance r to reach r=0 in a homogeneus spherical system
        with density rho. We do not have an homogenues sphere, but we use a medium value rho_mh
        equals to Mh/(4/3 * pi * Rh^3).
        :param mq: Fraction of the mass to use, it can ranges from 0 to 100
        :param type: Type of particle to use, it need to be an array. If None use all
        :param G: Value of the gravitational constant G, it can be a number of a string.
                    If G=1, the physical value of the potential will be Phi/G.
                    If string it must follow the rule of the unity of the module.astropy constants.
                    E.g. to have G in unit of kpc3/Msun s2, the input string is 'kpc3 / (M_sun s2)'
                    See http://astrofrog-debug.readthedocs.org/en/latest/constants/

        :return: Dynamical tyme. The units wil depends on the units used in G, If used the
                 G in default the time will be in unit of Gyr.
        """

        if type is None:
            rad_array=self.p.Radius[:]
            mas_array=self.p.Mass[:]
        else:
            type= nparray_check(type)
            rad_array=self._make_array(self.p.Radius,type)
            mas_array=self._make_array(self.p.Mass,type)


        if isinstance(G,float) or isinstance(G,int): G=G
        else:
            GG=conG.to(G)
            G=GG.value

        rq,_=self.qradius_ext(rad_array,mas_array,mq)

        mass_phy=G*(mq/100)*np.sum(mas_array)
        tdyn=0.5*np.pi*rq*np.sqrt(rq/mass_phy)


        return tdyn

    def softening_scale(self,mq=70,auto=True,r=None,dens=None,mass=None,kernel='Gadget'):
        """
        Calculate the optimal softening scale following Dehnen, 2012 eps=cost*a(dens)*N^-0.2. The output will be in unit
        of r. If Auto==True, r and dens will be not considered.
        :param mq: Mass fraction where calcualte the softening_scale.
        :param auto: If True calculate the r-dens gride using the grid and Profile class
                wit 512 points from 0.001*rq to 10*rq.
        :param r: Array with the sampling radii.
        :param dens: Array with the density at the sampling radii. Its unity need to be the same of mass/r^3
        :param mass: Total mass of the system, the method will calculate in automatic the fraction mq/100*mass
        :param kernel: Kernel to use. Different kernel have different constant C. The implemented kernels are:
                        -spline: generic cubic spline (as in Dehnen, 2012)
                        -Gadget: to calculate the softening_scale using the spline kernel of Gadget2
        :return: the softening scale.
        """
        opt_dict={'Gadget':0.698352, 'spline':0.977693}
        rq=self.qmass(mq)

        if auto==True:
            prof=Profile(self.p,Ngrid=512,xmin=0.001*rq,xmax=10*rq,kind='lin')
            r=prof.grid.gx
            dens=prof.dens



        dens_spline=UnivariateSpline(r, dens, k=1,s=0,ext=1)
        der_dens=dens_spline.derivative()




        derdens=der_dens(r)
        ap=UnivariateSpline(r, r*r*dens*derdens*derdens, k=1,s=0,ext=1)
        bp=UnivariateSpline(r, r*r*dens*dens, k=1,s=0,ext=1)

        B=bp.integral(0,rq)
        A=ap.integral(0,rq)/(mass*mq/100.)
        C=(B/(A))**(1/5)

        cost=opt_dict[kernel]
        N=len(self.p.Id)**(1/5)

        return C*cost/N

    @staticmethod
    def qradius_ext(radius_array,mass_array,q,safe_mode=True):
        """

        :param radius_array:
        :param mass_array:
        :param q:
        :param safe_mode:
        :return:
        """
        if safe_mode==True:

            #check array
            radius_array=nparray_check(radius_array)
            mass_array=nparray_check(mass_array)

            #check q
            qlist=nparray_check(q)
            check_q=qlist>100
            if np.any(check_q): raise ValueError('The percent massfraction must be in the range[0-100]')

            #check mass
            if np.any(mass_array<=0):  Continue_check('Warning one or more particles have Mass<=0')


        idx_sort=np.argsort(radius_array)
        radsort=radius_array[idx_sort]
        massort=mass_array[idx_sort]
        cum_mass=massort.cumsum()
        cum_mass=100*cum_mass/cum_mass[-1]

        qmass_func=UnivariateSpline(cum_mass,radsort,k=1,s=0,ext=1)
        radq=qmass_func(q)

        return radq,qmass_func

    @staticmethod
    def massw_mean(x_array,mass_array):
        """
        Mass weighted mean on the array x_array
        :param x_array: array where to calculate the wmean
        :param mass_array: mass array
        :return: massweighted mean
        """

        ret_arr=(mass_array*x_array.T)/(np.sum(mass_array))

        return np.sum(ret_arr,axis=1)

    def center(self,mq=98, single=True, type=None):
        """
        Translate the system in the center of mass, Usually is the first thing to done after the call
        of the Class. The function has two modes, if single==False, the com and vcom will be calculated
        over all the particle specified in type, and all the particles will be moved in the com and vcom.
        If single==True, a separate com and vcom will be calculated for each particle type and only the
        related particle will be moved in such com and vcom.
        The second method seems to give better results.
        :param mq: Mass fraction of particles used to calculate the com.
        :param single: If true enable the single method, see above.
        :param type:  IF single==False, use only this type of particle to calculate com.
        """

        if single==False:
            com,vcom=self.com(mq=mq, type=type)

            self.p.Pos=self.p.Pos - com
            self.p.Vel=self.p.Vel - vcom
            self.p.setrad()
            self.p.setvelt()

        else:

            i=0
            for i in range(6):

                co=self.p.header['Nall'][i]

                if co!=0:

                    com,vcom=self.com(mq=mq, type=[i])
                    idxmin=self.pindex[i][0]
                    idxmax=self.pindex[i][1]
                    self.p.Pos[idxmin:idxmax]=self.p.Pos[idxmin:idxmax] - com
                    self.p.Vel[idxmin:idxmax]=self.p.Vel[idxmin:idxmax] - vcom
                    self.p.setrad()
                    self.p.setvelt()



                i+=1

    def inertia_tensor(self,eig=True,mq=None,minrad=None,maxrad=None,type=None):
        """
        Calculate the inertia tensor and eventually the three eigenvector.
        :param eig: If True calculate the eigenvector of the symmetric inertia tensor matrix.
        :param mq [0-100]: Fraction of the mass where to calc the angolar momentum. If different from None, the com will be calculated from 0 to rq, where rq is the mass that contain the fraction mq
                            mq will have the proprity with respect of minrad and maxrad, that will be used only in the case mq=None.
        :param minrad: Min radius to use to calculate the com. If None use the minimum radius of the particles.
        :param maxrad: Max radius to use to calculate the com. If None use maximum radius of the particles.
        :param type: Particle type to use to calculate the mean. If None use all the component together
        :return: com: array with the xyz position of the com, vcom: array with vx vy vz of the com.
        """

        if type is None:
            rad_array=self.p.Radius[:]
            pos_array=self.p.Pos[:]
            mas_array=self.p.Mass[:]
        else:
            type= nparray_check(type)
            rad_array=self._make_array(self.p.Radius,type)
            pos_array=self._make_array(self.p.Pos,type)
            mas_array=self._make_array(self.p.Mass,type)

        if mq is None:
            if minrad is None: minrad=np.min(rad_array)
            if maxrad is None: maxrad=np.max(rad_array)
        else:
            minrad=np.min(rad_array)
            maxrad,_=self.qradius_ext(rad_array,mas_array,mq)

        idx_bound=  (rad_array>=minrad) & (rad_array<=maxrad)

        return self._set_tensor(pos_array[idx_bound],mas_array[idx_bound],eig=eig)

    def vinertia_tensor(self,eig=True,mq=None,minrad=None,maxrad=None,type=None):
        """
        Calculate the kinetic tensor  and eventually the three eigenvector.
        :param eig: If True calculate the eigenvector of the symmetric inertia tensor matrix.
        :param mq [0-100]: Fraction of the mass where to calc the angolar momentum. If different from None, the com will be calculated from 0 to rq, where rq is the mass that contain the fraction mq
                            mq will have the proprity with respect of minrad and maxrad, that will be used only in the case mq=None.
        :param minrad: Min radius to use to calculate the com. If None use the minimum radius of the particles.
        :param maxrad: Max radius to use to calculate the com. If None use maximum radius of the particles.
        :param type: Particle type to use to calculate the mean. If None use all the component together
        :return: com: array with the xyz position of the com, vcom: array with vx vy vz of the com.
        """

        if type is None:
            rad_array=self.p.Radius[:]
            vel_array=self.p.Vel[:]
            mas_array=self.p.Mass[:]
        else:
            type= nparray_check(type)
            rad_array=self._make_array(self.p.Radius,type)
            vel_array=self._make_array(self.p.Vel,type)
            mas_array=self._make_array(self.p.Mass,type)

        if mq is None:
            if minrad is None: minrad=np.min(rad_array)
            if maxrad is None: maxrad=np.max(rad_array)
        else:
            minrad=np.min(rad_array)
            maxrad,_=self.qradius_ext(rad_array,mas_array,mq)

        idx_bound=  (rad_array>=minrad) & (rad_array<=maxrad)

        return self._set_tensor(vel_array[idx_bound],mas_array[idx_bound],eig=eig)

    def _set_pindex(self):
        pindex=[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
        cum_count=0
        i=0
        for npar_t in self.p.header['Nall']:
            if npar_t!=0:
                pindex[i]=[cum_count,cum_count+npar_t]
                cum_count+=npar_t
            i+=1
        self.pindex=pindex

    def _make_array(self,original_array,type):
        """
        Extract from the original array only the particles belonging to the tye in the array type
        :param original_array: Array where to extract value
        :param type: Type of particle to extract, it need to be an array
        :return: A sub-sample of the original_array with only
        """

        #Define array dimension

        ndim=0

        for i in type: ndim+=self.p.header['Nall'][i]

        original_shape=original_array.shape



        if len(original_shape)==1:
                ret_arr=np.zeros(shape=(ndim))
        elif len(original_shape)==2:
                axis2=original_shape[1]
                ret_arr=np.zeros(shape=(ndim,axis2))
        else: raise ValueError('Original array dimension need to have 1 or 2 axis')



        cumsum=0
        for i in np.sort(type):
            idxmin=self.pindex[i][0]
            idxmax=self.pindex[i][1]
            npart_type=self.p.header['Nall'][i]
            ret_arr[cumsum:cumsum+npart_type]=original_array[idxmin:idxmax]
            cumsum+=npart_type

        return ret_arr

    def _set_tensor(self,value_array,weight_array,eig=True):

        mat=weight_array*value_array.T
        mat2=mat.dot(value_array)

        if eig==True: return mat2, eigh(mat2, eigvals_only = True)
        else:  return mat2

    def angolar_momentum(self,mq=None,minrad=None,maxrad=None,type=None):
        """
        Calculate the three components of the angular momentum.
        :param mq [0-100]: Fraction of the mass where to calc the angolar momentum. If different from None, the com will be calculated from 0 to rq, where rq is the mass that contain the fraction mq
                            mq will have the proprity with respect of minrad and maxrad, that will be used only in the case mq=None.
        :param minrad: Min radius to use to calculate the com. If None use the minimum radius of the particles.
        :param maxrad: Max radius to use to calculate the com. If None use maximum radius of the particles.
        :param type: Particle type to use to calculate the mean. If None use all the component together
        :return: com: array with the xyz position of the com, vcom: array with vx vy vz of the com.
        """

        if type is None:
            rad_array=self.p.Radius[:]
            vel_array=self.p.Vel[:]
            pos_array=self.p.Pos[:]
            mas_array=self.p.Mass[:]
        else:
            type= nparray_check(type)
            rad_array=self._make_array(self.p.Radius,type)
            vel_array=self._make_array(self.p.Vel,type)
            pos_array=self._make_array(self.p.Pos,type)
            mas_array=self._make_array(self.p.Mass,type)

        if mq is None:
            if minrad is None: minrad=np.min(rad_array)
            if maxrad is None: maxrad=np.max(rad_array)
        else:
            minrad=np.min(rad_array)
            maxrad,_=self.qradius_ext(rad_array,mas_array,mq)


        idx_bound=  (rad_array>=minrad) & (rad_array<=maxrad)

        return self._set_angolar_momentum(pos_array[idx_bound],vel_array[idx_bound],mas_array[idx_bound])

    def _set_angolar_momentum(self,pos_array,vel_array,mass_array):

        lx=mass_array*(pos_array[:,1]*vel_array[:,2]-pos_array[:,2]*vel_array[:,1])
        ly=mass_array*(pos_array[:,2]*vel_array[:,0]-pos_array[:,0]*vel_array[:,2])
        lz=mass_array*(pos_array[:,0]*vel_array[:,1]-pos_array[:,1]*vel_array[:,0])


        return np.sum(lx),np.sum(ly),np.sum(lz)


class Profile:

    def __init__(self,particles=None, type=None, center=False, mq=98,  Ngrid=512, xmin=None, xmax=None, kind='log',**kwargs):

        #Check input
        if 'filename' in kwargs: p=load_snap(kwargs['filename'])
        elif isinstance(particles,Particles): p=particles
        else: raise IOError('Incorrect particles or filename')

        #center
        if center==True:
            a=Analysis(p,safe=False)
            a.center(mq=mq, single=True)
        else:
            p.setrad()
            p.setvelt()

        #extract arrays
        if type is None:
            self.pos=p.Pos[:]
            self.vel=p.Vel[:]
            self.rad=p.Radius[:]
            self.vel_tot=p.Vel_tot[:]
            self.mass=p.Mass[:]

        elif isinstance(type,int):
            if p.header['Nall'][type]!=0: idx_type=p.Type==type
            else:   raise ValueError('Type %i not present in particles'%type)

            self.pos=p.Pos[idx_type]
            self.vel=p.Vel[idx_type]
            self.rad=p.Radius[idx_type]
            self.vel_tot=p.Vel_tot[idx_type]
            self.mass=p.Mass[idx_type]

        else: raise ValueError('type need to be None or an integer')

        #define grid
        self.Ngrid=Ngrid
        if xmin is None: self.xmin=np.min(self.rad)
        else: self.xmin=xmin
        if xmax is None: self.xmax=np.max(self.rad)
        else: self.xmax=xmax
        self.kind=kind
        self.grid=grid(N=self.Ngrid, type=self.kind, min=self.xmin, max=self.xmax )
        self.grid.setvol()
        self.grid.setsup()

        self.massbin=np.histogram(self.rad,bins=self.grid.gedge,weights=self.mass)[0]
        self.masscum=self.massbin.cumsum()
        self.dens=self.massbin/self.grid.g_vol


'''
R,mass_t,dens_t,pot_t=np.loadtxt('stellarcomp.txt',unpack=True,comments='#')
mms=GeneralModel(R,dens_t,rc=0.6,G='(kpc km2)/(M_sun s2)',Mmax=1e7)
mmdm=GeneralModel(R,dens_t,rc=5,G='(kpc km2)/(M_sun s2)',Mmax=1e8)



s={'type':2,'model':mms, 'npart':int(1e5)}
dm={'type':1, 'model':mmdm,'npart':int(1e6)}
N=int(1e6)

a=NbodyModel([dm])

p=a.generate()





aa=Analysis(p,safe=False)

print(aa.com(mq=50))

print(aa.com(mq=50,type=[1]))
aa.center(mq=50,single=True)
print(aa.com(mq=50))
print(aa.com(mq=50,type=[1]))



#print(aa.inertia_tensor(mq=50))
#print(aa.vinertia_tensor(mq=50))




aa=Analysis(p)
aa._set_intertia_tensor()
'''
'''
print(np.max(p.Radius))
r50,r70,r90,r98,r100=aa.qmass([50,70,90,98,100])
print(aa.qmass([50,70,90,98]))
print(aa.massw_mean(p.Pos[:],p.Mass[:]))
print(aa.massw_mean(p.Vel[:],p.Mass[:]))
print('Tutto',aa.com())
#print('DM',aa.com(type=[1]))
print('r50',aa.com(type=[1],maxrad=r50))
print('r70',aa.com(type=[1],maxrad=r70))
print('r90',aa.com(type=[1],maxrad=r90))
print('r98',aa.com(type=[1],maxrad=r98))
print('r100',aa.com(type=[1],maxrad=r100))

print('r50',aa.com(maxrad=r50))
print('r70',aa.com(maxrad=r70))
print('r90',aa.com(maxrad=r90))
print('r98',aa.com(maxrad=r98))
print('r100',aa.com(maxrad=r100))

print('r50',aa.com(mq=50))
print('r70',aa.com(mq=70))
print('r90',aa.com(mq=90))
print('r98',aa.com(mq=98))
print('r100',aa.com(mq=100))

print(aa.tdyn(mq=50,type=[1]))
print(aa.tdyn(mq=50,type=[2]))
print(aa.tdyn(mq=50))
'''
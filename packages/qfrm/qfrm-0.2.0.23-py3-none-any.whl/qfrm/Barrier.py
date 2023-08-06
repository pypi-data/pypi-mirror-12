import scipy.stats
import numpy as np
import scipy.special
import math

try: from qfrm.OptionValuation import *  # production:  if qfrm package is installed
except:   from OptionValuation import *  # development: if not installed and running from source

try: from qfrm.European import *  # production:  if qfrm package is installed
except:   from European import *  # development: if not installed and running from source


class Barrier(OptionValuation):
    """ European option class.

    Inherits all methods and properties of OptionValuation class.
    """

    def calc_px(self, H = 10., knock = 'down', dir = 'out',rng_seed = 1, method='BS', nsteps=None, npaths=None, keep_hist=False):
        """ Wrapper function that calls appropriate valuation method.

        All parameters of ``calc_px`` are saved to local ``px_spec`` variable of class ``PriceSpec`` before
        specific pricing method (``_calc_BS()``,...) is called.
        An alternative to price calculation method ``.calc_px(method='BS',...).px_spec.px``
        is calculating price via a shorter method wrapper ``.pxBS(...)``.
        The same works for all methods (BS, LT, MC, FD).

        Parameters
        ----------
        method : str
                Required. Indicates a valuation method to be used:
                ``BS``: Black-Scholes Merton calculation
                ``LT``: Lattice tree (such as binary tree)
                ``MC``: Monte Carlo simulation methods
                ``FD``: finite differencing methods
        nsteps : int
                LT, MC, FD methods require number of times steps
        npaths : int
                MC, FD methods require number of simulation paths
        keep_hist : bool
                If ``True``, historical information (trees, simulations, grid) are saved in ``self.px_spec`` object.
        H: float
                Barrier price

        Returns
        -------
        self : Barrier
            Returned object contains specifications and calculated price in  ``px_spec`` variable (``PriceSpec`` object).


        Notes
        ---------
        Examples can be verified at:

        - `Barrier Option Calculator
          <http://www.fintools.com/resources/online-calculators/exotics-calculators/exoticscalc-barrier>`_
        -  DerivaGem software (accompanies J.C.Hull's OFOD textbook)

        Examples
        ---------

        **BS**
        See notes for verification

        >>> from qfrm import *
        >>> s = Stock(S0=50., vol=.25, q=.00)
        >>> o = Barrier(ref=s,right='call', K=45., T=2., rf_r=.1, desc='down and out call')
        >>> o.pxBS(H=35., knock='down', dir='out')
        14.4744148

        >>> o.calc_px(H=35.,knock='down',dir='out',method='BS').px_spec # doctest: +ELLIPSIS, +NORMALIZE_WHITESPACE
        PriceSpec...px: 14.4744148...

        >>> s = Stock(S0=35., vol=.1, q=.1)
        >>> o = Barrier(ref=s, right='put', K=45., T=2.5, rf_r=.1, desc='up and out put')
        >>> o.pxBS(H=50.,knock='up',dir='out')
        7.90173205

        >>> s = Stock(S0=85., vol=.35, q=.05)
        >>> o = Barrier(ref=s, right='call', K=80., T=.5, rf_r=.05, desc='up and in call')
        >>> o.pxBS(H=90., knock='up', dir='in')
        10.536077751

        >>> from pandas import Series
        >>> expiries = range(1,11)
        >>> O = Series([o.update(T=t).calc_px(method='BS').px_spec.px for t in expiries], expiries)
        >>> O.plot(grid=1, title='Price vs expiry (in years)')    # doctest: +ELLIPSIS
        <matplotlib.axes._subplots.AxesSubplot object at ...>

        SEE NOTES for verification of examples

        >>> s = Stock(S0=95., vol=.25, q=.00)
        >>> o = Barrier(ref=s, right='put', K=100., T=1., rf_r=.1, desc='down and in put')
        >>> o.pxLT(H=90., knock='down', dir='in', nsteps=1050, keep_hist=False)
        7.104101925

        >>> o.px_spec     # doctest: +ELLIPSIS, +NORMALIZE_WHITESPACE
        PriceSpec...px: 7.104101925...

        >>> s = Stock(S0=95., vol=.25, q=.00)
        >>> o = Barrier(ref=s, right='call', K=100., T=2., rf_r=.1, desc='down and out call')
        >>> o.pxLT(H=87.,knock='down',dir='out',nsteps=1050, keep_hist=False)
        11.549805549

        >>> s = Stock(S0=95., vol=.25, q=.00)
        >>> o = Barrier(ref=s, right='put', K=100., T=2., rf_r=.1, desc='up and out put')
        >>> o.pxLT(nsteps=1050, H=105., knock='up', dir='out', keep_hist=False)
        3.260759376

        >>> s = Stock(S0=95., vol=.25, q=.00)
        >>> o = Barrier(ref=s, right='call', K=100., T=2., rf_r=.1, desc='up and in call')
        >>> o.pxLT(H=105., knock='up', dir='in', nsteps=1050, keep_hist=False)
        20.037733658

        >>> s = Stock(S0=95., vol=.25, q=.00)
        >>> o = Barrier(ref=s, right='call', K=100., T=2., rf_r=.1, desc='up and in call')
        >>> o.pxLT(H=105., knock='up', dir='in', nsteps=10, keep_hist=False)
        20.040606034


        Example of option price convergence (LT method)

        >>> s = Stock(S0=95., vol=.25, q=.00)
        >>> o = Barrier(ref=s, right='call', K=100., T=2., rf_r=.1, desc='up and in call')
        >>> from pandas import Series;  steps = range(3,250)
        >>> O = Series([o.calc_px(method='LT', nsteps=s).px_spec.px for s in steps], steps)
        >>> O.plot(grid=1, title='Price vs Steps')       # doctest: +ELLIPSIS
        <matplotlib.axes._subplots.AxesSubplot object at ...>


        **MC** All examples below can be verified with DerivaGem software
        *Note*: you would like to get the close results you would have to use ``nsteps = 500``, ``npaths = 10000``

        >>> s = Stock(S0=50., vol=.3, q=.00)
        >>> o = Barrier(ref=s,right='put', K=50., T=1., rf_r=.1, desc='DerviaGem Up and Out Barrier')
        >>> o.pxMC(H=60., knock='up', dir='out', nsteps=500, rng_seed=0, npaths = 10000)
        3.076977351

        >>> s = Stock(S0=50., vol=.3, q=.00)
        >>> o = Barrier(ref=s,right='call', K=50., T=1., rf_r=.1, desc='Up and in call')
        >>> o.pxMC(H=60., knock='up', dir='in', rng_seed = 0, nsteps=500 , npaths = 100)
        7.173989151

        >>> s = Stock(S0=50., vol=.25, q=.00)
        >>> o = Barrier(ref=s,right='call', K=45., T=2., rf_r=.3, desc='down and in call')
        >>> o.pxMC(H=35., knock='down', dir='in', rng_seed = 4, nsteps=500 , npaths = 300)
        0.041420563

        :Authors:
            Scott Morgan,
            Hanting Li <hl45@rice.edu>,
            Thawda Aung <thawda.aung1@gmail.com>
       """


        self.H = H
        self.dir = dir
        self.knock = knock
        self.px_spec = PriceSpec(rng_seed=rng_seed,method=method, nsteps=nsteps, npaths=npaths, keep_hist=keep_hist)
        return getattr(self, '_calc_' + method.upper())()

    def _calc_BS(self):
        """ Internal function for option valuation.

        See ``calc_px()`` for complete documentation.

        :Authors:
            Hanting Li <hl45@rice.edu>
        """

        _ = self
        # Compute Parameters
        N = Util.norm_cdf
        d1 = (np.log(_.ref.S0/_.K) + (_.rf_r-_.ref.q+(_.ref.vol**2)/2)*_.T)/(_.ref.vol*np.sqrt(_.T))
        d2 = d1 - _.ref.vol*np.sqrt(_.T)

        c = _.ref.S0*np.exp(-_.ref.q*_.T)*N(d1) - _.K*np.exp(-_.rf_r*_.T)*N(d2)
        p = _.K*np.exp(-_.rf_r*_.T)*N(-d2) - _.ref.S0*np.exp(-_.ref.q*_.T)*N(-d1)

        l = (_.rf_r-_.ref.q+(_.ref.vol**2)/2)/(_.ref.vol**2)
        y = np.log((_.H**2)/(_.ref.S0*_.K))/(_.ref.vol*np.sqrt(_.T)) + l*_.ref.vol*np.sqrt(_.T)
        x1 = np.log(_.ref.S0/_.H)/(_.ref.vol*np.sqrt(_.T)) + l*_.ref.vol*np.sqrt(_.T)
        y1 = np.log(_.H/_.ref.S0)/(_.ref.vol*np.sqrt(_.T)) + l*_.ref.vol*np.sqrt(_.T)

        # Consider Call Option
        # Two Situations: H<=K vs H>K
        if (_.right == 'call'):
            if (_.H<=_.K):
                cdi = _.ref.S0*np.exp(-_.ref.q*_.T)*((_.H/_.ref.S0)**(2*l))*N(y) - \
                      _.K*np.exp(-_.rf_r*_.T)*((_.H/_.ref.S0)**(2*l-2))*N(y-_.ref.vol*np.sqrt(_.T))
                cdo = _.ref.S0*N(x1)*np.exp(-_.ref.q*_.T) - _.K*np.exp(-_.rf_r*_.T)*N(x1-_.ref.vol*np.sqrt(_.T)) \
                      - _.ref.S0*np.exp(-_.ref.q*_.T)*((_.H/_.ref.S0)**(2*l))*N(y1) + \
                      _.K*np.exp(-_.rf_r*_.T)*((_.H/_.ref.S0)**(2*l-2))*N(y1-_.ref.vol*np.sqrt(_.T))
                cdo = c - cdi
                cuo = 0
                cui = c
            else:
                cdo = _.ref.S0*N(x1)*np.exp(-_.ref.q*_.T) - _.K*np.exp(-_.rf_r*_.T)*N(x1-_.ref.vol*np.sqrt(_.T)) \
                      - _.ref.S0*np.exp(-_.ref.q*_.T)*((_.H/_.ref.S0)**(2*l))*N(y1) + \
                      _.K*np.exp(-_.rf_r*_.T)*((_.H/_.ref.S0)**(2*l-2))*N(y1-_.ref.vol*np.sqrt(_.T))
                cdi = c - cdo
                cui = _.ref.S0*N(x1)*np.exp(-_.ref.q*_.T) -\
                      _.K*np.exp(-_.rf_r*_.T)*N(x1-_.ref.vol*np.sqrt(_.T)) - \
                      _.ref.S0*np.exp(-_.ref.q*_.T)*((_.H/_.ref.S0)**(2*l))*(N(-y)-N(-y1)) + \
                      _.K*np.exp(-_.rf_r*_.T)*((_.H/_.ref.S0)**(2*l-2))*(N(-y+_.ref.vol*np.sqrt(_.T))-\
                                                                      N(-y1+_.ref.vol*np.sqrt(_.T)))
                cuo = c - cui
        # Consider Put Option
        # Two Situations: H<=K vs H>K
        else:
            if (_.H>_.K):
                pui = -_.ref.S0*np.exp(-_.ref.q*_.T)*((_.H/_.ref.S0)**(2*l))*N(-y) + \
                      _.K*np.exp(-_.rf_r*_.T)*((_.H/_.ref.S0)**(2*l-2))*N(-y+_.ref.vol*np.sqrt(_.T))
                puo = p - pui
                pdo = 0
                pdi = p
            else:
                puo = -_.ref.S0*N(-x1)*np.exp(-_.ref.q*_.T) + \
                      _.K*np.exp(-_.rf_r*_.T)*N(-x1+_.ref.vol*np.sqrt(_.T)) + \
                      _.ref.S0*np.exp(-_.ref.q*_.T)*((_.H/_.ref.S0)**(2*l))*N(-y1) - \
                      _.K*np.exp(-_.rf_r*_.T)*((_.H/_.ref.S0)**(2*l-2))*N(-y1+_.ref.vol*np.sqrt(_.T))
                pui = p - puo
                pdi = -_.ref.S0*N(-x1)*np.exp(-_.ref.q*_.T) +\
                      _.K*np.exp(-_.rf_r*_.T)*N(-x1+_.ref.vol*np.sqrt(_.T)) + \
                      _.ref.S0*np.exp(-_.ref.q*_.T)*((_.H/_.ref.S0)**(2*l))*(N(y)-N(y1)) - \
                      _.K*np.exp(-_.rf_r*_.T)*((_.H/_.ref.S0)**(2*l-2))*(N(y-_.ref.vol*np.sqrt(_.T)) -\
                                                                      N(y1-_.ref.vol*np.sqrt(_.T)))
                pdo = p - pdi

        if (_.right == 'call'):
            if (_.knock == 'down'):
                if (_.dir == 'in'):
                    px = cdi
                else:
                    px = cdo
            else:
                if (_.dir == 'in'):
                    px = cui
                else:
                    px = cuo
        else:
            if (_.knock == 'down'):
                if (_.dir == 'in'):
                    px = pdi
                else:
                    px = pdo
            else:
                if (_.dir == 'in'):
                    px = pui
                else:
                    px = puo

        self.px_spec.add(px=float(px), sub_method='standard; Hull p.604')

        return self

    def _calc_LT(self):
        """ Internal function for option valuation.

        See ``calc_px()`` for complete documentation.

        Notes
        -----
        - `Binomial Trees for Barrier Options:   <http://goo.gl/zcPhJe>`_
        - `In-Out Parity <http://www.iam.uni-bonn.de/people/ankirchner/lectures/OP_WS1314/OP_chap_nine.pdf>`_
        - `Verify Examples
          <http://www.fintools.com/resources/online-calculators/exotics-calculators/exoticscalc-barrier>`_

        :Authors:
            Scott Morgan
        """

        if self.knock == 'down':
            s = 1
        elif self.knock == 'up':
            s = -1



        keep_hist = getattr(self.px_spec, 'keep_hist', False)
        n = getattr(self.px_spec, 'nsteps', 3)
        _ = self.LT_specs(n)

        S = self.ref.S0 * _['d'] ** np.arange(n, -1, -1) * _['u'] ** np.arange(0, n + 1)  # terminal stock prices
        S2 = np.maximum(s*(S - self.H),0) # Find where crossed the barrier
        S2 = np.minimum(S2,1)  # 0 when across the barrier, 1 otherwise
        O = np.maximum(self.signCP * (S - self.K), 0)
        O = O * S2        # terminal option payouts
        # tree = ((S, O),)
        S_tree = (tuple([float(s) for s in S]),)  # use tuples of floats (instead of np.float)
        O_tree = (tuple([float(o) for o in O]),)
        # tree = ([float(s) for s in S], [float(o) for o in O],)

        for i in range(n, 0, -1):
            O = _['df_dt'] * ((1 - _['p']) * O[:i] + ( _['p']) * O[1:])  #prior option prices (@time step=i-1)
            S = _['d'] * S[1:i+1]                   # prior stock prices (@time step=i-1)
            S2 = np.maximum(s*(S - self.H),0)
            S2 = np.minimum(S2,1)
            O = O * S2
            S_tree = (tuple([float(s) for s in S]),) + S_tree
            O_tree = (tuple([float(o) for o in O]),) + O_tree

        out_px = float(Util.demote(O))


        # self.px_spec = PriceSpec(px=float(Util.demote(O)), method='LT', sub_method='binomial tree; Hull Ch.13',
        #              LT_specs=_, ref_tree = S_tree if save_tree else None, opt_tree = O_tree if save_tree else None)

        if self.dir == 'out':

            self.px_spec.add(px=out_px, method='LT', sub_method='binomial tree; biased',
                        LT_specs=_, ref_tree = S_tree if keep_hist else None, opt_tree = O_tree if keep_hist else None)

            return self



        k = int(math.ceil(np.log(self.K/(self.ref.S0*_['d']**n))/np.log(_['u']/_['d'])))
        h = int(math.floor(np.log(self.H/(self.ref.S0*_['d']**n))/np.log(_['u']/_['d'])))
        l = list(map(lambda j: scipy.special.binom(n,n-2*h+j)*(_['p']**j)*((1-_['p'])**(n-j))* \
                               (self.ref.S0*(_['u']**j)*(_['d']**(n-j))-self.K),range(k,n+1)))
        down_in_call = np.exp(-self.rf_r*self.T)*sum(l)



        if self.dir == 'in' and self.right == 'call' and self.knock == 'down':
            self.px_spec.add(px=down_in_call, method='LT', sub_method='combinatorial',
                        LT_specs=_, ref_tree = None, opt_tree =  None)

        elif self.dir == 'in' and self.right == 'call' and self.knock == 'up':

            o = European(ref=self.ref, right='call', K=self.K, T=self.T, rf_r=self.rf_r, desc='reference')
            call_px = o.calc_px(method='BS').px_spec.px   # save interim results to self.px_spec. Equivalent to repr(o)
            in_px = call_px - out_px
            self.px_spec.add(px=in_px, method='LT', sub_method='in out parity',
                        LT_specs=_, ref_tree = None, opt_tree =  None)


        elif self.dir == 'in' and self.right == 'put' and self.knock == 'up':

            o = European(ref=self.ref, right='put', K=self.K, T=self.T, rf_r=self.rf_r, desc='reference')
            put_px = o.calc_px(method='BS').px_spec.px   # save interim results to self.px_spec. Equivalent to repr(o)
            in_px = put_px - out_px
            self.px_spec.add(px=in_px, method='LT', sub_method='in out parity',
                        LT_specs=_, ref_tree = None, opt_tree =  None)

        elif self.dir == 'in' and self.right == 'put' and self.knock == 'down':

            o = European(ref=self.ref, right='put', K=self.K, T=self.T, rf_r=self.rf_r, desc='reference')
            put_px = o.calc_px(method='BS').px_spec.px   # save interim results to self.px_spec. Equivalent to repr(o)
            in_px = put_px - out_px
            self.px_spec.add(px=in_px, method='LT', sub_method='in out parity',
                        LT_specs=_, ref_tree = None, opt_tree =  None)

        return self


    def _calc_MC(self, nsteps=3, npaths=4, keep_hist=False):
        """ Internal function for option valuation.

        See ``calc_px()`` for complete documentation.

        """
        _ = self
        spot = _.ref.S0
        rfr  = _.rf_r
        q    = _.ref.q
        r    = rfr - q
        sigma = _.ref.vol
        num_steps = getattr(self.px_spec, 'nsteps', 10)
        NRepl     = getattr(self.px_spec , 'npaths' ,100)
        NSteps  = num_steps
        num_sims = NRepl
        seed = _.seed0
        sb = _.H
        Sb = sb
        K = _.K
        T = _.T
        rng_seed =  int(self.px_spec.rng_seed)
        np.random.seed(rng_seed)


        def AssetPaths(spot, r , sigma , T , num_steps , num_sims):
        #np.np.random.seed(seed)

            sim_paths = np.zeros((num_sims , num_steps + 1))
            sim_paths[:,0] = spot
            dt = T / num_steps
            for i in range(int(num_sims)):
                for j in range(1,int(num_steps +1) ):
                    wt = np.random.randn()
                    sim_paths[i,j] = sim_paths[i , j -1] * np.exp((r - 0.5 * sigma **2)  * dt + sigma * np.sqrt(dt) * wt)

            return(sim_paths)

        def barrierCrossing2(spot , sb , path):
            if sb < spot:
                temp = [1 if i <= sb else 0 for i in path[0,]]
                if sum(temp) > 1:
                    knocked = 1
                else:
                    knocked = 0
            else:
                temp = [ 1 if i >= sb else 0 for i in path[0,]]
                if sum(temp) > 1:
                    knocked = 1
                else:
                    knocked = 0
            return(knocked)

        def knockedout_put(spot , Sb , K , r , T , sigma , NSteps, NRepl):
            payoff = np.zeros((NRepl , 1))
            for i in range(NRepl):
                path = AssetPaths( spot , r , sigma , T , NSteps , 1)
                knocked = barrierCrossing(spot , Sb , path)
                if knocked == 0:
                    payoff[i] = max(0 , K - path[0,NSteps ])
            return(scipy.stats.norm.fit(np.exp(-r*T) * payoff)[0])

        def knockedin_put(spot , Sb , K , r , T , sigma , NSteps, NRepl):
            payoff = np.zeros((NRepl , 1))
            for i in range(NRepl):
                path = AssetPaths( spot , r , sigma , T , NSteps , 1)
                knocked = barrierCrossing(spot , Sb , path)
                if knocked == 1:
                    payoff[i] = max(0 , K - path[0,NSteps])
            return(scipy.stats.norm.fit(np.exp(-r*T) * payoff)[0])

        def barrierCrossing(spot , sb , path):
            if sb < spot:
                temp = [1 if i <= sb else 0 for i in path[0,]]
                if sum(temp) >= 1:
                    knocked = 1
                else:
                    knocked = 0
            else:
                temp = [ 1 if i >= sb else 0 for i in path[0,]]
                if sum(temp) >= 1:
                    knocked = 1
                else:
                    knocked = 0
            return(knocked)


        def knockout_call(spot , Sb , K , r , T , sigma , NSteps , NRepl):
            payoff = np.zeros((NRepl , 1))

            for i in range(NRepl):
                path = AssetPaths(spot , r , sigma , T , NSteps , 1 )
                knocked = barrierCrossing(spot , Sb , path)
                if knocked == 0:
                    payoff[i] = max(0 , path[0 , NSteps] - K)
            return(scipy.stats.norm.fit(np.exp(-r*T) * payoff)[0])


        def knockin_call(spot , Sb , K , r , T , sigma , NSteps , NRepl):
            payoff = np.zeros((NRepl , 1))

            for i in range(NRepl):
                path = AssetPaths(spot , r , sigma , T , NSteps , 1 )
                knocked = barrierCrossing(spot , Sb , path)
                if knocked == 1:
                    payoff[i] = max(0 , path[0 , NSteps] - K)
            return(scipy.stats.norm.fit(np.exp(-r*T) * payoff)[0])

        px = 0
        if self.dir == 'out' and self.right == 'call' and self.knock == 'down':
            if spot > Sb:
                px = knockout_call(spot , Sb , K , r , T , sigma , NSteps , NRepl)
            else:
                o = European.European(ref=self.ref, right='call', K=self.K, T=self.T, rf_r=self.rf_r, desc='reference')
                px = o.calc_px(method='BS').px_spec.px

        elif self.dir == 'in' and self.right == 'call' and self.knock == 'down':
            if spot > Sb:
                px = knockin_call(spot , Sb , K , r , T , sigma , NSteps , NRepl)
            else:
                o = European.European(ref=self.ref, right='call', K=self.K, T=self.T, rf_r=self.rf_r, desc='reference')
                px = o.calc_px(method='BS').px_spec.px
                # px = o.European(ref=s,right='call', K=K, T=T, rf_r=r)

        elif self.dir == 'in' and self.right == 'put' and self.knock == 'down':
            if spot > Sb:
                px = knockedin_put(spot , Sb , K , r , T , sigma , NSteps , NRepl)
            else:
                o = European.European(ref=self.ref, right='put', K=self.K, T=self.T, rf_r=self.rf_r, desc='reference')
                px = o.calc_px(method='BS').px_spec.px

        elif self.dir == 'out' and self.right == 'put' and self.knock == 'down':
            if spot > Sb:
                px = knockedout_put(spot , Sb , K , r, T , sigma , NSteps , NRepl)
            else:
                o = European.European(ref=self.ref, right='put', K=self.K, T=self.T, rf_r=self.rf_r, desc='reference')
                px = o.calc_px(method='BS').px_spec.px

        elif self.dir == 'out' and self.right == 'call' and self.knock == 'up':
            if spot < Sb:
                px = knockout_call(spot , Sb , K , r , T , sigma , NSteps , NRepl)
            else:
                o = European.European(ref=self.ref, right='call', K=self.K, T=self.T, rf_r=self.rf_r, desc='reference')
                px = o.calc_px(method='BS').px_spec.px

        elif self.dir == 'in' and self.right == 'call' and self.knock == 'up':
            if spot < Sb:
                px = knockin_call(spot , Sb , K , r , T , sigma , NSteps , NRepl)
            else:
                o = European.European(ref=self.ref, right='call', K=self.K, T=self.T, rf_r=self.rf_r, desc='reference')
                px = o.calc_px(method='BS').px_spec.px

        elif self.dir == 'in' and self.right == 'put' and self.knock == 'up':
            if spot < Sb:
                px = knockedin_put(spot , Sb , K , r , T , sigma , NSteps , NRepl)
            else:
                o = European.European(ref=self.ref, right='put', K=self.K, T=self.T, rf_r=self.rf_r, desc='reference')
                px = o.calc_px(method='BS').px_spec.px

        elif self.dir == 'out' and self.right == 'put' and self.knock == 'up':
            if spot < Sb:
                px = knockedout_put(spot , Sb , K , r, T , sigma , NSteps , NRepl)
            else:
                o = European.European(ref=self.ref, right='put', K=self.K, T=self.T, rf_r=self.rf_r, desc='reference')
                px = o.calc_px(method='BS').px_spec.px

        self.px_spec.add(px=float(px), sub_method='Monte Carlo Simulation')





        return self

    def _calc_FD(self, nsteps=3, npaths=4, keep_hist=False):
        """ Internal function for option valuation.

        See ``calc_px()`` for complete documentation.
        """
        return self
import numpy as np
# from pandas import DataFrame
# import matplotlib.pyplot as plt

try: from qfrm.OptionValuation import *  # production:  if qfrm package is installed
except:   from OptionValuation import *  # development: if not installed and running from source

try: from qfrm.European import *  # production:  if qfrm package is installed
except:   from European import *  # development: if not installed and running from source



class American(OptionValuation):
    """ American option class.

    Inherits all methods and properties of ``OptionValuation`` class.
    """

    def calc_px(self, method='BS', nsteps=None, npaths=None, keep_hist=False, rng_seed=0, deg=5):
        """ Wrapper function that calls appropriate valuation method.

        All parameters of ``calc_px`` are saved to local ``px_spec`` variable of class ``PriceSpec`` before
        specific pricing method (``_calc_BS()``,...) is called.
        An alternative to price calculation method ``.calc_px(method='BS',...).px_spec.px``
        is calculating price via a shorter method wrapper ``.pxBS(...)``.
        The same works for all methods (BS, LT, MC, FD).


        Parameters
        -------------
        method : str
            Required. Indicates a valuation method to be used:

            ``BS`` -- Black-Scholes Merton calculation

            ``LT`` -- Lattice tree (such as binary tree or binomial tree)

            ``MC`` -- Monte Carlo simulation methods

            ``FD`` -- finite differencing methods
        nsteps : int
            LT, MC, FD methods require number of times steps
        npaths : int
            MC, FD methods require number of simulation paths
        keep_hist : bool
            If ``True``, historical information (trees, simulations, grid) are saved in ``self.px_spec`` object.
        rng_seed : int, None
            (non-negative) integer used to seed random number generator (RNG) for MC pricing.

            ``None`` -- no seeding; generates random sequence for MC
        deg : int
            Degree of polynomial used for least Squares Monte Carlo (LSM) method (in MC pricing).
            Normally, ``deg=5`` is used to fit 5th degree polynomial to payouts at each step in backward induction.

        Returns
        -------
        self : American
            Returned object contains specifications and calculated price in  ``px_spec`` variable (``PriceSpec`` object).


        Notes
        -----
        **Black-Scholes Merton (BS)**, i.e. exact solution pricing.
        This pricing method uses Black Scholes Merton differential equation to price the American option.
        Due to the optimal stopping problem, this is technically impossible,
        so the methods below are approximations that have been developed by financial computation scientists.
        *Important*: for dividend-paying underlying stock, BSM can only accept semi-annual dividends rate.

        *References:*

        - Black's Approximation, OFOD, J.C.Hull, 9ed, 2014, p.346
        - Control Variate Techniques, OFOD, J.C.Hull, 9ed, 2014, pp.463-465
        - `The Use of Control Variate Technique in Option-Pricing, J.C.Hull & A.D.White, 2001 <http://1drv.ms/1XR2rQw>`_
        - `The Closed-form Solution for Pricing American Options, Wang Xiaodong, 2006 <http://1drv.ms/1NaB3rI>`_
        - `Closed-Form American Call Option Pricing (Teaching notes), Roll-Geske-Whaley, 2008 <http://1drv.ms/1NaB3rI>`_
        - `Black's approximation (Wikipedia) <https://en.wikipedia.org/wiki/Black%27s_approximation>`_ (dividend call)


        **Lattice Tree (LT)**, i.e. binomial or binary (recombining) tree pricing.
        Binomial tree is used to (discretely) grow the underlying stock price.
        Then backward induction is used to compute option payoff
        at each time step and (discretely) discount it to the present time.
        OFOD textbook by John C. Hull has an excellent overview of this method with many examples and exercises.

        *References:*

        - Binomial Trees, Ch.13, OFOD, J.C.Hull, 9ed, 2014, p.274

        **Monte Carlo simulation (MC)**.
        A naive approach is to simulate stock prices, according to Geometric Brownian motion (GBM) model.
        Then discount the the payouts along each path. Unfortunately, this will overstate the option price,
        since inn such way we discount deterministic (known-in-advance) future option prices.
        A proper technique is to determine a distribution of option prices, compute expected value and discount it
        to present, while comparing it to the option payouts at each node.
        Among many other methods, Longstaff and Schwartz (UCLA, 2011) developed Least Squares MC (LSM) model
        that fits a polynomial (usually, of degree 5) to the payouts at each node.
        The fitted coefficients are used to derive the need expected value of the option price.
        This is equivalent to computing linear regression coefficients for a dependent variable x in different powers:

        y = a_0 + a_1*x + a_2*x^2 + a_3*x^3 + a_4*x^4 + a_5*x^5

        where a_i are unknown coefficients.

        *References:*

        - Monte Carlo Simulation and American Options (Ch.27), OFOD, J.C.Hull, 9ed, 2014, pp.646-649
        - `Valuing American Options by Simulation. A Simple Least-Squares Approach, F.A.Longstaff & E.S.Schwartz, 2001 <http://1drv.ms/1IMLUX0>`_
        - `Pricing American Options. A Comparison of Monte Carlo Simulation Approaches, M.C.Fu, et al, 1999 <http://1drv.ms/1Q7kItH>`_
        - `Derivatives Analytics with Python & Numpy, Y.J.Hilpisch, 2011  <http://1drv.ms/21Fuoj6>`_
        - `Pricing American Options using Monte Carlo Methods, Quiya Jia, 2009. <http://1drv.ms/21FuvLr>`_
        - `Monte Carlo Simulations for American Options, Russel E. Caflisch, 2005. <http://1drv.ms/1lF24fF>`_
        - `Pricing options using Monte Carlo simulations, 2013. <http://1drv.ms/1OakkEL>`_


        Examples
        --------

        **BS:**
        *Verifiable example:*
        See `Hull and White paper <http://1drv.ms/1XR2rQw>`_:
        2nd example in list, on p.246; bottom-right option price of 0.4326 in Table 1,
        since we use control variate for ``n = 100`` (herein ``nsteps = 100``).

        >>> s = Stock(S0=40, vol=.2)
        >>> o = American(ref=s, right='put', K=35, T=.5833, rf_r=.0488, desc='Example From Hull and White 2001')
        >>> o.pxBS()   # Computes option price via BS approximation
        0.432627059

        Same price computation, but all specs (incl. price) are displayed:

        >>> o.calc_px(method='BS')   # doctest: +ELLIPSIS
        American...px: 0.432627059...

        The following displays only computed specs:

        >>> o.px_spec   # doctest: +ELLIPSIS
        PriceSpec...px: 0.432627059...

        >>> s = Stock(S0=50, vol=.25, q=.02)
        >>> o = American(ref=s, right='call', K=40, T=2, rf_r=.05)
        >>> o.calc_px(method='BS')    # doctest: +ELLIPSIS
        American...px: 11.337850838...

        >>> o.px_spec  # doctest: +ELLIPSIS
        PriceSpec...px: 11.337850838...

        >>> s = Stock(S0=30, vol=.3)
        >>> American(ref=s, right='call', K=30, T=1., rf_r=.08).pxBS()
        4.713393764



        **LT:**
        *Verifiable example:*
        See J.C.Hull's OFOD, Fig.13.10, p.289, Binomial tree yields option price of 7.43.


        >>> s = Stock(S0=50, vol=.3)
        >>> American(ref=s, right='put', K=52, T=2, rf_r=.05, desc='price:7.42840, See J.C.Hull p.288').pxLT(nsteps=2)
        7.428401903

        >>> o = American(ref=s, right='put', K=52, T=2, rf_r=.05, desc='price:7.42840, See J.C.Hull p.288')
        >>> o.pxLT(nsteps=2, keep_hist=True)
        7.428401903

        Returns a binomial (recombining) tree for price progression of a referenced underlying asset (stock):

        >>> o.px_spec.ref_tree  # doctest: +ELLIPSIS
        ((50.00...), (37.040911034...67.49294037880017), (27.440581804...50.0...91.10594001952546))

        Returns a binomial (recombining) tree for price progression of the American option:

        >>> o.px_spec.opt_tree  # doctest: +ELLIPSIS
        ((7.428401902...), (14.959088965...0.932697829...), (24.559418195..., 2.0, 0))

        >>> o.pxLT(nsteps=10, keep_hist=False)  # Higher precision price.  doctest: +ELLIPSIS
        7.509768467



        **MC:**

        >>> s = Stock(S0=50, vol=.3)
        >>> American(ref=s, right='put', K=52, T=2, rf_r=.05, desc='').pxMC(nsteps=10, npaths=10)
        8.3915333010000008

        :Authors:
            Oleg Melnikov <xisreal@gmail.com>, Andrew Weatherly <andrewweatherly1@gmail.com>
        """

        return super().calc_px(method=method, nsteps=nsteps, npaths=npaths, keep_hist=keep_hist, rng_seed=rng_seed, deg=deg)

    def _calc_LT(self):
        """ Internal function for option valuation.

        See ``calc_px()`` for complete documentation.

        :Authors:
            Oleg Melnikov <xisreal@gmail.com>
        """
        # from numpy import arange, maximum, log, exp, sqrt

        keep_hist = getattr(self.px_spec, 'keep_hist', False)
        n = getattr(self.px_spec, 'nsteps', 3)
        _ = self.LT_specs(n)

        S = Vec(_['d']) ** Util.arange(n, -1, -1) * Vec(_['u']) ** Util.arange(0, n + 1) * self.ref.S0  # terminal stock prices
        O = Vec(Util.maximum((S - self.K) * self.signCP, 0))          # terminal option payouts
        S_tree, O_tree  = (tuple(S),), (tuple(O),)      # use tuples of floats (instead of numpy.float)

        for i in range(n, 0, -1):
            O = (O[:i] * (1 - _['p']) + O[1:] * _['p']) * _['df_dt']  #prior option prices (@time step=i-1)
            S = S[1:i+1] * _['d']                   # prior stock prices (@time step=i-1)
            Payout = ((S - self.K) * self.signCP).max(0)   # payout at time step i-1 (moving backward in time)
            O = O.max(Payout)  #Util.maximum(O, Payout)
            S_tree, O_tree = (tuple(S),) + S_tree, (tuple(O),) + O_tree

        self.px_spec.add(px=float(Util.demote(O)), method='LT', sub_method='binomial tree; Hull Ch.13',
                        LT_specs=_, ref_tree = S_tree if keep_hist else None, opt_tree = O_tree if keep_hist else None)

        return self

    def _calc_BS(self):
        """ Internal function for option valuation.
        See ``calc_px()`` for complete documentation.

        :Authors:
            Student name <email...>
        """


        #Verify Input
        assert self.right in ['call', 'put'], 'right must be "call" or "put" '
        assert self.ref.vol > 0, 'vol must be >=0'
        assert self.K > 0, 'K must be > 0'
        assert self.T > 0, 'T must be > 0'
        assert self.ref.S0 >= 0, 'S must be >= 0'
        assert self.rf_r >= 0, 'r must be >= 0'

        #Imports

        if self.right == 'call' and self.ref.q != 0:
            # Black's approximations outlined on pg. 346
            # Dividend paying stocks assume semi-annual payments
            if self.T > .5:
                dividend_val1 = sum([self.ref.q * self.ref.S0 * math.exp(-self.rf_r * i) for i in np.linspace(.5, self.T - .5,
                                    self.T * 2 - .5)])
                dividend_val2 = sum([self.ref.q * self.ref.S0 * math.exp(-self.rf_r * i) for i in np.linspace(.5, self.T - 1,
                                    self.T * 2 - 1)])
            else:
                dividend_val1 = 0
                dividend_val2 = 0
            first_val = European(
                    ref=Stock(S0=self.ref.S0 - dividend_val1, vol=self.ref.vol, q=self.ref.q), right=self.right,
                    K=self.K, rf_r=self.rf_r, T=self.T).calc_px(method='BS').px_spec.px
            second_val = European(
                    ref=Stock(S0=self.ref.S0 - dividend_val2, vol=self.ref.vol, q=self.ref.q),
                    right=self.right, K=self.K, rf_r=self.rf_r, T=self.T - .5).calc_px(method='BS').px_spec.px
            self.px_spec.add(px=float(max([first_val, second_val])), method='BSM', sub_method='Black\'s Approximation')
        elif self.right == 'call':
            # American call is worth the same as European call if there are no dividends. This is by definition.
            # Check first line of http://www.bus.lsu.edu/academics/finance/faculty/dchance/Instructional/TN98-01.pdf
            # paper as evidence
            self.px_spec.add(px=float(European(ref=Stock(S0=self.ref.S0, vol=self.ref.vol), right=self.right, K=self.K,
                                               rf_r=self.rf_r, T=self.T).calc_px(method='BS').px_spec.px),
                             method='European BSM')
        elif self.ref.q != 0:
            # I wasn't able to find a good approximation for American Put BSM w/ dividends so I'm using 200 and 201
            # time step LT and taking the average. This is effectively
            # the Antithetic Variable technique found on pg. 476 due
            # to the oscillating nature of binomial tree
            f_a = (American(ref=Stock(S0=self.ref.S0, vol=self.ref.vol, q=self.ref.q), right=self.right,
                            K=self.K, rf_r=self.rf_r, T=self.T).calc_px(method='LT', nsteps=200).px_spec.px
                   + American(ref=Stock(S0=self.ref.S0, vol=self.ref.vol, q=self.ref.q), right=self.right, K=self.K,
                              rf_r=self.rf_r, T=self.T).calc_px(method='LT', nsteps=201).px_spec.px) / 2
            self.px_spec.add(px=float(f_a), method='BSM', sub_method='Antithetic Variable')
        else:
            # Control Variate technique outlined on pg.463
            f_a = American(ref=Stock(S0=self.ref.S0, vol=self.ref.vol), right=self.right,
                           K=self.K, rf_r=self.rf_r, T=self.T).calc_px(method='LT', nsteps=100).px_spec.px
            f_bsm = European(ref=Stock(S0=self.ref.S0, vol=self.ref.vol), right=self.right,
                             K=self.K, rf_r=self.rf_r, T=self.T).calc_px(method='BS').px_spec.px
            f_e = European(ref=Stock(S0=self.ref.S0, vol=self.ref.vol), right=self.right,
                           K=self.K, rf_r=self.rf_r, T=self.T).calc_px(method='LT', nsteps=100).px_spec.px
            self.px_spec.add(px=float(f_a + (f_bsm - f_e)), method='BSM', sub_method='Control Variate')
        return self

    def _calc_MC(self):
        """ Internal function for option valuation. See ``calc_px()`` for complete documentation.

        :Authors:
            Oleg Melnikov <xisreal@gmail.com>
        """

        n = getattr(self.px_spec, 'nsteps', 3)
        m = getattr(self.px_spec, 'npaths', 3)
        Seed, deg = self.px_spec.rng_seed, self.px_spec.deg

        dt, df = self.LT_specs(n)['dt'], self.LT_specs(n)['df_dt']
        S0, vol = self.ref.S0, self.ref.vol
        K, r, signCP = self.K, self.rf_r, self._signCP

        np.random.seed(Seed)
        norm_mtx = np.random.normal((r - 0.5 * vol ** 2) * dt, vol * math.sqrt(dt), (n + 1, m))
        S = S0 * np.exp(np.cumsum(norm_mtx, axis=0))
        S[0] = S0
        payout = np.maximum(signCP * (S - K), 0)
        v = np.copy(payout)  # terminal payouts

        # Least-Squares Monte Carlo (LSM):
        for i in range(n - 1, 0, -1):          # American Option Valuation by Backwards Induction
            rg = np.polyfit(S[i], v[i + 1] * df, deg)      # fit 5th degree polynomial to PV of current inner values
            C = np.polyval(rg, S[i])              # continuation values.
            v[i] = np.where(payout[i] > C, payout[i], v[i + 1] * df)  # exercise decision
        v[0] = v[1] * df

        v0 = np.mean(v[0])
        self.px_spec.add(px=v0, submethod='Least Squares Monte Carlo (LSM)')

        return self

    def _calc_FD(self):
        """ Internal function for option valuation. See ``calc_px()`` for complete documentation.

        :Authors:
            Oleg Melnikov <xisreal@gmail.com>
        """

        return self

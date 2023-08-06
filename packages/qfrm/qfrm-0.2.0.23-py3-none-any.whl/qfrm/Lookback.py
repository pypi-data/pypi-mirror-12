import math
import numpy as np

try: from qfrm.OptionValuation import *  # production:  if qfrm package is installed
except:   from OptionValuation import *  # development: if not installed and running from source


class Lookback(OptionValuation):
    """ Lookback option class.

    Inherits all methods and properties of OptionValuation class.
    """

    def calc_px(self, method='BS', nsteps=None, npaths=None, keep_hist=False, Sfl = 50.0):
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
        Sfl : float
            Asset floating price.
            If call option, ``Sfl`` is minimum asset price achieved to date.(If the look back has
            just been originated, ``Smin = S0``.)
            If put option, Sfl is maximum asset price achieved to date. (If the look back has just been originated,
            ``Smax = S0``.)


        Returns
        -------
        self : Lookback
            Returned object contains specifications and calculated price in  ``px_spec`` variable (``PriceSpec`` object).


        Notes
        -----

        Verification of Example:

        - `Asian options tutorial and Excel spreadsheet <http://investexcel.net/asian-options-excel>`_
        - John C. Hull, 9ed, 2015, ISBN `0133456315 <http://amzn.com/0133456315>`_  p.608
        - DerivaGem software that accompanies the textbook

        The LT method might not generate the same result with BS
        To improve the accuracy, the number of steps can be added

        Examples
        --------

        **BS**

        >>> s = Stock(S0=50, vol=.4, q=.0)
        >>> o = Lookback(ref=s, right='call', K=50, T=0.25, rf_r=.1, desc='Example from Hull Ch.26 Example 26.2 (p608)')
        >>> o.pxBS(Sfl = 50.0)
        8.03712014

        >>> o.calc_px(method = 'BS', Sfl = 50.0) # doctest: +ELLIPSIS, +NORMALIZE_WHITESPACE
        Lookback...px: 8.03712014...

        >>> s = Stock(S0=50, vol=.4, q=.0)
        >>> o = Lookback(ref=s, right='put', K=50, T=0.25, rf_r=.1, desc='Hull p607')
        >>> o.pxBS(Sfl = 50.0)
        7.79021926

        >>> o.px_spec # doctest: +ELLIPSIS, +NORMALIZE_WHITESPACE
        PriceSpec...px: 7.79021926...

        >>> from pandas import Series;  expiries = range(1,11)
        >>> O = Series([o.update(T=t).calc_px(method='BS').px_spec.px for t in expiries], expiries)
        >>> O.plot(grid=1, title='BS Price vs expiry (in years)')  # doctest: +ELLIPSIS
        <matplotlib.axes._subplots.AxesSubplot object at ...>
        >>> import matplotlib.pyplot as plt
        >>> plt.show()


        **LT**

        >>> s = Stock(S0=35., vol=.05, q=.00)
        >>> o = Lookback(ref=s, right='call', K=30, T=0.25, rf_r=.1, desc='Hull p607')
        >>> o.pxLT(nsteps=100,keep_hist=False, Sfl = 50.0)
        1.829899147

        >>> o.px_spec # doctest: +ELLIPSIS, +NORMALIZE_WHITESPACE
        PriceSpec...px: 1.829899147...

        >>> s = Stock(S0=50., vol=.4, q=.0)
        >>> o = Lookback(ref=s, right='call', T=3/12, K=30, rf_r=.1, desc='Hull p607')
        >>> o.pxLT(nsteps=1000,keep_hist=False, Sfl = 50.0)
        8.135758904


        >>> s = Stock(S0=100., vol=.02, q=.0)
        >>> o = Lookback(ref=s, right='call', T=3, K=30, rf_r=.01, desc='Hull p607')
        >>> o.pxLT(nsteps=50,keep_hist=False, Sfl = 50.0)
        6.436996103

        >>> from pandas import Series
        >>> expiries = range(1,11)
        >>> O = Series([o.update(T=t).calc_px(method='LT', nsteps=5).px_spec.px for t in expiries], expiries)
        >>> O.plot(grid=1, title='Price vs expiry (in years)') # doctest: +ELLIPSIS
        <matplotlib.axes._subplots.AxesSubplot object at ...>
        >>> import matplotlib.pyplot as plt
        >>> plt.show()

        **FD**

        Note: FD price is sensitive to nsteps.

        >>> s = Stock(S0=50, vol=.4, q=.0)
        >>> o = Lookback(ref=s, right='put', K=50, T=0.25, rf_r=.1, desc='Example from Hull Ch.26 Example 26.2 (p608)')
        >>> o.pxFD(Sfl = 50.0, nsteps=3, npaths=19)
        7.917890003

        >>> o = Lookback(ref=s, right='call', K=50, T=0.25, rf_r=.1, desc='Example from Hull Ch.26 Example 26.2 (p608)')
        >>> o.pxFD(Sfl = 50.0, nsteps=3, npaths=19)
        8.067753794

        >>> o = Lookback(ref=s, right='call', K=50, T=0.25, rf_r=.1, desc='Example from Hull Ch.26 Example 26.2 (p608)')
        >>> from pandas import Series
        >>> expiries = range(1,11)
        >>> O = Series([o.update(T=t).pxFD(Sfl = 50.0, nsteps=3, npaths=19) for t in expiries], expiries)
        >>> O.plot(grid=1, title='FD Price vs expiry (in years)') # doctest: +ELLIPSIS
        <matplotlib.axes._subplots.AxesSubplot object at ...>
        >>> import matplotlib.pyplot as plt
        >>> plt.show()

        :Authors:
            Mengyan Xie <xiemengy@gmail.com>,
            Hanting Li <hl45@rice.edu>,
            Yen-fei Chen <yensfly@gmail.com>
       """
        self.Sfl = Sfl
        return super().calc_px(method=method, nsteps=nsteps, npaths=npaths, keep_hist=keep_hist, Sfl = Sfl)

    def _calc_LT(self):
        """ Internal function for option valuation.

        See ``calc_px()`` for complete documentation.


        Notes
        -----
        Implementing Binomial Trees   `<http://papers.ssrn.com/sol3/papers.cfm?abstract_id=1341181>`_
        John C. Hull, 9ed, 2014, ISBN 0133456315 `<http://amzn.com/0133456315>`_  p.607

        :Authors:
            Hanting Li <hl45@rice.edu>

        """



        keep_hist = getattr(self.px_spec, 'keep_hist', False)
        n = getattr(self.px_spec, 'nsteps', 3)
        _ = self.LT_specs(n)

        # Get the Price based on Binomial Tree
        S = (self.ref.S0,)
        S_tree = S
        K_tree = S

        # Compute the Strike Tree
        for i in range(0, n, 1):
            if (self.signCP == -1):
                K = tuple(_['u'] * np.array(S)) + (S[len(S)-1],)
            else:
                K = (S[0],) + tuple(_['d'] * np.array(S))
            S = tuple(_['u'] * np.array(S)) + (_['d']*S[len(S)-1],)
            # The Spot Tree
            S_tree = (tuple([float(s) for s in S]),) + S_tree
            # The Strike Tree
            K_tree = (tuple([float(k) for k in K]),) + K_tree

        # The terminal stock price
        ST = self.ref.S0 * _['d'] ** np.arange(n, -1, -1) * _['u'] ** np.arange(0, n + 1)
        K = K_tree[0]
        # The payoff tree
        O = np.maximum(self.signCP * (ST - K), 0)
        O_tree = (tuple([float(o) for o in O]),)

        # Generate the Payoff tree
        for i in range(n, 0, -1):
            O = _['df_dt'] * ((1 - _['p']) * O[:i] + ( _['p']) * O[1:])  #prior option prices (@time step=i-1)
            O_tree = (tuple([float(o) for o in O]),) + O_tree

        self.px_spec.add(px=float(Util.demote(O)), method='LT', sub_method='binomial tree; Hull Ch.13',\
                        LT_specs=_, ref_tree = S_tree if keep_hist else None, opt_tree = O_tree if keep_hist else None)

        return self

    def _calc_BS(self):
        """ Internal function for option valuation.

        See ``calc_px()`` for complete documentation.

        Notes
        -----
        John C. Hull, 9ed, 2014, ISBN 0133456315 `<http://amzn.com/0133456315>`_  p.607
        Lookback option on Wikipedia `<https://goo.gl/euwJeE>`_

        :Authors:
            Mengyan Xie <xiemengy@gmail.com>
        """

        _ = self
        # Compute Parameters


        # The payoff from a floating lookback call is the amount that the final asset price exceeds the minimum asset
        # price achieved during the life of the option.
        # The payoff from a floating lookback put is the amount by which the maximum asset price achieved during the
        # life of the option exceeds the final asset price

        # compute the new stock price
        S_new = _.ref.S0 / _.px_spec.Sfl if _.signCP == 1 else _.px_spec.Sfl / _.ref.S0
        N = Util.norm_cdf

        # compute each a and c parameters from Hull p607
        a1 = (math.log(S_new) + (_.signCP * (_.rf_r - _.ref.q) + _.ref.vol ** 2 / 2) * _.T) / \
             (_.ref.vol * math.sqrt(_.T))
        a2 = a1 - _.ref.vol * math.sqrt(_.T)
        a3 = (math.log(S_new) + _.signCP * (-_.rf_r + _.ref.q + _.ref.vol ** 2 / 2) * _.T) / \
             (_.ref.vol * math.sqrt(_.T))
        Y1 = _.signCP * (-2 * (_.rf_r - _.ref.q - _.ref.vol ** 2 / 2) * math.log(S_new)) / (_.ref.vol ** 2)

        # compute call option price
        c1 = _.ref.S0 * math.exp(-_.ref.q * _.T) * N(a1)
        c2 = _.ref.S0 * math.exp(-_.ref.q * _.T) * (_.ref.vol ** 2) * N(-a1)/(2 * (_.rf_r - _.ref.q))
        c3 = - _.px_spec.Sfl * math.exp(-_.rf_r * _.T) * (N(a2) - _.ref.vol ** 2 * math.exp(Y1) * \
                                                          N(-a3) / (2 * (_.rf_r - _.ref.q)))

        c = c1 - c2 + c3

        # compute put option price
        p1 = self.px_spec.Sfl * math.exp(-_.rf_r * _.T) * (N(a1) - _.ref.vol ** 2 * math.exp(Y1) * \
                                                           N(-a3) / (2 * (_.rf_r - _.ref.q)))
        p2 = _.ref.S0 * math.exp(-_.ref.q * _.T) * (_.ref.vol ** 2) * N(-a2)/(2 * (_.rf_r - _.ref.q))
        p3 = _.ref.S0 * math.exp(-_.ref.q * _.T) * N(a2)
        p = p1 + p2 - p3


        # Calculate the value of the option using the BS Equation
        if self.signCP == 1:
            self.px_spec.add(px=float(c), method='BS', sub_method='Look back, Hull Ch.26')

        else:
            self.px_spec.add(px=float(p), method='BS', sub_method='Look back, Hull Ch.26')
        return self

    def _calc_MC(self):
        """ Internal function for option valuation.

        See ``calc_px()`` for complete documentation.
        """
        return self

    def _calc_FD(self):
        """ Internal function for option valuation.

        See ``calc_px()`` for complete documentation.
        """
        _ = self
        M = getattr(self.px_spec, 'npaths', 5) # no. intervals of stock price
        J = np.arange(1,M) # indices of stock prices
        Smax = 2*_.ref.S0
        dS = Smax/M # stock price interval
        S = np.arange(0, Smax+0.00001, dS)
        #print(S)

        N = getattr(self.px_spec, 'nsteps', 5) # no. intervals of time
        dt = _.T/N # time interval

        a = (-0.5*(_.rf_r - _.ref.q)*J*dt+0.5*_.ref.vol**2*J**2*dt)/(1+_.rf_r*dt)
        b = (1-_.ref.vol**2*J**2*dt)/(1+_.rf_r*dt)
        c = (0.5*(_.rf_r - _.ref.q)*J*dt+0.5*_.ref.vol**2*J**2*dt)/(1+_.rf_r*dt)
        A = np.diag(b) + np.diag(a[1:M-1], k=-1) + np.diag(c[0:M-2], k=+1)

        # set up boundary condition
        p = np.zeros((N+1, M+1)) # FD option price storage
        p[-1,:] = np.array(np.maximum(_.signCP*(S-_.Sfl), [0]*(M+1))) # option price when t=T
        p[:,-1] = np.array( [np.maximum(_.signCP*(Smax-_.Sfl), 0)]*(N+1) ) # option price when S=Smax
        p[:,0] = np.array( [np.maximum(_.signCP*(0-_.Sfl), 0)]*(N+1) ) # option price when S=0

        for i in range(N,0,-1):
            y = np.zeros(M-1)
            y[0] = a[0]*p[i,0]
            y[-1] = c[-1]*p[i,-1]
            p[i-1,1:M] = np.dot(p[i,1:M],A)+y
            p[i-1,:] = np.maximum(_.signCP*(S-_.Sfl), p[i-1,:])

        #from pandas import DataFrame, options
        #options.display.float_format = '{:.3f}'.format
        #out = DataFrame(p)
        #print(out)

        if _.signCP==1:
            index = np.where(S>_.ref.S0)
            self.px_spec.add(px=float(p[0, index[0][0]]), method='FD', sub_method='Explicit', FD_specs=_)
        else:
            index = np.where(S<=_.ref.S0)
            self.px_spec.add(px=float(p[0,index[0][-1]-1]), method='FD', sub_method='Explicit', FD_specs=_)

        return self


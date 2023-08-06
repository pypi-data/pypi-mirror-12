import math
import numpy as np
import scipy

try: from qfrm.OptionValuation import *  # production:  if qfrm package is installed
except:   from OptionValuation import *  # development: if not installed and running from source


class Exchange(OptionValuation):
    """ Exchange option class.

    Inherits all methods and properties of OptionValuation class.
    """

    def calc_px(self, method='BS', nsteps=None, npaths=None, keep_hist=False, cor=0.1):
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
        cor: float, between 0 and 1
                Required. This specifies the correlation between the two assets of interest.

        Returns
        -------
        self : Exchange
            Returned object contains specifications and calculated price in  ``px_spec`` variable (``PriceSpec`` object).

        Notes
        -----

        [1] In my implementation of all the pricers of exhange option, I assume that this is an option to exchange
        the first asset for the second. The payoff profile is ``max{S0_2(T)-S0_1(T),0}`` where ``S0_2(T)`` \
        is the price of asset 2 at maturity and ``S0_1(T)`` is the price of asset 1 at maturity. \
        This is equivalent to restating this exchange option as a call (resp. put) option on asset 2 (resp. asset 1)\
        with a strike price equal to the future value of asset 1 (resp. asset 2). \
        When you use this function, please use the following input format: ``S0=(asset1,asset2)``
        Due to the aforementioned reasons, the parameter ``right`` is ignored.

        [2]I used implicit finite difference method in my FD implementation. In order for the option value to\
        converge, when you set ``npaths`` which determines the delta_s, \
        please make sure ``S0_1``, namely ``S0[0]`` is a multiple of delta_s, namely the interval between\
        consecutive prices.

        Examples
        --------

        **BS**

        Verification:
        `Exchange Options, p.4 <http://www.stat.nus.edu.sg/~stalimtw/MFE5010/PDF/L3exchange.pdf>`_

        >>> s = Stock(S0=(100,100), vol=(0.15,0.20), q=(0.04,0.05))
        >>> o = Exchange(ref=s, right='call', K=40, T=1, rf_r=.1, \
        desc='px @4.578 page 4 http://www.stat.nus.edu.sg/~stalimtw/MFE5010/PDF/L3exchange.pdf')
        >>> o.pxBS(cor=0.75)
        4.5780492

        >>> o.calc_px(method='BS', cor=0.75).px_spec # save interim results to self.px_spec. Equivalent to repr(o)
        ... # doctest: +ELLIPSIS, +NORMALIZE_WHITESPACE
        PriceSpec...px: 4.5780492...

        >>> (o.px_spec.px, o.px_spec.d1, o.px_spec.d2, o.px_spec.method)  # alternative attribute access
        (4.578049200203772, -0.009449111825230689, -0.14173667737846024, 'BS')

        >>> Exchange(clone=o).pxBS(cor=0.75)
        4.5780492

        Example of option price development (BS method) with increasing maturities

        >>> from pandas import Series
        >>> expiries = range(1,11)
        >>> O = Series([o.update(T=t).calc_px(method='BS', cor=0.75).px_spec.px for t in expiries], expiries)
        >>> O.plot(grid=1, title='Price vs expiry (in years)') # doctest: +ELLIPSIS
        <matplotlib.axes._subplots.AxesSubplot object at ...>
        >>> import matplotlib.pyplot as plt
        >>> plt.show()


        **FD**
        *Verification of examples*:
        `Exchange Options, p.4 <http://www.stat.nus.edu.sg/~stalimtw/MFE5010/PDF/L3exchange.pdf>`_

        Please note that the following FD examples will only generate results that matches the output of online\
        source if we use ``nsteps=10`` and ``npaths = 101``. \

        For fast runtime purpose, I use nsteps=10 and npaths = 9 in the following examples, \
        which may not generate results that match the output of online source



        Use a finite difference method to price an exchange option

        The following example will generate ``px = 4.558805242`` with ``nsteps = 10`` and ``npaths = 101``,
        which can be verified with
        `Exchange Options, p.4 <http://www.stat.nus.edu.sg/~stalimtw/MFE5010/PDF/L3exchange.pdf>`_
        However, for the purpose of fast runtime, I use ``nstep = 10`` and ``npaths = 9`` in all following examples,
        whose result does not match verification.
        If you want to verify my code, please use ``nsteps = 10`` and ``npaths = 101`` in the following example.

        >>> s = Stock(S0=(100,100), vol=(0.15,0.20), q=(0.04,0.05))
        >>> o = Exchange(ref=s, right='call', K=40, T=1, rf_r=.1, \
        desc='px @4.578 page 4 http://www.stat.nus.edu.sg/~stalimtw/MFE5010/PDF/L3exchange.pdf')
        >>> o.calc_px(method='FD',cor=0.75, nsteps=10, npaths=9).px_spec.px # doctest: +ELLIPSIS
        3.993309432...

        >>> o.calc_px(method='FD', cor=0.75, nsteps=10, npaths=9).px_spec # save interim results to self.px_spec.
        ... # doctest: +ELLIPSIS, +NORMALIZE_WHITESPACE
        PriceSpec...px: 3.993309432...

        >>> (o.px_spec.px, o.px_spec.method)  # alternative attribute access
        (3.993309432456476, 'FD')

        >>> Exchange(clone=o).pxFD(cor=0.75, nsteps=10, npaths=9)
        3.993309432

        Another example with different volatility and correlation

        >>> s = Stock(S0=(100,100), vol=(0.15,0.30), q=(0.04,0.05))
        >>> o = Exchange(ref=s, right='call', K=40, T=1, rf_r=.1)
        >>> o.calc_px(method='FD',cor=0.6, nsteps=10, npaths=9).px_spec.px # doctest: +ELLIPSIS
        7.996470439...

        Example of option price development (FD method) with increasing maturities

        >>> from pandas import Series
        >>> expiries = range(1,11)
        >>> O = Series([o.update(T=t).calc_px(method='FD', cor=0.75, nsteps=10, \
        npaths=9).px_spec.px for t in expiries], expiries)
        >>> O.plot(grid=1, title='Price vs expiry (in years)') # doctest: +ELLIPSIS
        <matplotlib.axes._subplots.AxesSubplot object at ...>
        >>> import matplotlib.pyplot as plt
        >>> plt.show()


        :Authors:
            Tianyi Yao <ty13@rice.edu>
        """
        self.cor = cor
        return super().calc_px(method=method, nsteps=nsteps, npaths=npaths, keep_hist=keep_hist, cor=cor)

    def _calc_BS(self):
        """ Internal function for option valuation.

        See ``calc_px()`` for complete documentation.

        :Authors:
            Tianyi Yao <ty13@rice.edu>
        """

        #extract parameters
        _ = self

        S0 = _.ref.S0
        S0_1 = S0[0] #spot price of asset 1
        S0_2 = S0[1] #spot price of asset 2
        vol = _.ref.vol
        vol_1 = vol[0] #volatility of asset 1
        vol_2 = vol[1] #volatility of asset 2
        q = _.ref.q
        q_1 = q[0] #annualized dividend yield of asset 1
        q_2 = q[1] #annualized dividend yield of asset 2
        cor = _.cor #correlation coefficient between the two assets
        T = _.T


        #compute necessary parameters
        vol_a = (vol_1 ** 2) + (vol_2 ** 2) -2 * cor * vol_1 * vol_2
        d1 = (np.log(S0_2 / S0_1) + ((q_1 - q_2 + (vol_a / 2)) * T)) / (np.sqrt(vol_a) * np.sqrt(T))
        d2 = d1 - np.sqrt(vol_a) * np.sqrt(T)

        px = (S0_2 * np.exp(-q_2 * T) * Util.norm_cdf(d1) - S0_1 * np.exp(-q_1 * T) * Util.norm_cdf(d2))

        self.px_spec.add(px=float(px), sub_method=None, d1=d1, d2=d2)

        return self

    def _calc_LT(self):
        """ Internal function for option valuation.

        See ``calc_px()`` for complete documentation.

        :Authors:

        """

        return self

    def _calc_MC(self):
        """ Internal function for option valuation.

        See ``calc_px()`` for complete documentation.

        :Authors:

        """
        return self

    def _calc_FD(self):
        """ Internal function for option valuation.

        See ``calc_px()`` for complete documentation.

        :Authors:
            Tianyi Yao <ty13@rice.edu>

        """

        # Get parameters
        total_time_steps = getattr(self.px_spec, 'nsteps', 3)
        total_px_steps = getattr(self.px_spec, 'npaths', 3)

        _ = self

        S0 = _.ref.S0
        S0_1 = S0[0] #spot price of asset 1
        S0_2 = S0[1] #spot price of asset 2

        vol = _.ref.vol
        vol_1 = vol[0] #volatility of asset 1
        vol_2 = vol[1] #volatility of asset 2

        q = _.ref.q
        q_1 = q[0] #annualized dividend yield of asset 1
        q_2 = q[1] #annualized dividend yield of asset 2

        ttm = _.T
        r = _.rf_r
        _.K = S0_2 * np.exp((r - q_2) * ttm)
        K = _.K
        cor = _.cor
        #compute exchange option specific parameters
        vol_a = np.sqrt((vol_1 ** 2) + (vol_2 ** 2) - 2 * cor * vol_1 * vol_2)

        M = total_px_steps - 1 #number of rows of the f_matrix
        N = total_time_steps-1 #number of columns of the f_matrix
        S_max = S0_1 * 2                                # maximum stock price
        S_min = 0.0                                   # minimum stock price
        d_t = ttm / (total_time_steps - 1)                  # delta t
        S = np.linspace(S_min,S_max,total_px_steps)   # all the possible spot price at t=0

        f_matrix = np.zeros((total_px_steps,total_time_steps)) # Initialize the grid containing option values

        # Payout at the maturity time
        payout_T = np.maximum((K - S),0)

        first_row = K  # f at zero spot price

        last_row = 0  #f at S_max

        j = np.arange(0,M + 1)
        a = 0.5 * d_t * ((r - q_1) * j - (vol_a ** 2) * (j ** 2))
        b = 1 + d_t * ((vol_a ** 2) * (j ** 2) + r)
        c = 0.5 * d_t * (-(r - q_1) * j - (vol_a ** 2) * (j ** 2))

        data = (a[2:M],b[1:M],c[1:M - 1])
        B = scipy.sparse.diags(data,[-1,0,1]).tocsc() #construct the sparse matrix

        f_matrix[:,N] = payout_T
        f_matrix[0,:] = first_row
        f_matrix[M,:] = last_row
        POS = np.zeros(M - 1)
        for idx in np.arange(N-1,-1,-1):
            POS[0] = -a[1] * f_matrix[0,idx]
            POS[-1] = -c[M-1] * f_matrix[M,idx]
            f_matrix[1:M,idx] = scipy.sparse.linalg.spsolve(B,f_matrix[1:M,idx+1]+POS)
            f_matrix[:,-1] = payout_T
            f_matrix[0,:] = first_row
            f_matrix[-1,:] = last_row
        #look for the input spot price
        ind=np.where(S == S0_1)[0][0]
        self.px_spec.add(px=float(f_matrix[ind,0]), sub_method='Implicit Method')
        return self

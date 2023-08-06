pywFM
======

pywFM is a Python wrapper for Steffen Rendle's [libFM](http://libfm.org/). libFM is a **Factorization Machine** library:

> Factorization machines (FM) are a generic approach that allows to mimic most factorization models by feature engineering. This way, factorization machines combine the generality of feature engineering with the superiority of factorization models in estimating interactions between categorical variables of large domain. libFM is a software implementation for factorization machines that features stochastic gradient descent (SGD) and alternating least squares (ALS) optimization as well as Bayesian inference using Markov Chain Monte Carlo (MCMC).

For more information regarding Factorization machines and libFM, read Steffen Rendle's paper: [Factorization Machines with libFM, in ACM Trans. Intell. Syst. Technol., 3(3), May. 2012](http://www.csie.ntu.edu.tw/~b97053/paper/Factorization%20Machines%20with%20libFM.pdf)


### Motivation
While using Python implementations of Factorization Machines, I felt that the current implementations ([pyFM](https://github.com/coreylynch/pyFM) and [fastFM](https://github.com/ibayer/fastFM/)) had many *[f](https://github.com/coreylynch/pyFM/issues/3)l[a](https://github.com/ibayer/fastFM/blob/master/examples/warm_start_als.py#L45)w[s](https://github.com/ibayer/fastFM/issues/13)*. Then I though, why re-invent the wheel? Why not use the original libFM?

Sure, it's not Python native yada yada ... But atleast we have a bulletproof, battle-tested implementation that we can guide ourselves with.

### Installing
Binary installers for the latest released version are available at the Python package index: http://pypi.python.org/pypi/pywFM/

And via `easy_install`:
```shell
easy_install pandas
```

or `pip`:
```shell
pip install pandas
```

### Dependencies

* numpy
* sklearn
* subprocess


### Examples


### License

MIT (see LICENSE.md file)

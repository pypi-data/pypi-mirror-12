import warnings

try:
    from numpy import exp as _exp
    from numpy import log as ln
    from numpy import any as _any
except ImportError:
    from math import exp as _exp
    from math import log as ln
    _any = any


def water_permittivity(T=298.15, P=1, units=None, U=None,
                       just_return_U=False, warn=True, exp=None):
    """
    Relative permittivity of water as function of temperature (K)
    and pressure (bar).

    Parameters
    ----------
    T: float
        Temperature (default: 298.15 Kelvin)
    P: float
        Pressure (default: 1 bar)
    units: object (optional)
        object with attributes: Kelvin, bar
    U: array_like (optional)
        9 parameters to the equation.
    just_return_U: bool (optional, default: False)
        Do not compute relative permittivity, just return the parameters ``U``.
    warn: bool (default: True)
        Emit UserWarning when outside temperature/pressure range.
    exp: callback (default: None)
        Custom callback for evaluating the exponential function

    Returns
    -------
    Relative permittivity of water (dielectric constant)

    References
    ----------
    Bradley, D.J.; Pitzer, K.S. `Thermodynamics of electrolytes. 12. Dielectric
        properties of water and Debye--Hueckel parameters to 350/sup
        0/C and 1 kbar`, J. Phys. Chem.; Journal Volume 83 (12)
        (1979), pp. 1599-1603,
        http://pubs.acs.org/doi/abs/10.1021/j100475a009
        DOI: 10.1021/j100475a009
    """
    if units is None:
        K = 1
        bar = 1
    else:
        K = units.Kelvin
        bar = units.bar
    if U is None:
        U = (3.4279e2,
             -5.0866e-3 / K,
             9.4690e-7 / K**2,
             -2.0525,
             3.1159e3*K,
             -1.8289e2*K,
             -8.0325e3*bar,
             4.2142e6*K*bar,
             2.1417/K*bar)
    if just_return_U:
        return U
    T0 = 273.15*K
    if warn:
        if _any(T < T0) or _any(T > T0 + 350*K):
            warnings.warn("Outside temperature range (0-350 degC)")
        else:
            if _any(T > T0 + 70*K):
                if _any(P > 2000*bar):
                    warnings.warn("Outside pressure range (2000 bar)")
                else:
                    if _any(P > 5000*bar):
                        warnings.warn("Outside pressure range (5000 bar)")
    if exp is None:
        exp = _exp
    B = U[6] + U[7]/T + U[8]*T
    C = U[3] + U[4]/(U[5] + T)
    eps1000 = U[0]*exp(U[1]*T + U[2]*T**2)
    return eps1000 + C*ln((B+P)/(B + 1000.0*bar))

# generated at doi2bib.org:
bibtex = """
@article{Bradley1979,
  doi = {10.1021/j100475a009},
  url = {http://dx.doi.org/10.1021/j100475a009},
  year  = {1979},
  month = {jun},
  publisher = {American Chemical Society ({ACS})},
  volume = {83},
  number = {12},
  pages = {1599--1603},
  author = {Daniel J. Bradley and Kenneth S. Pitzer},
  title = {Thermodynamics of electrolytes. 12. Dielectric properties of water
           and Debye-Hueckel parameters to 350.degree.C and 1 kbar},
  journal = {J. Phys. Chem.}
}
"""

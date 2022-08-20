import numpy as np
from typing import NamedTuple
from scipy.stats import norm, uniform
from loguru import logger


class Plot(NamedTuple):
    x: list[float]
    y: list[float]

def normal_distribution(n: int=500) -> Plot:
    # x = np.linspace(start=-3.0, stop=3.0, num=n)
    x = np.linspace(start=0.0, stop=1.0, num=500)
    y = norm.pdf(x, 0, 1)
    return Plot(x=x, y=y)

def uniform_distribution(n: int=10000) -> Plot:
    x = np.linspace(start=-0.5, stop=1.5, num=n)
    # x = np.linspace(start=0, stop=1, num=10000)
    y = uniform.pdf(x, 0, 1)
    return Plot(x=x, y=y)

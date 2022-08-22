import random
from loguru import logger
from scipy.stats import norm
from math import e
from ..types import Statistic


def normal(n: int=500) -> Statistic:
    """Нормальный закон распределения"""
    d = norm(loc=0.5, scale=0.5)
    array = d.rvs(size=n)
    v = array.var()
    m = array.mean()
    std = array.std()
    cdf = d.cdf(array)

    def custom_normal():
        low = 0 
        high = 1
        custom_array = []
        for _ in range(n):
            custom_array.append(low + random.uniform(low, high) * (high - low))
        
        logger.info(f"{custom_array=}")
        MO = sum(array) / n

        p1 = 0
        for elem in array:
            p1 += (elem - MO) ** 2
        D = 1 / (n - 1) * p1

        sqrt_D = D ** 0.5

        a1 = 1 / n

        px1 = []
        counter = 0
        for px in sorted(array):
            if px > 0:
                counter += a1 * e ** (-a1 * px)
                px1.append((1 / n) * counter)
            else:
                px1.append((1 / n) * counter)
        logger.info(f"{MO=}")
        logger.info(f"{D=}")
        logger.info(f"{sqrt_D=}")
        logger.info(f"TEST")
        return px1, array

    # cdf, array = custom_normal()

    return Statistic(array=sorted(array), variance=v, mean=m, standard_deviation=std, cdf=sorted(cdf))

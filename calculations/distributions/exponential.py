import random
from loguru import logger
from scipy.stats import expon
from math import sqrt
from models import Statistic

def exponential(n: int=10000) -> Statistic:
    """ Показательный закон распределения """
    
    #  TODO 1. что такое k в x = t * (eps ** ( 1/(k +1) ))

    d = expon(loc=0.5, scale=0.5)
    array = d.rvs(size=n)
    v = array.var()
    m = array.mean()
    std = array.std()
    cdf = d.cdf(array)

    def custom_exponential():
        low = 0 
        high = 1
        custom_array = []
        for _ in range(n):
            custom_array.append(1 * sqrt(random.uniform(low, high)))
        
        logger.info(f"{custom_array=}")
        MO = sum(array) / n

        p1 = 0
        for elem in array:
            p1 += (elem - MO) ** 2
        D = 1 / (n - 1) * p1

        sqrt_D = D ** 0.5

        x1 = 1 / 80

        px1 = []
        counter = 0
        for px in sorted(custom_array):
            if px < x1:
                counter += 1
                px1.append((1 / n) * counter)
        logger.info(f"{MO=}")
        logger.info(f"{D=}")
        logger.info(f"{sqrt_D=}")
        return px1, custom_array

    # cdf, array = custom_exponential()
    
    return Statistic(
        array=sorted(array),
        variance=v,
        mean=m,
        standard_deviation=std,
        cdf=sorted(cdf),
        title='Показательно распределение'
        )

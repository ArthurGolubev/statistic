from functools import reduce
from math import e, sqrt
import random
import numpy as np
from scipy.stats import uniform, norm, expon
from loguru import logger



from typing import NamedTuple


class Statistic(NamedTuple):
    array:              list[float]
    variance:           float       # Дисперсия
    standard_deviation: float       # Среднеквадратическое отклонение
    mean:               float       # Математическое ожидание
    cdf:                list[float] # ФРВ (кумулятивная функция распредяления)


def uniform_distribution(n: int=10000) -> Statistic:
    
    """Равномерный закон распределения
    Parameters:
    n (int): размер выборки случайных велечин
    loc (float): математическое ожидание
    scale: (float): среднеквадратическое отклонение

    Returnn:
    Statistic (NamedTyple): статистика по равномерному распределению
    """
    d = uniform(loc=0.5, scale=0.5)
    array = d.rvs(size=n)
    v = array.var()
    m = array.mean()
    std = array.std()
    cdf = d.cdf(array)

    def custom_uniform():
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

        x1 = 0.92

        # P = (1 / n) * sum(map(lambda x: 1 if (x1 - x) >= 0 else 0, sorted(custom_array)))
        px1 = []
        counter = 0
        for px in sorted(custom_array):
            if px < x1:
                counter += 1
                px1.append((1 / n) * counter)
            else:
                px1.append((1 /n) * counter)
        # logger.info(f"{P=}")
        logger.info(f"{MO=}")
        logger.info(f"{D=}")
        logger.info(f"{sqrt_D=}")
        return px1
        # return custom_array, D, std
    cdf = custom_uniform()

    # return Statistic(array=sorted(array), variance=v, mean=m, standard_deviation=std, cdf=sorted(cdf))
    return Statistic(array=sorted(array), variance=v, mean=m, standard_deviation=std, cdf=sorted(cdf))

def normal_distribution(n: int=500) -> Statistic:
    """Нормальный закон распределения"""
    d = norm(loc=0.5, scale=0.5)
    array = d.rvs(size=n)
    v = array.var()
    m = array.mean()
    std = array.std()
    cdf = d.cdf(array)

    def custom_uniform():
        low = 0 
        high = 1
        sigm = 
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

        a1 = 8

        px1 = []
        counter = 0
        for px in sorted(custom_array):
            if px > 0:
                counter += a1 * e ** (-a1 * px)
                px1.append((1 / n) * counter)
            else:
                px1.append((1 / n) * counter)
        logger.info(f"{MO=}")
        logger.info(f"{D=}")
        logger.info(f"{sqrt_D=}")
        logger.info(f"TEST")
        return px1, custom_array

    cdf, array = custom_uniform()

    return Statistic(array=sorted(array), variance=v, mean=m, standard_deviation=std, cdf=sorted(cdf))

def exponential_distribution(n: int=10000) -> Statistic:
    """Показательный закон распределения"""
    d = expon(loc=0.5, scale=0.5)
    array = d.rvs(size=n)
    v = array.var()
    m = array.mean()
    std = array.std()
    cdf = d.cdf(array)

    def custom_uniform():
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

        x1 = 0.9

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

    cdf, array = custom_uniform()
    
    return Statistic(array=sorted(array), variance=v, mean=m, standard_deviation=std, cdf=sorted(cdf))

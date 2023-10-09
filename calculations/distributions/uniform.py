import random
from loguru import logger
from scipy.stats import uniform as uf
from models import Statistic


def uniform(n: int=10000, custom: bool=True) -> Statistic:
    
    """Равномерный закон распределения
    Parameters:
    n (int): размер выборки случайных велечин
    loc (float): математическое ожидание
    scale: (float): среднеквадратическое отклонение

    Returnn:
    Statistic (NamedTyple): статистика по равномерному распределению
    """


    
    d = uf(loc=0.5, scale=0.5)
    array = d.rvs(size=n)
    v = array.var()
    m = array.mean()
    std = array.std()
    cdf = d.cdf(array)
    
    def lib_uniform():

        MO = sum(array) / n
        p1 = 0
        for elem in array:
            p1 += (elem - MO) ** 2
        D = 1 / (n - 1) * p1

        sqrt_D = D ** 0.5
        logger.info(f"{MO=}")
        logger.info(f"{D=}")
        logger.info(f"{sqrt_D=}")


    def custom_uniform():
        low = 0 
        high = 1
        v_sample = []
        for _ in range(n):
            """
            моделирование случайной велечины с равномерным законом распределения на произвольном интервале (стр. 62)
            x = a + eps * (b - a)
            eps - случайная величина с равномерным законом распределения, изменяющаяся в пределах [0; 1] (стр. 60)
            """
            v_sample.append(low + random.uniform(low, high) * (high - low))
        # logger.info(f"{v_sample=}")
        
        # D = ( (1 / (n -1)) * sum( [xi - ((1/n) * sum(v_sample)) for xi in v_sample] ) ** 2 )  # Дисперсия, стр. 10

        """ Вероятность выподания """
        P = 1 / n

        """ Математическое ожидание """
        MO = sum([xj * P for xj in v_sample])

        """ Дисперсия, стр. 9"""
        D = sum( [(xj ** 2) * P for xj in v_sample] ) - MO

        x = 0.92
        cdf_x = []

        counter = 0
        for xi in sorted(v_sample):
            """
            формирование выборки ФРВ
            единичная функция 1(x - x^i)
            """
            if x - xi >= 0:

                counter += 1
                cdf_x.append((1 / n) * counter)
            else:
                
                cdf_x.append((1 /n) * counter)

        return cdf_x, D
    logger.info(f"\n\n{m=}")
    
    if custom:
        cdf, D = custom_uniform()
    else:
        pass


    # return Statistic(array=sorted(array), variance=v, mean=m, standard_deviation=std, cdf=sorted(cdf))
    return Statistic(
        array=sorted(array),
        variance=D,
        mean=m,
        standard_deviation=std,
        cdf=sorted(cdf),
        title='Равномерное распределение'
        )
from typing import NamedTuple


class Statistic(NamedTuple):
    array:              list[float]
    variance:           float       # Дисперсия
    standard_deviation: float       # Среднеквадратическое отклонение
    mean:               float       # Математическое ожидание
    cdf:                list[float] # ФРВ (кумулятивная функция распредяления)

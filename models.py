from pydantic import BaseModel


class InputData(BaseModel):
    pass


class InputParametrs(BaseModel):
    pass


class ProcessedInputData(BaseModel):
    description: str
    header1: str
    header2: str
    factors: list[str]
    data: list[list[str]]
    group_averages: list[float]
    error_max: list[float]
    error_min: list[float]
    dots_x: list[str]
    dots_y: list[float]


class CalculatedANOVA(BaseModel):
    y_headers: list[str]
    to_integer: bool
    y_11: float
    y_21: float
    data_minus_avr: list[list[str]]
    overall_average: float
    Qj: list[str]
    Tj: list[str]
    Tj2: list[str]
    sum_Qj: float
    sum_Tj: float
    sum_Tj2: float
    equivalence_levels_F: bool
    s_total: float
    n: int
    s_fact: float
    column_n: list[int]
    s_remainder: float
    s2_fact: float
    s2_remainder: float
    f_observation: float
    f_crit: float
    h0: int


class Statistic(BaseModel):
    array:              list[float]
    variance:           float       # Дисперсия
    standard_deviation: float       # Среднеквадратическое отклонение
    mean:               float       # Математическое ожидание
    cdf:                list[float] # ФРВ


class ComparisonCDF(BaseModel):
    cdf_1:      list[float]
    cdf_2:      list[float]
    array_1:    list[float]
    array_2:    list[float]


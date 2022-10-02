from typing import NamedTuple



class OpenCSV(NamedTuple):
    description: str
    header: str
    factors: list[str]
    data: list[list[str]]
    group_averages: list[float]


class SANOVA(NamedTuple):
    y_headers: list[str]
    to_integer: bool
    y_11: float
    y_21: float
    data_minus_avr_and_square: list[list[str]]
    overall_average: float
    Qj: list[float]
    Tj: list[float]
    Tj2: float
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
    h0: bool



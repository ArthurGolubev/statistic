from typing import NamedTuple



class SANOVA(NamedTuple):
    data: list[list[str]]
    data_minus_avr: list[list[str]]
    square_data: list[list[str]]
    group_averages: list[float]
    overall_average: float
    Qj: list[float]
    Tj: list[float]
    Tj2: float
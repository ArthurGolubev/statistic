from typing import NamedTuple



class OpenCSV(NamedTuple):
    description: str
    header: str
    factors: list[str]
    data: list[list[str]]
    group_averages: list[float]


class SANOVA(NamedTuple):
    y_headers: list[str]
    data_minus_avr_and_square: list[list[str]]
    overall_average: float
    Qj: list[float]
    Tj: list[float]
    Tj2: float


import strawberry
import csv
from loguru import logger
from strawberry.fastapi import GraphQLRouter
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from calculations.distributions.compare_cdf import compare_cdf

from calculations.distributions.uniform import uniform
from calculations.distributions.normal import normal
from calculations.distributions.exponential import exponential
from calculations.ANOVA.SingleANOVA import SinglANOVA

app = FastAPI()


@strawberry.type
class Statistic:
    array:              list[float]
    variance:           float       # Дисперсия
    standard_deviation: float       # Среднеквадратическое отклонение
    mean:               float       # Математическое ожидание
    cdf:                list[float] # ФРВ

@strawberry.type
class ComparisonCDF:
    cdf_1:      list[float]
    cdf_2:      list[float]
    array_1:    list[float]
    array_2:    list[float]

@strawberry.type
class ANOVA:
    y_headers: list[str]
    data_minus_avr_and_square: list[list[str]]
    overall_average: float
    Qj: list[str]
    Tj: list[str]
    Tj2: list[str]


@strawberry.type
class OpenCSV:
    description: str
    header: str
    factors: list[str]
    data: list[list[str]]
    group_averages: list[float]


@strawberry.type
class Query:
    
    @strawberry.field
    def uniform_distribution_statistic(sampleSize: int) -> Statistic:
        return Statistic(*uniform(sampleSize))

    @strawberry.field
    def normal_distribution_statistic(sampleSize: int) -> Statistic:
        return Statistic(*normal(sampleSize))

    @strawberry.field
    def exponential_distribution_statistic(sampleSize: int) -> Statistic:
        return Statistic(*exponential(sampleSize))

    @strawberry.field
    def evaluate_equality_cdf(n: int, m: int, n_distribution: str, m_distribution: str, a: int) -> ComparisonCDF:
        c = compare_cdf(n, m, n_distribution, m_distribution, a)
        return ComparisonCDF(*c)
    
    @strawberry.field
    def open_csv(data: str) -> OpenCSV:
        logger.info("CSV OPEN")
        return OpenCSV(*SinglANOVA(data=data).open_csv())

    @strawberry.field
    def calculate_anova(data: str, precision: int, averages: list[str]) -> ANOVA:
        logger.info("CALCULATE ANOVA")
        return ANOVA(*SinglANOVA(data=data, precision=precision).calculate(averages))



schema = strawberry.Schema(query=Query)
graphql_app = GraphQLRouter(schema=schema)

app.include_router(graphql_app, prefix='/api/graphql')
app.mount('/', StaticFiles(directory='client', html=True), name="something")

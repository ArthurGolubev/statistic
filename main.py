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
    data: list[list[int]]

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
    def upload_data(data: str) -> ANOVA:
        logger.info(f"{data=}")
        res = csv.reader(data.strip().split('\n'), delimiter=',', quoting=csv.QUOTE_NONNUMERIC, skipinitialspace=True)
        res = [x for x in res]
        # for row in res:
        #     logger.info(f"{row=}")
        return ANOVA(data=list(res))



schema = strawberry.Schema(query=Query)
graphql_app = GraphQLRouter(schema=schema)

app.include_router(graphql_app, prefix='/api/graphql')
app.mount('/', StaticFiles(directory='client', html=True), name="something")

import strawberry
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
    cdf_1: list[float]
    cdf_2: list[float]



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
        def cdf(distribution_type: str, sampleSize: int) -> Statistic:
            if distribution_type == 'uniform':
                return uniform(sampleSize)
            elif distribution_type == 'normal':
                return normal(sampleSize)
            elif distribution_type == 'exponential':
                return exponential(sampleSize)
            
        cdf_1 = cdf(n_distribution, n)
        cdf_2 = cdf(m_distribution, m)
        comp = compare_cdf(cdf_1, cdf_2)
        return ComparisonCDF()



schema = strawberry.Schema(query=Query)
graphql_app = GraphQLRouter(schema=schema)

app.include_router(graphql_app, prefix='/api/graphql')
app.mount('/', StaticFiles(directory='client', html=True), name="something")

import strawberry
from loguru import logger
from strawberry.fastapi import GraphQLRouter
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

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



schema = strawberry.Schema(query=Query)
graphql_app = GraphQLRouter(schema=schema)

app.include_router(graphql_app, prefix='/api/graphql')
app.mount('/', StaticFiles(directory='client', html=True), name="something")

import strawberry
from loguru import logger
from strawberry.fastapi import GraphQLRouter
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from calculations.distributions import exponential_distribution, normal_distribution, uniform_distribution


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
    def normal_distribution_statistic(n: int) -> Statistic:
        return Statistic(*normal_distribution(n))
    
    @strawberry.field
    def uniform_distribution_statistic(n: int) -> Statistic:
        return Statistic(*uniform_distribution(n))

    @strawberry.field
    def exponential_distribution_statistic(n: int) -> Statistic:
        return Statistic(*exponential_distribution(n))



schema = strawberry.Schema(query=Query)
graphql_app = GraphQLRouter(schema=schema)

app.include_router(graphql_app, prefix='/api/graphql')
app.mount('/', StaticFiles(directory='client', html=True), name="something")

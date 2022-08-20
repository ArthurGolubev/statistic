import strawberry
from loguru import logger
from strawberry.fastapi import GraphQLRouter
from fastapi import FastAPI
from calculations.distribution import normal_distribution, uniform_distribution
from fastapi.staticfiles import StaticFiles


app = FastAPI()

app.mount('/', StaticFiles(directory='client', html=True), name="something")


@strawberry.type
class Scatter:
    x: list[float]
    y: list[float]


@strawberry.type
class Query:

    @strawberry.field
    def normal_distribution(n: int) -> Scatter:
        return Scatter(*normal_distribution(n))
    
    @strawberry.field
    def uniform_distribution(n: int) -> Scatter:
        return Scatter(*uniform_distribution(n))



schema = strawberry.Schema(query=Query)
graphql_app = GraphQLRouter(schema=schema)

app.include_router(graphql_app, prefix='/api/graphql')

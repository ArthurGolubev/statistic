from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routers import main_router


app = FastAPI()


app.include_router(main_router.router, prefix='/main')
app.mount('/', StaticFiles(directory='client', html=True), name="something")

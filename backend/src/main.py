from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import recommend

app = FastAPI()

app.include_router(recommend.router, prefix="/recommend")


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import emotion_route
from src.routes import genre_route
import uvicorn
import os

origins = [os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

app.include_router(emotion_route.router)
app.include_router(genre_route.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

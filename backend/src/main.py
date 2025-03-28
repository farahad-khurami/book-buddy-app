from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import emotion_route
from routes import genre_route
import uvicorn


app = FastAPI(debug=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(emotion_route.router)
app.include_router(genre_route.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

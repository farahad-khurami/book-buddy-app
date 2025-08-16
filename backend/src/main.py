from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import emotion_route
from src.routes import genre_route
from src.routes import metadata_route
import os

origins = [os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")]

app = FastAPI()

# Hello world
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

app.include_router(emotion_route.router)
app.include_router(genre_route.router)
app.include_router(metadata_route.router)


"""
curl -X POST http://localhost:8000/book_metadata \
  -H "Content-Type: application/json" \
  -d '{"titles": ["Dune", "1984", "The Hobbit"]}'

  
{
  "metadata": {
    "Dune": {
      "title": "Dune",
      "imageUrl": "https://books.google.com/books/content?id=...&printsec=frontcover",
      "rating": "4.5"
    },
    "1984": {
      "title": "1984",
      "imageUrl": "https://books.google.com/books/content?id=...&printsec=frontcover",
      "rating": "4.4"
    },
    "The Hobbit": {
      "title": "The Hobbit",
      "imageUrl": "https://books.google.com/books/content?id=...&printsec=frontcover",
      "rating": "4.7"
    }
  }
}


"""
from fastapi import APIRouter, HTTPException
from models import GenreRequest, GenreRecommendationResponse
from services.genre_logic import book_genre_recommendation


router = APIRouter()

@router.post("/recommend_genre", response_model=GenreRecommendationResponse)
async def recommend_books_by_genre(user_request: GenreRequest):
    try:
        books = book_genre_recommendation(user_request.genre)
        return books
    except Exception as e:
        raise HTTPException(status_code=500)
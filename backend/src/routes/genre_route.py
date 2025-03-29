from fastapi import APIRouter, HTTPException
from src.models import GenreRequest, GenreRecommendationResponse
from src.services.genre_logic import book_genre_recommendation
from openai import AuthenticationError
import logging

logger = logging.getLogger(__name__)


router = APIRouter()


@router.post("/recommend_genre", response_model=GenreRecommendationResponse)
async def recommend_books_by_genre(user_request: GenreRequest):
    try:
        books = book_genre_recommendation(user_request.genre)
        return books
    except AuthenticationError as e:
        logger.error("OpenAI authentication failed.")
        raise HTTPException(
            status_code=502,
            detail="There was a problem connecting to the recommendation engine.",
        )
    except Exception as e:
        logger.exception("Unexpected error occurred.")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")

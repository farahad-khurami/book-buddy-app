import logging

from fastapi import APIRouter, HTTPException
from openai import AuthenticationError

from src.config import MAX_INPUT_TOKENS
from src.models import GenreRequest, GenreRecommendationResponse
from src.services.genre_logic import book_genre_recommendation
from src.utils.utils import count_tokens


logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/recommend_genre", response_model=GenreRecommendationResponse)
async def recommend_books_by_genre(user_request: GenreRequest):
    try:
        genre = user_request.genre.strip()
        if count_tokens(genre) > MAX_INPUT_TOKENS:
            raise HTTPException(
                status_code=400,
                detail=f"Input too long, please limit your message to {MAX_INPUT_TOKENS} tokens."
            )
        books = book_genre_recommendation(user_request.genre)
        return books
    except HTTPException as e:
        raise e
    except AuthenticationError as e:
        logger.error("OpenAI authentication failed.")
        raise HTTPException(
            status_code=502,
            detail="There was a problem connecting to the recommendation engine.",
        )
    except Exception as e:
        logger.exception("Unexpected error occurred.")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")

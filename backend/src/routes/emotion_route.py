from fastapi import APIRouter, HTTPException
from src.models import EmotionRequest, EmotionRecommendationResponse
from src.services.emotion_logic import book_emotion_recommendation
from openai import AuthenticationError
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/recommend_emotion", response_model=EmotionRecommendationResponse)
async def recommend_books_by_emotion(user_request: EmotionRequest):
    try:
        books = book_emotion_recommendation(user_request.mood)
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

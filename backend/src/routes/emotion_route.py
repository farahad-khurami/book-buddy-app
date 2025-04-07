import logging

from fastapi import APIRouter, HTTPException, Depends
from openai import AuthenticationError

from src.config import MAX_INPUT_TOKENS, OPENAI_MODEL
from src.models import EmotionRequest, EmotionRecommendationResponse
from src.services.emotion_logic import book_emotion_recommendation
from src.utils.utils import count_tokens
from src.auth.auth_deps import get_current_user


logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/recommend_emotion", response_model=EmotionRecommendationResponse)
async def recommend_books_by_emotion(
    user_request: EmotionRequest,
    _=Depends(get_current_user),
):
    try:
        stripped_input = user_request.mood.strip()
        if count_tokens(text=stripped_input, model=OPENAI_MODEL) > MAX_INPUT_TOKENS:
            raise HTTPException(
                status_code=400,
                detail=f"Input too long, please limit your message to {MAX_INPUT_TOKENS} tokens.",
            )
        books = book_emotion_recommendation(user_request.mood)
        return books
    except HTTPException as e:
        raise e
    except AuthenticationError:
        logger.error("OpenAI authentication failed.")
        raise HTTPException(
            status_code=502,
            detail="There was a problem connecting to the recommendation engine.",
        )
    except Exception:
        logger.exception("Unexpected error occurred.")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")

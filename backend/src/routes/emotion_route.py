from fastapi import APIRouter, HTTPException
from models import EmotionRequest, EmotionRecommendationResponse
from services.emotion_logic import book_emotion_recommendation

router = APIRouter()

@router.post("/recommend_emotion", response_model=EmotionRecommendationResponse)
async def recommend_books_by_emotion(user_request: EmotionRequest):
    try:
        books = book_emotion_recommendation(user_request.mood)
        return books
    except Exception as e:
        raise HTTPException(status_code=500)

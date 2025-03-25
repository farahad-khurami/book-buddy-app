from fastapi import APIRouter, HTTPException
from models import UserRequest, BookRecommendations
from services.recommend_logic import get_book_recommendation


router = APIRouter()

@router.post("/", response_model=BookRecommendations)
async def recommend_books(user_request: UserRequest):
    try:
        books = get_book_recommendation(user_request.mood)
        return books
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
# routes/user_route.py
from fastapi import APIRouter, Depends
from src.auth.auth_deps import get_current_user
from sqlalchemy.ext.asyncio import AsyncSession
from src.db.session import get_db
from src.db.models import User
from sqlalchemy.future import select

router = APIRouter()

@router.get("/me")
async def get_current_user_data(
    user_email: str = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(User).where(User.email == user_email))
    user = result.scalar_one_or_none()
    if not user:
        return {"error": "User not found"}
    return {
        "email": user.email,
        "name": user.name,
        "picture": user.picture
    }

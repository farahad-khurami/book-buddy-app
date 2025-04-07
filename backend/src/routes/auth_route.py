from fastapi import APIRouter, Request, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from urllib.parse import urlencode
import os, httpx

from src.db.session import get_db
from src.db.models import User
from src.auth.jwt_handler import create_access_token
from sqlalchemy.future import select

router = APIRouter()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")
GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"


@router.get("/login/google")
def login_google():
    params = {
        "client_id": GOOGLE_CLIENT_ID,
        "response_type": "code",
        "redirect_uri": GOOGLE_REDIRECT_URI,
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "consent",
    }
    return {"auth_url": f"{GOOGLE_AUTH_URL}?{urlencode(params)}"}


@router.get("/auth/callback")
async def google_callback(request: Request, db: AsyncSession = Depends(get_db)):
    code = request.query_params.get("code")
    if not code:
        return {"error": "Missing code"}

    # Get access token
    async with httpx.AsyncClient() as client:
        token_res = await client.post(
            GOOGLE_TOKEN_URL,
            data={
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": GOOGLE_REDIRECT_URI,
                "grant_type": "authorization_code",
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
        token_data = token_res.json()
        access_token = token_data.get("access_token")

    # Get user info
    async with httpx.AsyncClient() as client:
        userinfo_res = await client.get(
            GOOGLE_USERINFO_URL, headers={"Authorization": f"Bearer {access_token}"}
        )
        userinfo = userinfo_res.json()

    email = userinfo.get("email")
    name = userinfo.get("name")
    picture = userinfo.get("picture")

    # Check if user exists, else create
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    if not user:
        user = User(email=email, name=name, picture=picture)
        db.add(user)
        await db.commit()
        await db.refresh(user)

    jwt_token = create_access_token({"sub": user.email})
    return {
        "access_token": jwt_token,
        "token_type": "bearer",
        "user": {
            "email": user.email,
            "name": user.name,
            "picture": user.picture
        }
    }


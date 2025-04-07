from fastapi.security import HTTPBearer
from fastapi import Depends, HTTPException
from src.auth.jwt_handler import verify_token

oauth_scheme = HTTPBearer()

def get_current_user(token=Depends(oauth_scheme)):
    user_email = verify_token(token.credentials)
    if not user_email:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return user_email

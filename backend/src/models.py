from pydantic import BaseModel
from typing import List

class Book(BaseModel):
    title: str
    author: str
    genre: str
    description: str
    relation_to_emotions: str  # Ensure this field matches OpenAI response

class UserRequest(BaseModel):
    mood: str

class BookRecommendations(BaseModel):
    recommendations: List[Book]  # ✅ Change to expect a list of Book objects

from pydantic import BaseModel
from typing import List, Union

# Emotion-based book model
class BookByEmotion(BaseModel):
    title: str
    author: str
    genre: str
    description: str
    relation_to_emotions: str

# Genre-based book model
class BookByGenre(BaseModel):
    title: str
    author: str
    genre: str
    description: str
    relation_to_genre: str

# Request models
class MetadataRequest(BaseModel):
    titles: List[str]
    
class EmotionRequest(BaseModel):
    mood: str

class GenreRequest(BaseModel):
    genre: str

# Response models
class EmotionRecommendationResponse(BaseModel):
    recommendations: List[Union[BookByEmotion, str]]

class GenreRecommendationResponse(BaseModel):
    recommendations: List[Union[BookByGenre, str]]
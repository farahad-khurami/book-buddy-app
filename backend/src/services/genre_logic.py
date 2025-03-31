from src.utils.utils import openai_request
from src.config import SYSTEM_PROMPTS, OPENAI_MODEL
import json


def book_genre_recommendation(genre: str):
    response = openai_request(system_prompt=SYSTEM_PROMPTS["by_genre"], prompt=genre, model=OPENAI_MODEL)
    content = json.loads(response)
    return content
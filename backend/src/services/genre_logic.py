from utils.utils import openai_request
from config import SYSTEM_PROMPTS
import json


def book_genre_recommendation(genre: str):
    response = openai_request(system_prompt=SYSTEM_PROMPTS["by_genre"], prompt=genre, model="gpt-4o")
    content = json.loads(response)
    return content
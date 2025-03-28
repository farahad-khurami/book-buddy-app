from utils.utils import openai_request
from config import SYSTEM_PROMPTS
import json


def book_emotion_recommendation(mood: str):
    response = openai_request(system_prompt=SYSTEM_PROMPTS["by_emotion"], prompt=mood, model="gpt-4o")
    content = json.loads(response)
    return content
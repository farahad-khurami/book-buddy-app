from src.utils.utils import openai_request, clean_json_response
from src.config import SYSTEM_PROMPTS


def get_book_recommendation(mood: str):
    raw_response = openai_request(system_prompt=SYSTEM_PROMPTS["by_emotion"], prompt=mood)
    cleaned_response = clean_json_response(raw_response)

    # ✅ Fix: Ensure it returns a dictionary with the key "recommendations"
    return {"recommendations": cleaned_response["books"]} if "books" in cleaned_response else {"recommendations": []}

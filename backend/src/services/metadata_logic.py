from src.config import GOOGLE_BOOKS_API_URL
from src.utils.utils import clean_text
import httpx


async def fetch_book_metadata(title: str) -> dict:
    cleaned_title = clean_text(title)
    params = {"q": f'intitle:"{cleaned_title}"', "maxResults": 1}

    async with httpx.AsyncClient() as client:
        response = await client.get(GOOGLE_BOOKS_API_URL, params=params)
        data = response.json()

    items = data.get("items", [])
    if not items:
        return None

    info = items[0]["volumeInfo"]
    return {
        "title": info.get("title", title),
        "imageUrl": info.get("imageLinks", {}).get("thumbnail", ""),
        "rating": str(info.get("averageRating", "N/A")),
    }

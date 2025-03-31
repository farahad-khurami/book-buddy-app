# services/google_books.py
import httpx

GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes"

async def fetch_book_metadata(title: str) -> dict:
    params = {
        "q": f'intitle:"{title}"',
        "maxResults": 1
    }

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
        "rating": str(info.get("averageRating", "N/A"))
    }

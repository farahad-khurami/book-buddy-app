# routes/metadata.py
from fastapi import APIRouter
from src.services.metadata_logic import fetch_book_metadata
from src.models import MetadataRequest
import asyncio

router = APIRouter()

@router.post("/book_metadata")
async def get_book_metadata(request: MetadataRequest):
    metadata = {}

    async def process_title(title: str):
        data = await fetch_book_metadata(title)
        metadata[title] = data or {
            "title": title,
            "imageUrl": "",
            "rating": "N/A"
        }

    await asyncio.gather(*(process_title(title) for title in request.titles))
    return {"metadata": metadata}

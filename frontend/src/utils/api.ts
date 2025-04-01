// src/utils/api.ts
import { BookRecommendation, AppMode, BookMetadata } from "./types";

export async function fetchRecommendations(
  mode: AppMode,
  input: string
): Promise<BookRecommendation[]> {
  const endpoint = mode === "emotion" ? "recommend_emotion" : "recommend_genre";
  const key = mode === "emotion" ? "mood" : "genre";

  const res = await fetch(`http://localhost:8000/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [key]: input })
  });
  
  const data = await res.json();

  if (data.recommendations && Array.isArray(data.recommendations)) {
    return data.recommendations;
  } else {
    throw new Error("Unexpected response from the server.");
  }
}

export async function fetchBookMetadata(
  titles: string[]
): Promise<Record<string, BookMetadata>> {
  try {
    console.log("Fetching metadata for titles:", titles);
    
    const res = await fetch(`http://localhost:8000/book_metadata`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titles })
    });
    
    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log("Received metadata response:", data);
    
    if (data.metadata && typeof data.metadata === 'object') {
      return data.metadata;
    } else {
      console.error("Unexpected metadata format:", data);
      throw new Error("Unexpected response format from metadata service.");
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
    throw error;
  }
}
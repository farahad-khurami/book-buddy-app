import { BookRecommendation, AppMode } from "./types";

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
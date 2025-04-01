// src/utils/types.ts
export interface BookRecommendation {
  title?: string;
  author?: string;
  genre?: string;
  description?: string;
  relation_to_emotions?: string;
  relation_to_genre?: string;
  // Add metadata for display
  metadata?: BookMetadata;
}

export interface BookMetadata {
  title: string;
  imageUrl: string;
  rating: string;
}
  
export type AppMode = "emotion" | "genre";
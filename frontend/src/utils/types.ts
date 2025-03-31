export interface BookRecommendation {
    title?: string;
    author?: string;
    genre?: string;
    description?: string;
    relation_to_emotions?: string;
    relation_to_genre?: string;
  }
  
  export type AppMode = "emotion" | "genre";
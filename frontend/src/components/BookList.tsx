import React from "react";
import { AppMode, BookRecommendation } from "../utils/types";
import styles from "../styles/styles";

interface BookListProps {
  recommendations: BookRecommendation[];
  mode: AppMode;
}

export const BookList: React.FC<BookListProps> = ({ recommendations, mode }) => {
  return (
    <div style={styles.recommendationsList}>
      {recommendations.map((rec, idx) => (
        <div key={idx} style={styles.recommendationCard}>
          {typeof rec === "string" ? (
            <p>{rec}</p>
          ) : (
            <>
              <h2 style={styles.bookTitle}>{rec.title}</h2>
              <p style={styles.bookAuthor}>
                by {rec.author} ({rec.genre})
              </p>
              <p style={styles.bookDescription}>{rec.description}</p>
              <p style={styles.bookMatch}>
                {mode === "emotion"
                  ? `Emotion Match: ${rec.relation_to_emotions}`
                  : `Genre Match: ${rec.relation_to_genre}`}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
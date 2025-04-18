import React from "react";
import { AppMode, BookRecommendation } from "../utils/types";
import styles from "../styles/styles";

interface BookListProps {
  recommendations: BookRecommendation[];
  mode: AppMode;
}

// BookList component to display a list of book recommendations
export const BookList: React.FC<BookListProps> = ({
  recommendations,
  mode
}) => {
  return (
    <div style={styles.recommendationsList}> {/* Container for the list of recommendations */}
      {recommendations.map((rec, idx) => (
        <div key={idx} style={styles.recommendationCard} className="recommendation-card">
          {typeof rec === "string" ? (
            // Display a message if the recommendation is a string
            <p style={{ color: "#FFFFFF" }}>{rec}</p>
          ) : (
            <div style={styles.bookCard}>
              {/* Book Cover Image */}
              <div style={styles.bookCoverContainer}>
                {rec.metadata?.imageUrl ? (
                  <>
                    <img
                      src={rec.metadata.imageUrl}
                      alt={`Cover of ${rec.title}`}
                      style={styles.bookCover}
                      className="book-cover"
                      onError={(e) => {
                        // If image fails to load, show placeholder
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const placeholder = document.createElement('div');
                          placeholder.style.width = '100%';
                          placeholder.style.height = '100%';
                          placeholder.style.display = 'flex';
                          placeholder.style.alignItems = 'center';
                          placeholder.style.justifyContent = 'center';
                          placeholder.style.backgroundColor = '#252A41';
                          placeholder.style.color = '#8A80FF';
                          placeholder.style.fontSize = '36px';
                          placeholder.style.fontWeight = 'bold';
                          placeholder.innerText = rec.title?.charAt(0) || "?";
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                    {rec.metadata?.rating && (
                      <div style={styles.bookRating}>
                        ★ {rec.metadata.rating}
                      </div>
                    )}
                  </>
                ) : (
                  // Placeholder for missing book cover
                  <div style={styles.bookCoverPlaceholder}>
                    <span>{rec.title?.charAt(0) || "?"}</span>
                  </div>
                )}
              </div>

              {/* Book Details */}
              <div style={styles.bookDetails}>
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
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
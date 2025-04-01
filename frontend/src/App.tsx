import { useState } from "react";
import { LoadingCard, ModeSelector, BookList, SearchForm } from "./components";
import { fetchRecommendations, fetchBookMetadata } from "./utils/api";
import { BookRecommendation, AppMode, BookMetadata } from "./utils/types";
import styles from "./styles/styles";
import "./styles/hover.css"; // Import the hover styles
import "./index.css";

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>("emotion");
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState<BookRecommendation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  const handleModeChange = (newMode: AppMode) => {
    setAppMode(newMode);
    setInput("");
    setRecommendations(null);
    setError(null);
    setMessageIndex(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const extractBookTitles = (books: BookRecommendation[]): string[] => {
    // Make sure to only extract valid titles from book objects, not from string messages
    return books
      .filter(book => typeof book !== 'string' && book.title && book.title.trim().length > 0)
      .map(book => book.title as string);
  };

  const enrichRecommendationsWithMetadata = (
    recommendations: BookRecommendation[],
    metadata: Record<string, BookMetadata>
  ): BookRecommendation[] => {
    return recommendations.map(rec => {
      if (typeof rec === 'string') {
        return rec;
      }
      
      if (rec.title && metadata[rec.title]) {
        return {
          ...rec,
          metadata: metadata[rec.title]
        };
      }
      
      return rec;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecommendations(null);
    setError(null);
    setLoading(true);
    setMessageIndex(0);

    try {
      // Step 1: Fetch book recommendations
      const books = await fetchRecommendations(appMode, input);
      
      // Step 2: Get book titles and fetch metadata before showing results
      const titles = extractBookTitles(books);
      console.log("Attempting to fetch metadata for:", titles);
      
      if (titles.length > 0) {
        try {
          // Fetch metadata for all books
          const metadata = await fetchBookMetadata(titles);
          console.log("Received metadata:", metadata);
          
          // Enrich recommendations with metadata
          const enrichedRecommendations = enrichRecommendationsWithMetadata(books, metadata);
          
          // Now that we have both recommendations and covers, show them to the user
          setRecommendations(enrichedRecommendations);
          setLoading(false);
        } catch (metadataError) {
          console.error("Failed to fetch book metadata:", metadataError);
          
          // Even if metadata fetch fails, still show the recommendations
          setRecommendations(books);
          setLoading(false);
        }
      } else {
        // If no valid titles found, just show the recommendations
        setRecommendations(books);
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Failed to fetch recommendations:", err);
      setError("Failed to fetch recommendations.");
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div style={styles.card}>
        <h1 style={styles.title} className="app-title">BookBuddy</h1>
        
        <ModeSelector 
          mode={appMode} 
          onModeChange={handleModeChange} 
        />
        
        <SearchForm 
          mode={appMode}
          input={input}
          loading={loading}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />

        {error && <p style={styles.error}>{error}</p>}
        
        {loading && 
          <LoadingCard 
            mode={appMode} 
            messageIndex={messageIndex} 
            setMessageIndex={setMessageIndex} 
          />
        }

        {!loading && recommendations && 
          <BookList 
            recommendations={recommendations} 
            mode={appMode}
          />
        }
      </div>
    </div>
  );
}
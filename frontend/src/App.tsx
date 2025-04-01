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
  const [metadataLoading, setMetadataLoading] = useState(false);

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
    setMetadataLoading(false);

    try {
      // Step 1: Fetch book recommendations
      const books = await fetchRecommendations(appMode, input);
      
      // Initial display of books without metadata
      setRecommendations(books);
      setLoading(false);
      
      // Start metadata fetch process after showing initial results
      setMetadataLoading(true);
      
      // Step 2: Get book titles and fetch metadata
      const titles = extractBookTitles(books);
      console.log("Attempting to fetch metadata for:", titles);
      
      if (titles.length > 0) {
        try {
          const metadata = await fetchBookMetadata(titles);
          console.log("Received metadata:", metadata);
          
          // Step 3: Enrich recommendations with metadata
          const enrichedRecommendations = enrichRecommendationsWithMetadata(books, metadata);
          setRecommendations(enrichedRecommendations);
        } catch (metadataError) {
          console.error("Failed to fetch book metadata:", metadataError);
          // If metadata fetch fails for all books, try fetching individually for each book
          const individualFetches = await Promise.allSettled(
            titles.map(async (title) => {
              try {
                const singleMetadata = await fetchBookMetadata([title]);
                return { title, metadata: singleMetadata[title] };
              } catch (e) {
                console.error(`Failed to fetch metadata for ${title}:`, e);
                return { title, metadata: null };
              }
            })
          );
          
          // Extract successful fetches
          const successfulMetadata: Record<string, BookMetadata> = {};
          individualFetches.forEach((result) => {
            if (result.status === 'fulfilled' && result.value.metadata) {
              successfulMetadata[result.value.title] = result.value.metadata;
            }
          });
          
          // Apply any successful individual fetches
          if (Object.keys(successfulMetadata).length > 0) {
            const partiallyEnrichedRecommendations = enrichRecommendationsWithMetadata(
              books, 
              successfulMetadata
            );
            setRecommendations(partiallyEnrichedRecommendations);
          }
        }
      }
      
      // Final step: Complete metadata loading
      setMetadataLoading(false);
    } catch (err: any) {
      console.error("Failed to fetch recommendations:", err);
      setError("Failed to fetch recommendations.");
      setLoading(false);
      setMetadataLoading(false);
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
            isLoadingMetadata={metadataLoading}
          />
        }
      </div>
    </div>
  );
}
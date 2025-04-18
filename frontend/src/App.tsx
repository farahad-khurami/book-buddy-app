import { useState } from "react";
import { LoadingCard, ModeSelector, BookList, SearchForm } from "./components";
import { fetchRecommendations, fetchBookMetadata } from "./utils/api";
import { BookRecommendation, AppMode, BookMetadata } from "./utils/types";
import styles from "./styles/styles";
import "./styles/hover.css";
import "./index.css";

// Helper function to extract valid book titles from recommendations
const extractBookTitles = (books: BookRecommendation[]): string[] =>
  books
    .filter(book => typeof book !== 'string' && book.title && book.title.trim().length > 0) // Filter out invalid titles
    .map(book => book.title as string); // Map to an array of titles

// Helper function to enrich recommendations with metadata (e.g., book covers, authors)
const enrichRecommendationsWithMetadata = (
  recommendations: BookRecommendation[],
  metadata: Record<string, BookMetadata>
): BookRecommendation[] =>
  recommendations.map(rec => {
    if (typeof rec === 'string') return rec; // Skip string messages
    return rec.title && metadata[rec.title]
      ? { ...rec, metadata: metadata[rec.title] } // Add metadata if available
      : rec;
  });

// Main App component
export default function App() {
  // State variables
  const [appMode, setAppMode] = useState<AppMode>("emotion"); // Current mode of the app (e.g., emotion-based or genre-based)
  const [input, setInput] = useState(""); // User input for recommendations
  const [recommendations, setRecommendations] = useState<BookRecommendation[] | null>(null); // List of book recommendations
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState<string | null>(null); // Error message if API call fails
  const [messageIndex, setMessageIndex] = useState(0); // Index for cycling through loading messages

  // Handle mode change (e.g., switching between emotion-based and genre-based modes)
  const handleModeChange = (newMode: AppMode) => {
    setAppMode(newMode); // Update the app mode
    resetState(); // Reset the state variables
  };

  // Reset state variables to their initial values
  const resetState = () => {
    setInput(""); // Clear user input
    setRecommendations(null); // Clear recommendations
    setError(null); // Clear error messages
    setMessageIndex(0); // Reset loading message index
  };

  // Handle form submission to fetch book recommendations
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    resetState(); // Reset state variables
    setLoading(true); // Set loading state to true

    try {
      const books = await fetchRecommendations(appMode, input); // Fetch recommendations based on mode and input
      const titles = extractBookTitles(books); // Extract valid book titles from recommendations

      if (titles.length > 0) {
        await fetchAndSetMetadata(books, titles); // Fetch metadata and update recommendations, s
      } else {
        setRecommendations(books); // Set recommendations if no valid titles are found
      }
    } catch (err) {
      console.error("Failed to fetch recommendations:", err); // Log error to console
      setError("Failed to fetch recommendations."); // Set error message
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Fetch metadata for book titles and update recommendations
  const fetchAndSetMetadata = async (books: BookRecommendation[], titles: string[]) => {
    try {
      const metadata = await fetchBookMetadata(titles); // Fetch metadata for the given titles
      const enrichedRecommendations = enrichRecommendationsWithMetadata(books, metadata); // Enrich recommendations with metadata
      setRecommendations(enrichedRecommendations); // Update state with enriched recommendations
    } catch (metadataError) {
      console.error("Failed to fetch book metadata:", metadataError); // Log error to console
      setRecommendations(books); // Show recommendations even if metadata fetch fails
    }
  };

  // Render the main UI
  return (
    <div className="app-container">
      <div style={styles.card}>
        <h1 style={styles.title} className="app-title">BookBuddy</h1> {/* App title */}

        {/* Mode selector for switching between modes */}
        <ModeSelector mode={appMode} onModeChange={handleModeChange} />

        {/* Search form for user input */}
        <SearchForm
          mode={appMode}
          input={input}
          loading={loading}
          onInputChange={(e) => setInput(e.target.value)} // Update input state on change
          onSubmit={handleSubmit} // Handle form submission
        />

        {/* Display error message if any */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Show loading card while fetching data */}
        {loading && (
          <LoadingCard
            mode={appMode}
            messageIndex={messageIndex}
            setMessageIndex={setMessageIndex} // Update loading message index
          />
        )}

        {/* Display book recommendations */}
        {!loading && recommendations && (
          <BookList recommendations={recommendations} mode={appMode} />
        )}
      </div>
    </div>
  );
}
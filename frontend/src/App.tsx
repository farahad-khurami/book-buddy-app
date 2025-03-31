import { useState } from "react";
import { LoadingCard, ModeSelector, BookList, SearchForm } from "./components";
import { fetchRecommendations } from "./utils/api";
import { BookRecommendation, AppMode } from "./utils/types";
import styles from "./styles/styles";

export default function App() {
  const [mode, setMode] = useState<AppMode>("emotion");
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState<BookRecommendation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  const handleModeChange = (newMode: AppMode) => {
    setMode(newMode);
    setInput("");
    setRecommendations(null);
    setError(null);
    setMessageIndex(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecommendations(null);
    setError(null);
    setLoading(true);
    setMessageIndex(0);

    try {
      const data = await fetchRecommendations(mode, input);
      setRecommendations(data);
    } catch (err: any) {
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <style>{styles.animations}</style>
      <div style={styles.card}>
        <h1 style={styles.title}>BookBuddy</h1>
        
        <ModeSelector 
          mode={mode} 
          onModeChange={handleModeChange} 
        />
        
        <SearchForm 
          mode={mode}
          input={input}
          loading={loading}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />

        {error && <p style={styles.error}>{error}</p>}
        
        {loading && 
          <LoadingCard 
            mode={mode} 
            messageIndex={messageIndex} 
            setMessageIndex={setMessageIndex} 
          />
        }

        {!loading && recommendations && 
          <BookList 
            recommendations={recommendations} 
            mode={mode} 
          />
        }
      </div>
    </div>
  );
}
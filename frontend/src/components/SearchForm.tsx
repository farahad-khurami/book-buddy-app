import React from "react";
import { AppMode } from "../utils/types";
import styles from "../styles/styles";

// Props interface for the SearchForm component
interface SearchFormProps {
  mode: AppMode; // Current mode of the app (e.g., "emotion" or "genre")
  input: string; // User input for the search form
  loading: boolean; // Loading state to disable the form while fetching data
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Callback for handling input changes
  onSubmit: (e: React.FormEvent) => Promise<void>; // Callback for handling form submission
}

// SearchForm component for user input and submission
export const SearchForm: React.FC<SearchFormProps> = ({
  mode,
  input,
  loading,
  onInputChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} style={styles.form}> {/* Form container */}
      <div style={{ width: "100%" }}> {/* Textarea container */}
        <textarea
          style={styles.textarea} // Apply textarea styles
          className="book-input" // CSS class for styling
          rows={4} // Number of rows in the textarea
          placeholder={
            mode === "emotion"
              ? "How are you feeling today?" // Placeholder for "emotion" mode
              : "What genre are you interested in?" // Placeholder for "genre" mode
          }
          value={input} // Bind the textarea value to the input state
          onChange={onInputChange} // Handle input changes
          required // Make the textarea a required field
        />
      </div>
      <div style={styles.buttonContainer}> {/* Button container */}
        <button
          type="submit" // Submit button
          disabled={loading} // Disable the button while loading
          style={styles.button.submit(loading)} // Apply dynamic styles based on loading state
          className="submit-button" // CSS class for styling
        >
          {loading ? "Please wait..." : "Get Book Recommendations"} {/* Button text */}
        </button>
      </div>
    </form>
  );
};
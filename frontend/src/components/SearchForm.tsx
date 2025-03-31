import React from "react";
import { AppMode } from "../utils/types";
import styles from "../styles/styles";

interface SearchFormProps {
  mode: AppMode;
  input: string;
  loading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  mode,
  input,
  loading,
  onInputChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <div style={{ width: "100%" }}>
        <textarea
          style={styles.textarea}
          rows={4}
          placeholder={
            mode === "emotion"
              ? "How are you feeling today?"
              : "What genre are you interested in?"
          }
          value={input}
          onChange={onInputChange}
          required
        />
      </div>
      <div style={styles.buttonContainer}>
        <button
          type="submit"
          disabled={loading}
          style={styles.button.submit(loading)}
        >
          {loading ? "Please wait..." : "Get Book Recommendations"}
        </button>
      </div>
    </form>
  );
};
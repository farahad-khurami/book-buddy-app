import React from "react";
import { AppMode } from "../utils/types";
import styles from "../styles/styles";

interface ModeSelectorProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onModeChange }) => {
  return (
    <div style={styles.modeSelector}>
      <button
        onClick={() => onModeChange("emotion")}
        style={{
          ...styles.button.regular(mode === "emotion"),
          marginRight: 8
        }}
      >
        Mood
      </button>
      <button
        onClick={() => onModeChange("genre")}
        style={styles.button.regular(mode === "genre")}
      >
        Genre
      </button>
    </div>
  );
};
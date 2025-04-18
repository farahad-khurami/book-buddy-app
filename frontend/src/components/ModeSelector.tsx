import React from "react";
import { AppMode } from "../utils/types";
import styles from "../styles/styles";

// Props interface for the ModeSelector component
interface ModeSelectorProps {
  mode: AppMode; // Current mode of the app (e.g., "emotion" or "genre")
  onModeChange: (mode: AppMode) => void; // Callback function to handle mode changes
}

// ModeSelector component for switching between "Mood" and "Genre" modes
export const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onModeChange }) => {
  return (
    <div style={styles.modeSelector}> {/* Container for the mode selector buttons */}
      {/* Button for selecting "Mood" mode */}
      <button
        onClick={() => onModeChange("emotion")} // Trigger mode change to "emotion"
        style={{
          ...styles.button.regular(mode === "emotion"), // Apply active style if "emotion" is selected
          marginRight: 8 // Add spacing between buttons
        }}
        className={mode === "emotion" ? "regular-button" : "regular-button-inactive"} // Apply appropriate CSS class
      >
        Mood
      </button>

      {/* Button for selecting "Genre" mode */}
      <button
        onClick={() => onModeChange("genre")} // Trigger mode change to "genre"
        style={styles.button.regular(mode === "genre")} // Apply active style if "genre" is selected
        className={mode === "genre" ? "regular-button" : "regular-button-inactive"} // Apply appropriate CSS class
      >
        Genre
      </button>
    </div>
  );
};
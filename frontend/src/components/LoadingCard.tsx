import React, { useEffect } from "react";
import { AppMode } from "../utils/types";
import styles from "../styles/styles";

// Rotating loading messages for each mode
const EMOTION_MESSAGES = [
    "Matching your mood with literary treasures",
    "Finding books to match your emotional state",
    "Discovering stories that resonate with your feelings",
    "Curating emotional journeys through literature",
    "Connecting your mood to meaningful narratives",
    "Exploring literary worlds that reflect your emotions",
    "Looking up beautiful book covers for your recommendations",
    "Preparing a personalized reading experience"
];

const GENRE_MESSAGES = [
    "Searching for the best titles in your chosen genre",
    "Curating top picks from your favorite category",
    "Finding hidden gems in your preferred genre",
    "Exploring the finest works in your selected style",
    "Discovering must-reads in your literary territory",
    "Unearthing celebrated classics and new releases",
    "Fetching stunning cover art for your recommendations",
    "Creating a tailored collection just for you"
];

// Props interface for the LoadingCard component
interface LoadingCardProps {
    mode: AppMode; // Current mode of the app (e.g., "emotion" or "genre")
    messageIndex: number; // Index of the current loading message
    setMessageIndex: React.Dispatch<React.SetStateAction<number>>; // Function to update the message index
}

// LoadingCard component to display a loading animation and messages
export const LoadingCard: React.FC<LoadingCardProps> = ({
    mode,
    messageIndex,
    setMessageIndex
}) => {
    // Effect to rotate messages
    useEffect(() => {
        const messages = mode === "emotion" ? EMOTION_MESSAGES : GENRE_MESSAGES;

        const interval = setInterval(() => {
            setMessageIndex(prev => (prev < messages.length - 1 ? prev + 1 : 0));
        }, 2000); // Rotate messages every 2 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [mode, setMessageIndex]);

    // Get the current message based on the mode and index
    const currentMessage = mode === "emotion"
        ? EMOTION_MESSAGES[messageIndex]
        : GENRE_MESSAGES[messageIndex];

    return (
        <div style={styles.loadingCard.container}>
            <div style={styles.loadingCard.card}>
                <div style={styles.loadingCard.header}>
                    <h3 style={styles.loadingCard.title}>Finding the perfect books for you...</h3>
                    <p style={styles.loadingCard.message}>{currentMessage}</p>
                </div>

                {/* Loading dots animation */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={styles.loadingCard.dotsContainer}>
                        {[0, 1, 2].map(index => (
                            <div
                                key={index}
                                style={styles.loadingCard.dot(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
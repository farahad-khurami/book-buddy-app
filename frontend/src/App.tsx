import { useState, useEffect } from "react";
import { emotionMessages, genreMessages } from "./loadingMessages";

export default function App() {
  const [mode, setMode] = useState<"emotion" | "genre">("emotion");
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  // Effect to rotate messages during loading
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setMessageIndex(prev =>
          prev < (mode === "emotion" ? emotionMessages.length - 1 : genreMessages.length - 1)
            ? prev + 1
            : 0
        );
      }, 1200); // Change message every 1.2 seconds

      return () => clearInterval(interval);
    }
  }, [loading, mode]);

  const handleModeChange = (newMode: "emotion" | "genre") => {
    setMode(newMode);
    setInput("");
    setRecommendations(null);
    setError(null);
    setMessageIndex(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecommendations(null);
    setError(null);
    setLoading(true);
    setMessageIndex(0);

    const endpoint = mode === "emotion" ? "recommend_emotion" : "recommend_genre";
    const key = mode === "emotion" ? "mood" : "genre";

    try {
      const res = await fetch(`http://localhost:8000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: input })
      });
      const data = await res.json();

      if (data.recommendations && Array.isArray(data.recommendations)) {
        setRecommendations(data.recommendations);
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (err: any) {
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  // Loading animation component with cycling messages
  const LoadingCard = () => {
    const currentMessage = mode === "emotion"
      ? emotionMessages[messageIndex]
      : genreMessages[messageIndex];

    return (
      <div style={{ marginTop: 24 }}>
        <div
          style={{
            padding: 20,
            backgroundColor: "#f9f9f9",
            borderRadius: 8,
            marginBottom: 12,
            border: "1px solid #ddd",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div style={{ marginBottom: 16, textAlign: "center" }}>
            <h3 style={{ color: "#007bff" }}>Finding perfect books for you...</h3>
            <p
              style={{
                color: "#666",
                fontSize: 14,
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {currentMessage}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "inline-block",
                position: "relative",
                width: "80px",
                height: "80px"
              }}
            >
              {[0, 1, 2].map(index => (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    top: "33px",
                    width: "13px",
                    height: "13px",
                    borderRadius: "50%",
                    background: "#007bff",
                    color: "#007bff",
                    animation: "loading-bounce 1.4s infinite ease-in-out both",
                    animationDelay: `${index * 0.16}s`,
                    left: `${8 + (index * 24)}px`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#f4f4f4",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 20,
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      <style>
        {`
          @keyframes loading-bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1.0); }
          }
        `}
      </style>
      <div
        style={{
          backgroundColor: "white",
          padding: 24,
          borderRadius: 16,
          maxWidth: 600,
          width: "100%",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          margin: "20px 0",
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 16, color: "black" }}>
          BookBuddy
        </h1>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <button
            onClick={() => handleModeChange("emotion")}
            style={{
              padding: 10,
              marginRight: 8,
              backgroundColor: mode === "emotion" ? "#007bff" : "#e0e0e0",
              color: mode === "emotion" ? "white" : "black",
              border: "none",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            Mood
          </button>
          <button
            onClick={() => handleModeChange("genre")}
            style={{
              padding: 10,
              backgroundColor: mode === "genre" ? "#007bff" : "#e0e0e0",
              color: mode === "genre" ? "white" : "black",
              border: "none",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            Genre
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <textarea
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "1px solid #ccc",
                resize: "vertical",
                fontSize: 14,
                boxSizing: "border-box"
              }}
              rows={4}
              placeholder={mode === "emotion" ? "How are you feeling today?" : "What genre are you interested in?"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </div>
          <div style={{ width: "100%", marginTop: 12 }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: loading ? "#6c757d" : "#007bff", // Gray when loading
                color: "white",
                padding: 12,
                borderRadius: 8,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "bold",
                fontSize: 16,
                boxSizing: "border-box",
                transition: "background-color 0.3s ease"
              }}
            >
              {loading ? "Please wait..." : "Get Book Recommendations"}
            </button>
          </div>
        </form>

        {error && <p style={{ marginTop: 16, color: "red", textAlign: "center" }}>{error}</p>}

        {loading && <LoadingCard />}

        {!loading && recommendations && (
          <div style={{ marginTop: 24 }}>
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                style={{
                  padding: 16,
                  backgroundColor: "#f9f9f9",
                  borderRadius: 8,
                  marginBottom: 12,
                  border: "1px solid #ddd"
                }}
              >
                {typeof rec === "string" ? (
                  <p>{rec}</p>
                ) : (
                  <>
                    <h2 style={{ fontWeight: "bold", color: "#222" }}>{rec.title}</h2>
                    <p style={{ fontSize: 14, color: "#555" }}>by {rec.author} ({rec.genre})</p>
                    <p style={{ marginTop: 8, color: "#333" }}>{rec.description}</p>
                    <p
                      style={{
                        marginTop: 8,
                        fontSize: 12,
                        fontStyle: "italic",
                        color: "#555"
                      }}
                    >
                      {mode === "emotion"
                        ? `Emotion Match: ${rec.relation_to_emotions}`
                        : `Genre Match: ${rec.relation_to_genre}`}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
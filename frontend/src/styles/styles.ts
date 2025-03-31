import React from 'react';

// Modern color palette
const colors = {
  primary: "#6C63FF", // Vibrant purple for primary actions and focus
  primaryDark: "#5A52D9", // Darker shade of primary for hover states
  secondary: "#2EC4B6", // Teal for accents and secondary elements
  background: "#F8F7FF", // Light lavender background
  card: "#FFFFFF", // White for cards
  cardBackground: "#F0EFFF", // Very light purple for card backgrounds
  text: {
    primary: "#1A1B25", // Almost black for primary text
    secondary: "#4A4B57", // Dark gray for secondary text
    light: "#6E7191", // Medium gray for tertiary text
    accent: "#6C63FF", // Primary color for accent text
  },
  border: "#E4E2F9", // Light purple for borders
  error: "#FF6B6B", // Soft red for errors
  success: "#47C9A2", // Soft green for success states
  shadow: "rgba(108, 99, 255, 0.1)", // Purple-tinted shadow
};

const styles = {
  container: {
    position: "fixed",
    inset: 0,
    backgroundColor: colors.background,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
    boxSizing: "border-box",
    overflow: "auto",
  } as React.CSSProperties,

  animations: `
    @keyframes loading-bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1.0); }
    }
  `,

  card: {
    backgroundColor: colors.card,
    padding: 28,
    borderRadius: 20,
    maxWidth: 600,
    width: "100%",
    boxShadow: `0 8px 30px ${colors.shadow}`,
    display: "flex",
    flexDirection: "column",
    margin: "20px 0",
    border: `1px solid ${colors.border}`,
  } as React.CSSProperties,

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: colors.text.primary,
    letterSpacing: "-0.5px",
  } as React.CSSProperties,

  error: {
    marginTop: 16,
    color: colors.error,
    textAlign: "center",
    fontSize: 14,
    padding: "8px 12px",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderRadius: 8,
    border: `1px solid ${colors.error}`,
  } as React.CSSProperties,

  button: {
    regular: (active: boolean): React.CSSProperties => ({
      padding: "10px 16px",
      backgroundColor: active ? colors.primary : colors.card,
      color: active ? "#FFFFFF" : colors.text.light,
      border: active ? "none" : `1px solid ${colors.border}`,
      borderRadius: 12,
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.2s ease",
      boxShadow: active ? `0 4px 12px ${colors.shadow}` : "none",
    }),

    submit: (loading: boolean): React.CSSProperties => ({
      width: "100%",
      backgroundColor: loading ? colors.text.light : colors.primary,
      color: "white",
      padding: "14px 20px",
      borderRadius: 12,
      border: "none",
      cursor: loading ? "not-allowed" : "pointer",
      fontWeight: "600",
      fontSize: 16,
      boxSizing: "border-box",
      transition: "all 0.3s ease",
      boxShadow: loading ? "none" : `0 4px 12px ${colors.shadow}`,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    }),
  },

  modeSelector: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 24,
    gap: 12,
  } as React.CSSProperties,

  form: {
    width: "100%",
  } as React.CSSProperties,

  textarea: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    border: `1px solid ${colors.border}`,
    resize: "vertical",
    fontSize: 15,
    boxSizing: "border-box",
    backgroundColor: colors.cardBackground,
    color: colors.text.primary,
    transition: "border-color 0.3s ease",
    minHeight: "120px",
    fontFamily: "inherit",
    "&:focus": {
      borderColor: colors.primary,
      outline: "none",
    },
  } as React.CSSProperties,

  buttonContainer: {
    width: "100%",
    marginTop: 20,
  } as React.CSSProperties,

  loadingCard: {
    container: {
      marginTop: 28,
    } as React.CSSProperties,

    card: {
      padding: 24,
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      marginBottom: 12,
      border: `1px solid ${colors.border}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    } as React.CSSProperties,

    header: {
      marginBottom: 20,
      textAlign: "center",
    } as React.CSSProperties,

    title: {
      color: colors.primary,
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 8,
    } as React.CSSProperties,

    message: {
      color: colors.text.secondary,
      fontSize: 14,
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontStyle: "italic",
    } as React.CSSProperties,

    dotsContainer: {
      display: "inline-block",
      position: "relative",
      width: "80px",
      height: "80px",
    } as React.CSSProperties,

    dot: (index: number): React.CSSProperties => ({
      position: "absolute",
      top: "33px",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: colors.primary,
      animation: "loading-bounce 1.4s infinite ease-in-out both",
      animationDelay: `${index * 0.16}s`,
      left: `${8 + (index * 24)}px`,
    }),
  },

  recommendationsList: {
    marginTop: 28,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } as React.CSSProperties,

  recommendationCard: {
    padding: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    border: `1px solid ${colors.border}`,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: `0 6px 20px ${colors.shadow}`,
    },
  } as React.CSSProperties,

  bookTitle: {
    fontWeight: "600",
    color: colors.text.primary,
    fontSize: 18,
    marginBottom: 4,
  } as React.CSSProperties,

  bookAuthor: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 12,
  } as React.CSSProperties,

  bookDescription: {
    marginTop: 12,
    color: colors.text.primary,
    fontSize: 15,
    lineHeight: 1.5,
  } as React.CSSProperties,

  bookMatch: {
    marginTop: 16,
    fontSize: 13,
    fontStyle: "italic",
    color: colors.primary,
    backgroundColor: "rgba(108, 99, 255, 0.1)",
    padding: "6px 12px",
    borderRadius: 20,
    display: "inline-block",
  } as React.CSSProperties,
};

export default styles;
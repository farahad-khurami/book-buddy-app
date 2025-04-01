import React from 'react';

// Color palette based on color theory
// Using a split-complementary scheme with purple as the base
const colors = {
  // Primary colors
  primary: "#8A80FF",          // Main purple - vibrant but not harsh
  primaryLight: "#A599FF",     // Lighter purple for hover states
  primaryDark: "#6C63FF",      // Deeper purple for active states
  
  // Complementary accent colors
  accent1: "#FFB480",          // Soft orange - complementary to purple
  accent2: "#80FFD4",          // Mint/teal - split complementary
  
  // Background shades
  background: "#1A1A2E",       // Deep blue-purple background
  card: "#252A41",             // Dark blue-gray for cards
  cardBackground: "#2D325A",   // Slightly lighter blue-gray for card backgrounds
  
  // Text colors
  text: {
    primary: "#FFFFFF",        // White for primary text
    secondary: "#CDD0F3",      // Light purple-gray for secondary text
    light: "#9A9CC9",          // Medium purple-gray for tertiary text
    accent: "#A599FF",         // Lighter purple for accent text
  },
  
  // Functional colors
  border: "#383D5F",           // Medium blue-gray for borders
  error: "#FF8A80",            // Soft coral red for errors
  success: "#80FFB4",          // Soft green for success states
  warning: "#FFD280",          // Soft amber for warnings
  info: "#80D4FF",             // Soft blue for information
  
  // UI effects
  shadow: "rgba(0, 0, 0, 0.3)",// Dark shadow for depth
  glow: "rgba(138, 128, 255, 0.25)", // Purple glow for focus states
};

// Typography settings
const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSizes: {
    small: "14px",
    body: "16px",
    large: "18px",
    heading2: "22px",
    heading1: "28px",
  },
  fontWeights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeights: {
    tight: "1.2",
    normal: "1.5",
    relaxed: "1.7",
  },
  letterSpacing: {
    tight: "-0.5px",
    normal: "0",
    wide: "0.5px",
  },
};

// Spacing and layout
const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
};

// Create styles
const styles = {
  container: {
    position: "fixed",
    inset: 0,
    backgroundColor: colors.background,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: spacing.lg,
    boxSizing: "border-box",
    overflow: "auto",
    fontFamily: typography.fontFamily,
  } as React.CSSProperties,

  animations: `
    @keyframes loading-bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1.0); }
    }
    
    @keyframes pulse-border {
      0% { border-color: ${colors.primary}; }
      50% { border-color: ${colors.primaryLight}; }
      100% { border-color: ${colors.primary}; }
    }
    
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `,

  card: {
    backgroundColor: colors.card,
    padding: spacing.xl,
    borderRadius: "20px",
    maxWidth: "600px",
    width: "100%",
    boxShadow: `0 10px 30px ${colors.shadow}`,
    display: "flex",
    flexDirection: "column",
    margin: `${spacing.lg} 0`,
    border: `1px solid ${colors.border}`,
    animation: "fade-in 0.5s ease-out",
  } as React.CSSProperties,

  title: {
    fontSize: typography.fontSizes.heading1,
    fontWeight: typography.fontWeights.bold,
    textAlign: "center",
    marginBottom: spacing.xl,
    color: colors.text.primary,
    letterSpacing: typography.letterSpacing.tight,
    position: "relative",
    paddingBottom: spacing.md,
    // Remove &::after
  } as React.CSSProperties,

  error: {
    marginTop: spacing.md,
    color: colors.error,
    textAlign: "center",
    fontSize: typography.fontSizes.small,
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: "rgba(255, 138, 128, 0.15)",
    borderRadius: "8px",
    border: `1px solid ${colors.error}`,
  } as React.CSSProperties,

  button: {
    regular: (active: boolean): React.CSSProperties => ({
      padding: `${spacing.sm} ${spacing.lg}`,
      backgroundColor: active ? colors.primary : colors.cardBackground,
      color: active ? colors.text.primary : colors.text.light,
      border: active ? "none" : `1px solid ${colors.border}`,
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: typography.fontWeights.medium,
      transition: "all 0.2s ease",
      boxShadow: active ? `0 4px 12px ${colors.glow}` : "none",
      fontSize: typography.fontSizes.body,
      letterSpacing: typography.letterSpacing.wide,
      // Remove &:hover here
    }),

    submit: (loading: boolean): React.CSSProperties => ({
      width: "100%",
      backgroundColor: loading ? colors.text.light : colors.primary,
      color: colors.text.primary,
      padding: `${spacing.md} ${spacing.lg}`,
      borderRadius: "12px",
      border: "none",
      cursor: loading ? "not-allowed" : "pointer",
      fontWeight: typography.fontWeights.semibold,
      fontSize: typography.fontSizes.body,
      boxSizing: "border-box",
      transition: "all 0.3s ease",
      boxShadow: loading ? "none" : `0 4px 15px ${colors.glow}`,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      // Remove &:hover here
    }),
  },

  modeSelector: {
    display: "flex",
    justifyContent: "center",
    marginBottom: spacing.xl,
    gap: spacing.sm,
  } as React.CSSProperties,

  form: {
    width: "100%",
  } as React.CSSProperties,

  textarea: {
    width: "100%",
    padding: spacing.md,
    borderRadius: "12px",
    border: `1px solid ${colors.border}`,
    resize: "vertical",
    fontSize: typography.fontSizes.body,
    boxSizing: "border-box",
    backgroundColor: colors.cardBackground,
    color: colors.text.primary,
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    minHeight: "120px",
    fontFamily: typography.fontFamily,
    lineHeight: typography.lineHeights.normal,
    // Remove &:focus
  } as React.CSSProperties,

  buttonContainer: {
    width: "100%",
    marginTop: spacing.lg,
  } as React.CSSProperties,

  loadingCard: {
    container: {
      marginTop: spacing.xl,
      animation: "fade-in 0.5s ease-out",
    } as React.CSSProperties,
    
    card: {
      padding: spacing.xl,
      backgroundColor: colors.cardBackground,
      borderRadius: "16px",
      marginBottom: spacing.md,
      border: `1px solid ${colors.border}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      animation: "pulse-border 2s infinite",
    } as React.CSSProperties,

    header: {
      marginBottom: spacing.lg,
      textAlign: "center",
    } as React.CSSProperties,

    title: {
      color: colors.primary,
      fontSize: typography.fontSizes.large,
      fontWeight: typography.fontWeights.semibold,
      marginBottom: spacing.sm,
    } as React.CSSProperties,

    message: {
      color: colors.text.secondary,
      fontSize: typography.fontSizes.body,
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
      width: "13px",
      height: "13px",
      borderRadius: "50%",
      background: index === 0 ? colors.primary : index === 1 ? colors.accent2 : colors.accent1,
      animation: "loading-bounce 1.4s infinite ease-in-out both",
      animationDelay: `${index * 0.16}s`,
      left: `${8 + (index * 24)}px`,
    }),
  },

  recommendationsList: {
    marginTop: spacing.xl,
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
  } as React.CSSProperties,

  recommendationCard: {
    padding: spacing.lg,
    backgroundColor: colors.cardBackground,
    borderRadius: "16px",
    border: `1px solid ${colors.border}`,
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
    animation: "fade-in 0.4s ease-out",
    // Remove &:hover
    overflow: "hidden",
  } as React.CSSProperties,

  // New styles for book card with cover
  bookCard: {
    display: "flex",
    gap: spacing.lg,
    width: "100%",
  } as React.CSSProperties,

  bookCoverContainer: {
    position: "relative",
    minWidth: "120px",
    maxWidth: "120px",
    height: "180px",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#1A1A2E",
    boxShadow: `0 4px 8px ${colors.shadow}`,
  } as React.CSSProperties,
  
  bookCover: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px",
    transition: "transform 0.3s ease",
    // Remove &:hover
  } as React.CSSProperties,
  
  bookCoverPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    color: colors.primary,
    fontSize: "36px",
    fontWeight: typography.fontWeights.bold,
    background: `linear-gradient(135deg, ${colors.card} 0%, ${colors.cardBackground} 100%)`,
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    position: "relative",
    overflow: "hidden"
  } as React.CSSProperties,
  
  coverLoading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(90deg, 
      ${colors.cardBackground} 0%, 
      ${colors.card} 50%, 
      ${colors.cardBackground} 100%)`,
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite linear",
  } as React.CSSProperties,

  bookRating: {
    position: "absolute",
    bottom: "8px",
    right: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#FFD700",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: typography.fontWeights.semibold,
  } as React.CSSProperties,

  bookDetails: {
    flex: 1,
  } as React.CSSProperties,

  metadataLoadingIndicator: {
    marginTop: spacing.md,
    padding: spacing.xs,
    fontSize: "12px",
    color: colors.text.light,
    textAlign: "center",
    background: `linear-gradient(90deg, ${colors.cardBackground} 25%, ${colors.card} 50%, ${colors.cardBackground} 75%)`,
    backgroundSize: "200% 100%",
    animation: "shimmer 2s infinite linear",
    borderRadius: "4px",
  } as React.CSSProperties,

  bookTitle: {
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
    fontSize: typography.fontSizes.large,
    marginBottom: spacing.xs,
  } as React.CSSProperties,

  bookAuthor: {
    fontSize: typography.fontSizes.small,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  } as React.CSSProperties,

  bookDescription: {
    marginTop: spacing.md,
    color: colors.text.primary,
    fontSize: typography.fontSizes.body,
    lineHeight: typography.lineHeights.relaxed,
  } as React.CSSProperties,

  bookMatch: {
    marginTop: spacing.lg,
    fontSize: typography.fontSizes.small,
    fontStyle: "italic",
    color: colors.primary,
    backgroundColor: "rgba(138, 128, 255, 0.15)",
    padding: `${spacing.xs} ${spacing.md}`,
    borderRadius: "20px",
    display: "inline-block",
    border: `1px solid rgba(138, 128, 255, 0.3)`,
  } as React.CSSProperties,
  
  // Add emotional tags with different accent colors
  emotionTag: (type: 'happy' | 'thoughtful' | 'exciting' | 'melancholy'): React.CSSProperties => {
    let tagColor = colors.primary;
    
    switch(type) {
      case 'happy':
        tagColor = colors.accent1; // Orange for happy/uplifting
        break;
      case 'thoughtful':
        tagColor = colors.primary; // Purple for thoughtful/reflective
        break;
      case 'exciting':
        tagColor = colors.accent2; // Teal for exciting/adventurous
        break;
      case 'melancholy':
        tagColor = colors.info; // Blue for melancholy/calm
        break;
    }
    
    return {
      fontSize: "12px",
      padding: `${spacing.xs} ${spacing.sm}`,
      backgroundColor: `${tagColor}33`, // 20% opacity
      color: tagColor,
      borderRadius: "4px",
      marginRight: spacing.xs,
      marginBottom: spacing.xs,
      display: "inline-block",
      border: `1px solid ${tagColor}66`, // 40% opacity
    };
  },
};

export default styles;
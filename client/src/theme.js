// colour design tokens export
export const colourTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#fafbf8",
    100: "#f2f6ee",
    200: "#d7e5cc",
    300: "#bcd4aa",
    400: "#a1c388",
    500: "#87b266",
    600: "#6d994d",
    700: "#55773c",
    800: "#3d552b",
    900: "#24331a",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colourTokens.primary[200],
              main: colourTokens.primary[500],
              light: colourTokens.primary[800],
            },
            neutral: {
              dark: colourTokens.grey[100],
              main: colourTokens.grey[200],
              mediumMain: colourTokens.grey[300],
              medium: colourTokens.grey[400],
              light: colourTokens.grey[700],
            },
            background: {
              default: colourTokens.grey[900],
              alt: colourTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colourTokens.primary[700],
              main: colourTokens.primary[500],
              light: colourTokens.primary[50],
            },
            neutral: {
              dark: colourTokens.grey[700],
              main: colourTokens.grey[500],
              mediumMain: colourTokens.grey[400],
              medium: colourTokens.grey[300],
              light: colourTokens.grey[50],
            },
            background: {
              default: colourTokens.grey[10],
              alt: colourTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    /* ===== BRAND ===== */
    primary: {
      main: "#E53888",
      light: "#F37199",
      dark: "#AC1754",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#AC1754",
      light: "#C43A6A",
      dark: "#7A0F3A",
      contrastText: "#ffffff",
    },

    /* ===== SEMANTIC ===== */
    success: {
      main: "#22c55e", // availability / add
    },

    warning: {
      main: "#f97316", // view / edit
    },

    error: {
      main: "#ef4444",
    },

    info: {
      main: "#38bdf8",
    },

    /* ===== BACKGROUND ===== */
    background: {
      default: "#0b0b0b", // page background
      paper: "#121212",   // cards, modals
    },

    /* ===== TEXT ===== */
    text: {
      primary: "#ffffff",
      secondary: "#b5b5b5",
      disabled: "#6b6b6b",
    },
  },

  /* ===== SHAPE ===== */
  shape: {
    borderRadius: 14,
  },

  /* ===== TYPOGRAPHY ===== */
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 600,
    },

    body2: {
      color: "#b5b5b5",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: 0.4,
    },
  },

  /* ===== COMPONENT OVERRIDES ===== */
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 18px",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#121212",
          boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
          borderRadius: 16,
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#0f0f0f",
          borderRadius: 10,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },

    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "0 0 25px rgba(229,56,136,0.6)",
        },
      },
    },
  },
});

export default theme;

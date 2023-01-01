import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        card: {
          500: "#2f3349"
        },
        text: "#fff",
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#00ff22",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
      }
    : {
        card: {
          500: "#ffffff"
        },
        text: "#000",
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0", // manually changed
          500: "#e5ff00",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#25293c",
            },
          }
        : {
            background: {
              default: "#f8f7fa",
            },
          }
      ),
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(localStorage.getItem("dark"))
  if (localStorage.getItem("dark") === null){
    localStorage.setItem("dark", "light")
  } else {
    localStorage.setItem("dark", mode)
  }

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
      setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  useEffect(() => {
    setMode(localStorage.getItem("dark"))
  }, [])

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};

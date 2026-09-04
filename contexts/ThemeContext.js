import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "astech.theme";
const ThemeContext = createContext({ theme: "light", setTheme: () => {} });

const palettes = {
  light: {
    name: "light",
    background: "#ffffff",
    surface: "#ffffff",
    border: "#d1d5db",
    text: "#111827",
    textMuted: "#6b7280",
    accent: "#1e3a8a",
    accentText: "#ffffff",
    cardShadow: "rgba(0,0,0,0.08)",
  },
  dark: {
    name: "dark",
    background: "#0b1220",
    surface: "#111a2e",
    border: "#1f2a44",
    text: "#f3f4f6",
    textMuted: "#9ca3af",
    accent: "#60a5fa",
    accentText: "#0b1220",
    cardShadow: "rgba(0,0,0,0.5)",
  },
};

export const ThemeProvider = ({ children }) => {
  const system = Appearance.getColorScheme() || "light";
  const [theme, setThemeState] = useState("system");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored && ["light", "dark", "system"].includes(stored)) {
        setThemeState(stored);
      }
    });
  }, []);

  const setTheme = (next) => {
    setThemeState(next);
    AsyncStorage.setItem(STORAGE_KEY, next);
  };

  const resolved = useMemo(() => {
    const mode = theme === "system" ? system : theme;
    return palettes[mode] || palettes.light;
  }, [theme, system]);

  const value = useMemo(
    () => ({ theme, setTheme, palette: resolved }),
    [theme, resolved]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;

"use client";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Locale, type TranslationKey, t as translate } from "@/i18n/translations";

type Theme = "dark" | "light";

interface AppContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [locale, setLocale] = useState<Locale>("uz");

  const setTheme = (t: Theme) => {
    setThemeState(t);
    if (typeof window !== "undefined") {
      localStorage.setItem("tms-theme", t);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("tms-theme") as Theme | null;
    if (saved) setThemeState(saved);
    const savedLocale = localStorage.getItem("tms-locale") as Locale | null;
    if (savedLocale) setLocale(savedLocale);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("tms-locale", locale);
  }, [locale]);

  const t = (key: TranslationKey) => translate(key, locale);

  return (
    <AppContext.Provider value={{ theme, setTheme, locale, setLocale, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

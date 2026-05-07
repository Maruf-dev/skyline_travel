import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { Lang } from "../types";

/* ── Theme Context ── */
interface ThemeContextValue {
  isDark: boolean;
  setIsDark: (v: boolean) => void;
}

export const ThemeCtx = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
  });

  useEffect(() => {
    document.body.classList.toggle("light", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ThemeCtx.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

/* ── Language Context ── */
interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const LangCtx = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem("lang") as Lang | null) ?? "en"
  );

  const setLangPersisted = (newLang: Lang): void => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <LangCtx.Provider value={{ lang, setLang: setLangPersisted }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}

/* ── Router (thin wrapper over react-router-dom) ── */
type NavPage = "home" | "destinations" | "blog" | "about" | "contact";

const PAGE_TO_PATH: Record<NavPage, string> = {
  home: "/",
  destinations: "/destinations",
  blog: "/blog",
  about: "/about",
  contact: "/contact",
};

function pathToPage(pathname: string): NavPage {
  if (pathname.startsWith("/destinations")) return "destinations";
  if (pathname.startsWith("/blog"))         return "blog";
  if (pathname.startsWith("/about"))        return "about";
  if (pathname.startsWith("/contact"))      return "contact";
  return "home";
}

interface RouterValue {
  page: NavPage;
  navigate: (page: NavPage) => void;
}

export function useRouter(): RouterValue {
  const navigate = useNavigate();
  const location = useLocation();
  const page = pathToPage(location.pathname);

  const navigateTo = (newPage: NavPage): void => {
    const path = PAGE_TO_PATH[newPage] ?? "/";
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { page, navigate: navigateTo };
}

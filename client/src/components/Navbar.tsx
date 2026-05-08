import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, useLang, useRouter } from "../context/index";
import { T } from "../data/translations";
import { NAVBAR_SCROLL_THRESHOLD } from "../constants/animations";
import type { Lang } from "../types";
import "../styles/navbar.css";

type NavKey = "home" | "destinations" | "blog" | "about" | "contact";
const NAV_ITEMS: NavKey[] = ["home", "destinations", "blog", "about", "contact"];
const LANGUAGES: Lang[] = ["en", "ru", "uz"];

export default function Navbar() {
  const { isDark, setIsDark } = useTheme();
  const { lang, setLang } = useLang();
  const { page, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = T[lang];

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > NAVBAR_SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent): void => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavigate = (key: NavKey): void => {
    navigate(key);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar__inner">
          <motion.button
            className="navbar__logo"
            onClick={() => handleNavigate("home")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Skyline Travel — Go to homepage"
          >
            <motion.span
              className="navbar__logo-icon"
              animate={{ rotate: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              aria-hidden="true"
            >
              ✈
            </motion.span>
            <span className="navbar__logo-text">
              Skyline <span>Travel</span>
            </span>
          </motion.button>

          <div className="navbar__links">
            {NAV_ITEMS.map((key) => (
              <motion.button
                key={key}
                className={`navbar__link ${page === key ? "active" : ""}`}
                onClick={() => handleNavigate(key)}
                whileHover={{ color: "#fff" }}
                whileTap={{ scale: 0.95 }}
                aria-current={page === key ? "page" : undefined}
              >
                {t.nav[key]}
                {page === key && (
                  <motion.div className="navbar__link-underline" layoutId="navLine" />
                )}
              </motion.button>
            ))}
          </div>

          <div className="navbar__controls">
            <div className="lang-switcher" role="group" aria-label="Select language">
              {LANGUAGES.map((langCode) => (
                <motion.button
                  key={langCode}
                  className={`lang-btn ${lang === langCode ? "active" : ""}`}
                  onClick={() => setLang(langCode)}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Switch to ${langCode.toUpperCase()}`}
                  aria-pressed={lang === langCode}
                >
                  {langCode.toUpperCase()}
                </motion.button>
              ))}
            </div>

            <motion.button
              className="theme-toggle"
              onClick={() => setIsDark(!isDark)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  aria-hidden="true"
                >
                  {isDark ? "☀️" : "🌙"}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <button
              className={`navbar__hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="mobile-drawer__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              id="mobile-drawer"
              className="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="mobile-drawer__inner">
                {NAV_ITEMS.map((key) => (
                  <button
                    key={key}
                    className={`mobile-drawer__link ${page === key ? "active" : ""}`}
                    onClick={() => handleNavigate(key)}
                    aria-current={page === key ? "page" : undefined}
                  >
                    {t.nav[key]}
                  </button>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

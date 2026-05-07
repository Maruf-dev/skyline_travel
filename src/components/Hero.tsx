import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "../context/index";
import { T } from "../data/translations";
import { POPULAR_TAGS } from "../data/content";
import {
  SCROLL_PARALLAX_BG_RANGE,
  SCROLL_PARALLAX_CONTENT_RANGE,
  PARALLAX_BG_OUTPUT,
  PARALLAX_CONTENT_Y_OUTPUT,
} from "../constants/animations";
import "../styles/hero.css";

interface SearchField {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: string;
  type?: string;
}

export default function Hero() {
  const { lang } = useLang();
  const t = T[lang];

  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const bgY         = useTransform(scrollY, SCROLL_PARALLAX_BG_RANGE, PARALLAX_BG_OUTPUT);
  const heroOpacity = useTransform(scrollY, SCROLL_PARALLAX_CONTENT_RANGE, [1, 0]);
  const heroMoveY   = useTransform(scrollY, SCROLL_PARALLAX_CONTENT_RANGE, PARALLAX_CONTENT_Y_OUTPUT);

  const [from, setFrom] = useState("");
  const [to,   setTo]   = useState("");
  const [dep,  setDep]  = useState("");
  const [ret,  setRet]  = useState("");

  const fields: SearchField[] = [
    { id: "from",   label: t.hero.from,   value: from, onChange: setFrom, placeholder: t.hero.fromP, icon: "🛫" },
    { id: "to",     label: t.hero.to,     value: to,   onChange: setTo,   placeholder: t.hero.toP,   icon: "🛬" },
    { id: "depart", label: t.hero.depart, value: dep,  onChange: setDep,  placeholder: "DD.MM.YYYY", icon: "📅", type: "date" },
    { id: "return", label: t.hero.ret,    value: ret,  onChange: setRet,  placeholder: "DD.MM.YYYY", icon: "📅", type: "date" },
  ];

  return (
    <section className="hero" ref={heroRef} aria-label="Search flights">
      <motion.div
        className="hero__bg"
        style={{
          y: bgY,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1900&auto=format&fit=crop)",
        }}
        aria-hidden="true"
      />

      <div className="hero__overlay" aria-hidden="true" />

      <motion.div
        className="hero__content"
        style={{ opacity: heroOpacity, y: heroMoveY }}
      >
        <motion.span
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t.hero.badge}
        </motion.span>

        <motion.h1
          className="hero__h1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.hero.h1}
          <br />
          <span>{t.hero.h1b}</span>
        </motion.h1>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          className="hero__tags"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          <span className="hero__tags-label">{t.hero.popular}</span>
          {POPULAR_TAGS.map((tag) => (
            <motion.button key={tag} className="hero__tag" whileTap={{ scale: 0.95 }}>
              {tag}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="search-box"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          role="search"
        >
          <div className="search-fields">
            {fields.map((field) => (
              <div key={field.id} className="search-field">
                <label htmlFor={`hero-${field.id}`} className="search-field__label">
                  <span aria-hidden="true">{field.icon}</span> {field.label}
                </label>
                <input
                  id={`hero-${field.id}`}
                  type={field.type ?? "text"}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  className="search-field__input"
                />
              </div>
            ))}
          </div>
          <motion.button
            className="search-submit"
            whileHover={{ scale: 1.02, filter: "brightness(1.08)" }}
            whileTap={{ scale: 0.97 }}
          >
            🔍 {t.hero.search}
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__scroll"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <div className="hero__scroll-line" />
        <div className="hero__scroll-dot" />
      </motion.div>
    </section>
  );
}

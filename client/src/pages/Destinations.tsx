import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/index";
import { T } from "../data/translations";
import { DESTINATIONS } from "../data/content";
import { FADE_UP } from "../constants/animations";
import DestCard from "../components/DestCard";
import SEO from "../components/SEO";
import type { Destination } from "../types";
import "../styles/cards.css";
import "../styles/pages.css";

function matchesDest(dest: Destination, query: string): boolean {
  const q = query.toLowerCase();
  return (
    dest.city.toLowerCase().includes(q) ||
    dest.country.toLowerCase().includes(q) ||
    dest.description.toLowerCase().includes(q) ||
    dest.tag.toLowerCase().includes(q)
  );
}

export default function Destinations() {
  const { lang } = useLang();
  const t = T[lang];
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filters = [
    { key: "all", label: t.filterAll },
    ...t.tags.map((tag) => ({ key: tag.toLowerCase(), label: tag })),
  ];

  const filtered = DESTINATIONS.filter((dest) => {
    const tagMatch = filter === "all" || dest.tag.toLowerCase() === filter;
    const searchMatch = query.trim() === "" || matchesDest(dest, query);
    return tagMatch && searchMatch;
  });

  return (
    <div className="page-wrapper">
      <SEO title={`${t.dest.title}${t.dest.em}`.trim()} description={t.dest.sub} />
      <div className="page-header">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.dest.title}
          <span>{t.dest.em}</span>
        </motion.h1>
        <motion.p
          className="page-header-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t.dest.sub}
        </motion.p>
      </div>

      <section className="section">
        <div className="container">
          <div className="search-bar-wrap">
            <input
              type="search"
              className="search-bar"
              placeholder={t.searchDest}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t.searchDest}
            />
          </div>

          <div className="filter-pills" role="group" aria-label="Filter destinations">
            {filters.map((filterItem) => (
              <motion.button
                key={filterItem.key}
                className={`filter-pill ${filter === filterItem.key ? "active" : ""}`}
                onClick={() => setFilter(filterItem.key)}
                layout
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                aria-pressed={filter === filterItem.key}
              >
                {filterItem.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.p
                key="no-results"
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {t.noResults}
              </motion.p>
            ) : (
              <motion.div
                key={`${filter}-${query}`}
                className="dest-grid"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32 }}
              >
                {filtered.map((destination, i) => (
                  <motion.div
                    key={destination.id}
                    custom={i}
                    variants={FADE_UP}
                    initial="hidden"
                    animate="visible"
                  >
                    <DestCard destination={destination} translations={t} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

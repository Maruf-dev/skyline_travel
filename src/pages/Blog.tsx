import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/index";
import { T } from "../data/translations";
import { BLOGS, BLOG_CATEGORIES } from "../data/content";
import { STAGGER, FADE_UP } from "../constants/animations";
import BlogCard from "../components/BlogCard";
import SEO from "../components/SEO";
import type { BlogPost } from "../types";
import "../styles/cards.css";
import "../styles/pages.css";

function matchesBlog(post: BlogPost, query: string): boolean {
  const q = query.toLowerCase();
  return (
    post.title.toLowerCase().includes(q) ||
    post.excerpt.toLowerCase().includes(q) ||
    post.cat.toLowerCase().includes(q)
  );
}

export default function Blog() {
  const { lang } = useLang();
  const t = T[lang];
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = BLOGS.filter((post) => {
    const catMatch = activeCategory === "All" || post.cat === activeCategory;
    const searchMatch = query.trim() === "" || matchesBlog(post, query);
    return catMatch && searchMatch;
  });

  return (
    <div className="page-wrapper">
      <SEO title={`${t.blog.title}${t.blog.em}`.trim()} description={t.blog.sub} />
      <div className="page-header">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.blog.title}
          <span>{t.blog.em}</span>
        </motion.h1>
        <motion.p
          className="page-header-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t.blog.sub}
        </motion.p>
      </div>

      <section className="section">
        <div className="container">
          <div className="search-bar-wrap">
            <input
              type="search"
              className="search-bar"
              placeholder={t.searchBlog}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t.searchBlog}
            />
          </div>

          <div className="filter-pills" role="group" aria-label="Filter blog posts">
            {BLOG_CATEGORIES.map((category) => (
              <motion.button
                key={category}
                className={`filter-pill ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
                layout
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                aria-pressed={activeCategory === category}
              >
                {category}
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
                key={`${activeCategory}-${query}`}
                className="blog-grid"
                variants={STAGGER}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
              >
                {filtered.map((post) => (
                  <motion.div key={post.id} variants={FADE_UP}>
                    <BlogCard post={post} translations={t} />
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

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useLang } from "../context/index";
import { T } from "../data/translations";
import { fetchBlog } from "../utils/api";
import { formatDate } from "../utils/format";
import SEO from "../components/SEO";
import PageSkeleton from "../components/PageSkeleton";
import NotFound from "./NotFound";
import type { BlogPost } from "../types";
import "../styles/pages.css";
import "../styles/cards.css";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLang();
  const t = T[lang];
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) { setNotFound(true); setLoading(false); return; }
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    fetchBlog(id)
      .then((data) => { if (!cancelled) { setPost(data); setLoading(false); } })
      .catch((err) => {
        if (!cancelled) {
          setNotFound(err.message === "not_found");
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <PageSkeleton />;
  if (notFound || !post) return <NotFound />;

  return (
    <div className="page-wrapper">
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.imgLarge ?? post.img}
        type="article"
      />
      <div
        className="detail-hero"
        style={{ backgroundImage: `url(${post.imgLarge ?? post.img})` }}
      >
        <div className="detail-hero__overlay" aria-hidden="true" />
        <div className="detail-hero__content">
          <span className="detail-hero__tag">{post.cat}</span>
          <motion.h1
            className="detail-hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {post.title}
          </motion.h1>
          <motion.p
            className="detail-hero__subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {formatDate(post.date, lang)} · {post.read} {t.readShort}
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="container blog-detail">
          <Link to="/blog" className="detail-back">← {t.allPosts}</Link>

          <p className="blog-detail__lead">{post.excerpt}</p>

          <article className="blog-detail__body">
            {post.body.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
}

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLang } from "../context/index";
import { formatDate } from "../utils/format";
import type { BlogPost } from "../types";
import type { LangTranslations } from "../data/translations";

interface BlogCardProps {
  post: BlogPost;
  translations: LangTranslations;
}

export default function BlogCard({ post, translations }: BlogCardProps) {
  const navigate = useNavigate();
  const { lang } = useLang();
  const goToDetail = (): void => { navigate(`/blog/${post.id}`); };

  const handleKey = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToDetail();
    }
  };

  return (
    <motion.div
      className="blog-card"
      whileHover={{ y: -6 }}
      onClick={goToDetail}
      onKeyDown={handleKey}
      role="link"
      tabIndex={0}
      aria-label={`Read article: ${post.title}`}
    >
      <div
        className="blog-card__img"
        style={{ backgroundImage: `url(${post.img})` }}
      >
        <span className="blog-card__cat">{post.cat}</span>
      </div>
      <div className="blog-card__body">
        <p className="blog-card__meta">{formatDate(post.date, lang)} · {post.read} {translations.readShort}</p>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <motion.button
          className="blog-card__link"
          whileHover={{ x: 4 }}
          onClick={(e) => { e.stopPropagation(); goToDetail(); }}
        >
          {translations.readMore}
        </motion.button>
      </div>
    </motion.div>
  );
}

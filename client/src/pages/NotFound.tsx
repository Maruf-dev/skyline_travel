import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLang } from "../context/index";
import { T } from "../data/translations";
import "../styles/pages.css";

export default function NotFound() {
  const { lang } = useLang();
  const t = T[lang].notFound;

  return (
    <div className="page-wrapper">
      <div className="page-header not-found">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.title} <span>{t.em}</span>
        </motion.h1>
        <motion.p
          className="page-header-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t.sub}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="not-found__cta"
        >
          <Link to="/" className="btn-primary">{t.back}</Link>
        </motion.div>
      </div>
    </div>
  );
}

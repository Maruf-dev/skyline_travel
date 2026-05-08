import { motion } from "framer-motion";
import { useLang, useRouter } from "../context/index";
import { T } from "../data/translations";
import "../styles/pages.css";

type NavKey = "home" | "destinations" | "blog" | "about" | "contact";
const NAV_ITEMS: NavKey[] = ["home", "destinations", "blog", "about", "contact"];

export default function Footer() {
  const { lang } = useLang();
  const { navigate } = useRouter();
  const t = T[lang];

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand-logo">
            <span aria-hidden="true">✈</span>
            Skyline <span>Travel</span>
          </div>
          <p className="footer__brand-tagline">{t.footer.tagline}</p>
        </div>

        <div className="footer__cols">
          <div>
            <p className="footer__col-head">{t.nav.destinations}</p>
            {NAV_ITEMS.map((key) => (
              <motion.button
                key={key}
                className="footer__col-link"
                onClick={() => navigate(key)}
                whileHover={{ color: "#38bdf8", x: 3 }}
              >
                {t.nav[key]}
              </motion.button>
            ))}
          </div>
          <div>
            <p className="footer__col-head">Skyline Travel</p>
            {(["about", "contact"] as NavKey[]).map((key) => (
              <motion.button
                key={key}
                className="footer__col-link"
                onClick={() => navigate(key)}
                whileHover={{ color: "#38bdf8", x: 3 }}
              >
                {t.nav[key]}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">{t.footer.copy}</p>
        <div className="footer__legal">
          {t.footer.links.map((link) => (
            <motion.span key={link} whileHover={{ color: "#38bdf8" }}>
              {link}
            </motion.span>
          ))}
        </div>
      </div>
    </footer>
  );
}

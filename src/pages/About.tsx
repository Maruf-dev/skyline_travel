import { motion } from "framer-motion";
import { useLang } from "../context/index";
import { T } from "../data/translations";
import { TEAM_MEMBERS } from "../data/content";
import { STAGGER, FADE_UP } from "../constants/animations";
import InView from "../components/InView";
import SEO from "../components/SEO";
import "../styles/pages.css";

export default function About() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <div className="page-wrapper">
      <SEO title={`${t.about.title}${t.about.em}`.trim()} description={t.about.p1} />
      <div className="page-header">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.about.title}
          <span>{t.about.em}</span>
        </motion.h1>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <InView delay={0}>
              <span className="section-label">{t.about.label}</span>
              <p className="about-body-text about-body-text--top">{t.about.p1}</p>
              <p className="about-body-text">{t.about.p2}</p>
              <p className="about-body-text about-body-text--last">{t.about.p3}</p>
            </InView>

            <InView delay={0.15}>
              <motion.img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=700&auto=format&fit=crop"
                alt="About Skyline Travel — our team at work"
                loading="lazy"
                decoding="async"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              />
            </InView>
          </div>

          <motion.div
            className="about-stats"
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {t.stats.map((stat, i) => (
              <motion.div key={i} className="about-stat" variants={FADE_UP} custom={i}>
                <p className="about-stat__num">{stat.n}</p>
                <p className="about-stat__label">{stat.l}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="about-team">
            <InView>
              <span className="section-label">{t.team.label}</span>
              <h2 className="section-title">
                {t.team.title} <em>{t.team.em}</em>
              </h2>
            </InView>
            <motion.div
              className="team-grid"
              variants={STAGGER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {TEAM_MEMBERS.map((member, i) => (
                <motion.div
                  key={member.name}
                  className="team-card"
                  variants={FADE_UP}
                  custom={i}
                  whileHover={{ y: -5, borderColor: "var(--accent)" }}
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="team-card__avatar"
                    loading="lazy"
                    decoding="async"
                  />
                  <p className="team-card__name">{member.name}</p>
                  <p className="team-card__role">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

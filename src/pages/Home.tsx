import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang, useRouter } from "../context/index";
import { T } from "../data/translations";
import { DESTINATIONS, DEALS, BLOGS, TESTIMONIALS } from "../data/content";
import { STAGGER, FADE_UP, SCALE_IN } from "../constants/animations";
import Hero from "../components/Hero";
import SectionHeader from "../components/SectionHeader";
import InView from "../components/InView";
import DestCard from "../components/DestCard";
import BlogCard from "../components/BlogCard";
import NewsletterForm from "../components/NewsletterForm";
import SEO from "../components/SEO";
import "../styles/cards.css";
import "../styles/pages.css";

function ParallaxQuote() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className="parallax-quote" ref={ref}>
      <motion.div
        className="parallax-quote__bg"
        style={{
          y,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&auto=format&fit=crop)",
        }}
        aria-hidden="true"
      />
      <div className="parallax-quote__overlay" aria-hidden="true" />
      <InView>
        <p className="parallax-quote__text">
          "The world is a book, and those who do not travel read only one page."
        </p>
        <p className="parallax-quote__author">— Saint Augustine</p>
      </InView>
    </section>
  );
}

export default function Home() {
  const { lang } = useLang();
  const { navigate } = useRouter();
  const t = T[lang];

  return (
    <div>
      <SEO description={t.hero.sub} />
      <Hero />

      <motion.section
        className="stats-bar"
        variants={STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {t.stats.map((stat, i) => (
          <motion.div key={i} className="stats-bar__item" variants={FADE_UP} custom={i}>
            <span className="stats-bar__num">{stat.n}</span>
            <span className="stats-bar__label">{stat.l}</span>
          </motion.div>
        ))}
      </motion.section>

      <section className="section">
        <div className="container">
          <SectionHeader label={t.dest.label} title={t.dest.title} em={t.dest.em} sub={t.dest.sub} />
          <motion.div
            className="dest-grid"
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {DESTINATIONS.slice(0, 8).map((destination, i) => (
              <motion.div key={destination.id} variants={FADE_UP} custom={i}>
                <DestCard destination={destination} translations={t} />
              </motion.div>
            ))}
          </motion.div>
          <div className="section-centered-footer">
            <InView>
              <motion.button
                className="btn-outline"
                onClick={() => navigate("destinations")}
                whileTap={{ scale: 0.96 }}
              >
                {t.allDest} →
              </motion.button>
            </InView>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionHeader label={t.deals.label} title={t.deals.title} em={t.deals.em} sub={t.deals.sub} light />
          <motion.div
            className="deals-grid"
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {DEALS.map((deal, i) => (
              <motion.div key={i} className="deal-card" variants={SCALE_IN} custom={i} whileHover={{ y: -7 }}>
                <div className="deal-card__img" style={{ backgroundImage: `url(${deal.img})` }}>
                  <span className="deal-card__save">-{deal.save}</span>
                </div>
                <div className="deal-card__body">
                  <p className="deal-card__route">{deal.from} → {deal.to}</p>
                  <p className="deal-card__meta">{deal.date} · {deal.airline}</p>
                  <div className="deal-card__footer">
                    <span className="deal-card__price">{deal.price}</span>
                    <motion.button className="btn-primary btn-primary--sm" whileTap={{ scale: 0.96 }}>
                      {t.bookNow}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHeader label={t.why.label} title={t.why.title} em={t.why.em} />
          <motion.div
            className="why-grid"
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {t.why.cards.map((card, i) => (
              <motion.div key={i} className="why-card" variants={FADE_UP} custom={i}>
                <span className="why-card__icon" aria-hidden="true">{card.ic}</span>
                <h3 className="why-card__title">{card.t}</h3>
                <p className="why-card__desc">{card.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ParallaxQuote />

      <section className="section">
        <div className="container">
          <SectionHeader label={t.blog.label} title={t.blog.title} em={t.blog.em} />
          <motion.div
            className="blog-grid"
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {BLOGS.slice(0, 3).map((post, i) => (
              <motion.div key={post.id} variants={FADE_UP} custom={i}>
                <BlogCard post={post} translations={t} />
              </motion.div>
            ))}
          </motion.div>
          <div className="section-centered-footer">
            <InView>
              <motion.button
                className="btn-outline"
                onClick={() => navigate("blog")}
                whileTap={{ scale: 0.96 }}
              >
                {t.allPosts} →
              </motion.button>
            </InView>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionHeader label={t.testi.label} title={t.testi.title} em={t.testi.em} light />
          <motion.div
            className="testi-grid"
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div key={i} className="testi-card" variants={SCALE_IN} custom={i}>
                <p className="testi-card__stars" aria-label={`${testimonial.stars} out of 5 stars`}>
                  {"★".repeat(testimonial.stars)}
                </p>
                <p className="testi-card__text">"{testimonial.text}"</p>
                <div className="testi-card__author">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="testi-card__avatar"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <p className="testi-card__name">{testimonial.name}</p>
                    <p className="testi-card__loc">{testimonial.loc} · {testimonial.trip}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section section--accent newsletter">
        <div className="container">
          <InView>
            <span className="section-label section-label--light">{t.news.label}</span>
            <h2 className="section-title section-title--light">
              {t.news.title}<em>{t.news.em}</em>
            </h2>
            <p className="section-sub section-sub--light newsletter-sub">{t.news.sub}</p>
            <NewsletterForm />
          </InView>
        </div>
      </section>
    </div>
  );
}

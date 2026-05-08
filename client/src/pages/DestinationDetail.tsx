import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useLang } from "../context/index";
import { T } from "../data/translations";
import { DESTINATIONS } from "../data/content";
import { STAGGER, FADE_UP } from "../constants/animations";
import { formatPrice } from "../utils/format";
import SEO from "../components/SEO";
import { useBooking } from "../components/BookingModal";
import NotFound from "./NotFound";
import "../styles/pages.css";
import "../styles/cards.css";

export default function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLang();
  const { openBooking } = useBooking();
  const t = T[lang];

  const destination = DESTINATIONS.find((d) => String(d.id) === id);
  if (!destination) return <NotFound />;

  const startBooking = (): void =>
    openBooking({ city: destination.city, country: destination.country, price: destination.price });

  return (
    <div className="page-wrapper">
      <SEO
        title={`${destination.city}, ${destination.country}`}
        description={destination.description}
        image={destination.imgLarge ?? destination.img}
        type="article"
      />
      <div
        className="detail-hero"
        style={{ backgroundImage: `url(${destination.imgLarge ?? destination.img})` }}
      >
        <div className="detail-hero__overlay" aria-hidden="true" />
        <div className="detail-hero__content">
          {destination.tag && (
            <span className="detail-hero__tag">{destination.tag}</span>
          )}
          <motion.h1
            className="detail-hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {destination.city}
          </motion.h1>
          <motion.p
            className="detail-hero__subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {destination.country}
          </motion.p>
        </div>
      </div>

      <section className="section">
        <div className="container detail-body">
          <div className="detail-body__main">
            <Link to="/destinations" className="detail-back">← {t.allDest}</Link>
            <p className="detail-body__lead">{destination.description}</p>

            <h2 className="detail-section-title">{t.detail.highlights}</h2>
            <motion.ul
              className="detail-highlights"
              variants={STAGGER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {destination.highlights.map((item, i) => (
                <motion.li key={item} variants={FADE_UP} custom={i}>
                  <span aria-hidden="true">✦</span> {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <aside className="detail-body__aside">
            <div className="detail-booking-card">
              <p className="detail-booking-card__from">{t.from2}</p>
              <p className="detail-booking-card__price">{formatPrice(destination.price, lang)}</p>
              <motion.button
                className="btn-primary btn-primary--full"
                whileHover={{ filter: "brightness(1.08)" }}
                whileTap={{ scale: 0.97 }}
                onClick={startBooking}
              >
                {t.bookNow}
              </motion.button>
              <p className="detail-booking-card__note">{t.detail.bookingNote}</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

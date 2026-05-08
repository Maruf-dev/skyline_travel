import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLang } from "../context/index";
import { formatPrice } from "../utils/format";
import { useBooking } from "./BookingModal";
import type { Destination } from "../types";
import type { LangTranslations } from "../data/translations";

interface DestCardProps {
  destination: Destination;
  translations: LangTranslations;
}

export default function DestCard({ destination, translations }: DestCardProps) {
  const navigate = useNavigate();
  const { lang } = useLang();
  const { openBooking } = useBooking();
  const goToDetail = (): void => { navigate(`/destinations/${destination.id}`); };
  const startBooking = (e: React.MouseEvent): void => {
    e.stopPropagation();
    openBooking({ city: destination.city, country: destination.country, price: destination.price });
  };

  const handleKey = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToDetail();
    }
  };

  return (
    <motion.div
      className="dest-card"
      whileHover={{ y: -8 }}
      onClick={goToDetail}
      onKeyDown={handleKey}
      role="link"
      tabIndex={0}
      aria-label={`View details for ${destination.city}, ${destination.country}`}
    >
      <div
        className="dest-card__img"
        style={{ backgroundImage: `url(${destination.img})` }}
      >
        {destination.tag && (
          <span className="dest-card__tag">{destination.tag}</span>
        )}
        <div className="dest-card__overlay" aria-hidden="true" />
        <div className="dest-card__info">
          <p className="dest-card__city">{destination.city}</p>
          <p className="dest-card__country">{destination.country}</p>
        </div>
      </div>
      <div className="dest-card__footer">
        <span className="dest-card__from">
          {translations.from2} <strong>{formatPrice(destination.price, lang)}</strong>
        </span>
        <motion.button
          className="dest-card__btn"
          whileTap={{ scale: 0.96 }}
          onClick={startBooking}
        >
          {translations.bookNow}
        </motion.button>
      </div>
    </motion.div>
  );
}

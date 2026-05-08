import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/index";
import { T } from "../data/translations";
import { useToast } from "./Toast";
import { formatPrice } from "../utils/format";
import { trackEvent } from "../utils/analytics";
import type { TripInfo, Lang } from "../types";

interface BookingContextValue {
  trip: TripInfo | null;
  openBooking: (trip: TripInfo) => void;
  closeBooking: () => void;
}

const BookingCtx = createContext<BookingContextValue | null>(null);

interface CopyEntry {
  title: string; to: string;
  step1: string; step2: string; step3: string;
  adults: string; children: string;
  departure: string; returnDate: string;
  summary: string; traveler: string; travelers: string;
  subtotal: string; total: string;
  next: string; back: string; confirm: string; cancel: string;
  success: string; needDates: string; returnAfterDeparture: string;
}

const COPY: Record<Lang, CopyEntry> = {
  en: {
    title: "Book your trip", to: "to",
    step1: "Travelers", step2: "Dates", step3: "Confirmation",
    adults: "Adults", children: "Children",
    departure: "Departure", returnDate: "Return",
    summary: "Summary", traveler: "traveler", travelers: "travelers",
    subtotal: "Subtotal", total: "Total",
    next: "Next", back: "Back", confirm: "Confirm booking",
    cancel: "Cancel",
    success: "Booking confirmed! Check your email.",
    needDates: "Please pick both departure and return dates.",
    returnAfterDeparture: "Return date must be after departure.",
  },
  ru: {
    title: "Забронировать поездку", to: "в",
    step1: "Путешественники", step2: "Даты", step3: "Подтверждение",
    adults: "Взрослые", children: "Дети",
    departure: "Вылет", returnDate: "Возврат",
    summary: "Сводка", traveler: "путешественник", travelers: "путешественников",
    subtotal: "Подытог", total: "Итого",
    next: "Далее", back: "Назад", confirm: "Подтвердить бронь",
    cancel: "Отмена",
    success: "Бронирование подтверждено! Проверьте почту.",
    needDates: "Выберите дату вылета и возврата.",
    returnAfterDeparture: "Дата возврата должна быть после вылета.",
  },
  uz: {
    title: "Sayohatni bron qilish", to: "ga",
    step1: "Sayohatchilar", step2: "Sanalar", step3: "Tasdiqlash",
    adults: "Kattalar", children: "Bolalar",
    departure: "Jo'nash", returnDate: "Qaytish",
    summary: "Xulosa", traveler: "sayohatchi", travelers: "sayohatchilar",
    subtotal: "Oraliq jami", total: "Jami",
    next: "Keyingi", back: "Orqaga", confirm: "Bronni tasdiqlash",
    cancel: "Bekor qilish",
    success: "Bron tasdiqlandi! Pochtangizni tekshiring.",
    needDates: "Jo'nash va qaytish sanasini tanlang.",
    returnAfterDeparture: "Qaytish sanasi jo'nashdan keyin bo'lishi kerak.",
  },
};

function parsePriceAmount(priceStr: string): number {
  const match = String(priceStr).match(/[\d,.]+/);
  if (!match) return 0;
  return Number(match[0].replace(/,/g, "")) || 0;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [trip, setTrip] = useState<TripInfo | null>(null);

  return (
    <BookingCtx.Provider value={{ trip, openBooking: setTrip, closeBooking: () => setTrip(null) }}>
      {children}
      <BookingModal trip={trip} onClose={() => setTrip(null)} />
    </BookingCtx.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingCtx);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

function BookingModal({ trip, onClose }: { trip: TripInfo | null; onClose: () => void }) {
  const { lang } = useLang();
  const { show } = useToast();
  const t = T[lang];
  const c = COPY[lang] ?? COPY.en;

  const [step, setStep] = useState(0);
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (trip) {
      setStep(0); setAdults(1); setKids(0);
      setDeparture(""); setReturnDate(""); setError("");
    }
  }, [trip]);

  useEffect(() => {
    if (!trip) return;
    const onKey = (e: KeyboardEvent): void => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [trip, onClose]);

  if (!trip) return null;

  const totalTravelers = adults + kids;
  const baseAmount = parsePriceAmount(trip.price);
  const subtotalAmount = baseAmount * adults + baseAmount * 0.6 * kids;
  const totalAmount = Math.round(subtotalAmount);
  const totalLabel = formatPrice(`$${totalAmount}`, lang);

  const handleNext = (): void => {
    setError("");
    if (step === 1) {
      if (!departure || !returnDate) { setError(c.needDates); return; }
      if (new Date(returnDate) <= new Date(departure)) { setError(c.returnAfterDeparture); return; }
    }
    setStep((s) => Math.min(s + 1, 2));
  };

  const handleBack = (): void => { setError(""); setStep((s) => Math.max(s - 1, 0)); };

  const handleConfirm = (): void => {
    trackEvent("Booking Confirmed", { destination: `${trip.city}, ${trip.country}` });
    show(c.success, { variant: "success" });
    onClose();
  };

  return (
    <AnimatePresence>
      {trip && (
        <>
          <motion.div
            className="booking-modal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className="booking-modal"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
          >
            <button className="booking-modal__close" onClick={onClose} aria-label={c.cancel}>×</button>

            <header className="booking-modal__header">
              <p className="booking-modal__eyebrow">{c.title}</p>
              <h2 id="booking-title" className="booking-modal__title">
                {c.to} {trip.city}, {trip.country}
              </h2>
              <div className="booking-modal__steps" role="list">
                {[c.step1, c.step2, c.step3].map((label, i) => (
                  <div
                    key={label}
                    className={`booking-modal__step ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}
                    role="listitem"
                  >
                    <span>{i + 1}</span> {label}
                  </div>
                ))}
              </div>
            </header>

            <div className="booking-modal__body">
              {step === 0 && (
                <div className="booking-step">
                  <div className="booking-counter">
                    <div>
                      <p className="booking-counter__label">{c.adults}</p>
                      <p className="booking-counter__hint">12+</p>
                    </div>
                    <div className="booking-counter__controls">
                      <button onClick={() => setAdults(Math.max(1, adults - 1))} aria-label="Decrease adults">−</button>
                      <span aria-live="polite">{adults}</span>
                      <button onClick={() => setAdults(Math.min(9, adults + 1))} aria-label="Increase adults">+</button>
                    </div>
                  </div>
                  <div className="booking-counter">
                    <div>
                      <p className="booking-counter__label">{c.children}</p>
                      <p className="booking-counter__hint">2–11</p>
                    </div>
                    <div className="booking-counter__controls">
                      <button onClick={() => setKids(Math.max(0, kids - 1))} aria-label="Decrease children">−</button>
                      <span aria-live="polite">{kids}</span>
                      <button onClick={() => setKids(Math.min(8, kids + 1))} aria-label="Increase children">+</button>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="booking-step">
                  <label className="booking-field">
                    <span>{c.departure}</span>
                    <input
                      type="date"
                      value={departure}
                      onChange={(e) => setDeparture(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </label>
                  <label className="booking-field">
                    <span>{c.returnDate}</span>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={departure || new Date().toISOString().split("T")[0]}
                    />
                  </label>
                  {error && <p className="contact-error" role="alert">{error}</p>}
                </div>
              )}

              {step === 2 && (
                <div className="booking-step booking-summary">
                  <h3 className="booking-summary__title">{c.summary}</h3>
                  <ul className="booking-summary__list">
                    <li><span>{c.adults}</span><span>{adults}</span></li>
                    {kids > 0 && <li><span>{c.children}</span><span>{kids}</span></li>}
                    <li><span>{c.departure}</span><span>{departure}</span></li>
                    <li><span>{c.returnDate}</span><span>{returnDate}</span></li>
                    <li>
                      <span>{totalTravelers === 1 ? c.traveler : c.travelers}</span>
                      <span>{totalTravelers}</span>
                    </li>
                  </ul>
                  <div className="booking-summary__total">
                    <span>{c.total}</span>
                    <strong>{totalLabel}</strong>
                  </div>
                </div>
              )}
            </div>

            <footer className="booking-modal__footer">
              {step > 0 ? (
                <button className="btn-outline" onClick={handleBack}>{c.back}</button>
              ) : (
                <button className="btn-outline" onClick={onClose}>{c.cancel}</button>
              )}
              {step < 2 ? (
                <button className="btn-primary" onClick={handleNext}>{c.next}</button>
              ) : (
                <button className="btn-primary" onClick={handleConfirm}>{c.confirm}</button>
              )}
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

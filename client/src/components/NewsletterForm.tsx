import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../context/index";
import { T } from "../data/translations";
import { useToast } from "./Toast";
import { trackEvent } from "../utils/analytics";
import type { Lang } from "../types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUBSCRIBED_MSG: Record<Lang, string> = {
  en: "Subscribed! Check your inbox for confirmation.",
  ru: "Подписка оформлена! Проверьте почту для подтверждения.",
  uz: "Obuna bo'ldingiz! Tasdiqlash uchun pochtangizni tekshiring.",
};

const INVALID_EMAIL_MSG: Record<Lang, string> = {
  en: "Please enter a valid email address.",
  ru: "Введите корректный email.",
  uz: "Yaroqli email manzilini kiriting.",
};

export default function NewsletterForm() {
  const { lang } = useLang();
  const { show } = useToast();
  const t = T[lang];

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email.trim())) {
      setError(INVALID_EMAIL_MSG[lang]);
      return;
    }
    setError("");
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setEmail("");
      trackEvent("Newsletter Subscribe");
      show(SUBSCRIBED_MSG[lang], { variant: "success" });
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={`newsletter__form ${error ? "newsletter__form--error" : ""}`}>
        <label htmlFor="newsletter-email" className="sr-only">{t.news.ph}</label>
        <input
          id="newsletter-email"
          className="newsletter__input"
          placeholder={t.news.ph}
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "newsletter-error" : undefined}
        />
        <motion.button
          className="newsletter__btn"
          whileHover={{ background: "#f0f9ff" }}
          whileTap={{ scale: 0.96 }}
          type="submit"
          disabled={submitting}
        >
          {submitting ? "..." : t.news.btn}
        </motion.button>
      </div>
      {error && (
        <p id="newsletter-error" className="newsletter__error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/index";
import { T } from "../data/translations";
import InView from "../components/InView";
import SEO from "../components/SEO";
import "../styles/pages.css";

interface FormState {
  name: string;
  email: string;
  subject: string;
  msg: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  msg?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim())  errors.name  = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!EMAIL_REGEX.test(form.email)) errors.email = "Enter a valid email address";
  if (!form.msg.trim())   errors.msg   = "Message is required";
  return errors;
}

export default function Contact() {
  const { lang } = useLang();
  const t = T[lang].contact;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", msg: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSent(true);
  };

  const handleReset = (): void => {
    setSent(false);
    setForm({ name: "", email: "", subject: "", msg: "" });
    setErrors({});
  };

  return (
    <div className="page-wrapper">
      <SEO title={`${t.title}${t.em}`.trim()} description={t.label} />
      <div className="page-header">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.title}
          <span>{t.em}</span>
        </motion.h1>
        <motion.p
          className="page-header-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t.label}
        </motion.p>
      </div>

      <section className="section">
        <div className="contact-grid">
          <InView delay={0}>
            <div className="contact-form-card">
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                  >
                    <div className="contact-field">
                      <label htmlFor="contact-name" className="contact-label">{t.nameP}</label>
                      <input
                        id="contact-name"
                        className={`contact-input${errors.name ? " contact-input--error" : ""}`}
                        type="text"
                        name="name"
                        placeholder={t.nameP}
                        value={form.name}
                        onChange={handleChange}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="contact-error" role="alert">{errors.name}</p>
                      )}
                    </div>

                    <div className="contact-field">
                      <label htmlFor="contact-email" className="contact-label">{t.emailP}</label>
                      <input
                        id="contact-email"
                        className={`contact-input${errors.email ? " contact-input--error" : ""}`}
                        type="email"
                        name="email"
                        placeholder={t.emailP}
                        value={form.email}
                        onChange={handleChange}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="contact-error" role="alert">{errors.email}</p>
                      )}
                    </div>

                    <div className="contact-field">
                      <label htmlFor="contact-subject" className="contact-label">{t.subP}</label>
                      <input
                        id="contact-subject"
                        className="contact-input"
                        type="text"
                        name="subject"
                        placeholder={t.subP}
                        value={form.subject}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="contact-field">
                      <label htmlFor="contact-msg" className="contact-label">{t.msgP}</label>
                      <textarea
                        id="contact-msg"
                        className={`contact-input contact-textarea${errors.msg ? " contact-input--error" : ""}`}
                        name="msg"
                        placeholder={t.msgP}
                        value={form.msg}
                        onChange={handleChange}
                        aria-describedby={errors.msg ? "msg-error" : undefined}
                      />
                      {errors.msg && (
                        <p id="msg-error" className="contact-error" role="alert">{errors.msg}</p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      className="btn-primary btn-primary--full"
                      whileHover={{ filter: "brightness(1.08)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {t.send}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="contact-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <motion.div
                      className="contact-success__icon"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      aria-hidden="true"
                    >
                      ✅
                    </motion.div>
                    <p className="contact-success__title">{T[lang].contactSuccess.title}</p>
                    <p className="contact-success__sub">{T[lang].contactSuccess.sub}</p>
                    <motion.button
                      className="btn-outline contact-success__btn"
                      onClick={handleReset}
                      whileTap={{ scale: 0.96 }}
                    >
                      {T[lang].contactSuccess.another}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </InView>

          <InView delay={0.15}>
            <div>
              <h3 className="contact-info-title">{t.infoTitle}</h3>
              {t.info.map((item, i) => {
                const [icon, text] = item.split("  ");
                return (
                  <motion.div
                    key={i}
                    className="contact-info-item"
                    whileHover={{ borderColor: "var(--accent)", x: 4 }}
                  >
                    <span className="contact-info-icon" aria-hidden="true">{icon}</span>
                    <span>{text}</span>
                  </motion.div>
                );
              })}

              <div className="contact-map">
                <iframe
                  title="Skyline Travel Office Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=69.2%2C41.27%2C69.35%2C41.35&layer=mapnik"
                  loading="lazy"
                  aria-label="Map showing Skyline Travel office in Tashkent"
                />
              </div>
            </div>
          </InView>
        </div>
      </section>
    </div>
  );
}

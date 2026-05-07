import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/index";
import type { Lang } from "../types";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const COPY: Record<Lang, { msg: string; install: string; dismiss: string }> = {
  en: { msg: "Install Skyline Travel for a faster, offline-ready experience.", install: "Install", dismiss: "Not now" },
  ru: { msg: "Установите Skyline Travel для быстрой работы и доступа офлайн.",  install: "Установить", dismiss: "Не сейчас" },
  uz: { msg: "Skyline Travel'ni tezroq va oflayn ishlash uchun o'rnating.",      install: "O'rnatish",  dismiss: "Keyinroq" },
};

const STORAGE_KEY = "pwa-prompt-dismissed";

export default function InstallPrompt() {
  const { lang } = useLang();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async (): Promise<void> => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setVisible(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = (): void => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  const c = COPY[lang] ?? COPY.en;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="install-prompt"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Install app"
        >
          <p className="install-prompt__msg">{c.msg}</p>
          <div className="install-prompt__actions">
            <button className="btn-outline install-prompt__dismiss" onClick={handleDismiss}>
              {c.dismiss}
            </button>
            <button className="btn-primary" onClick={() => void handleInstall()}>
              {c.install}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import type { Variants } from "framer-motion";

export const STAGGER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const SCALE_IN: Variants = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: (i: number = 0) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const EASE: number[] = [0.22, 1, 0.36, 1];

export const SCROLL_PARALLAX_BG_RANGE: [number, number]           = [0, 700];
export const SCROLL_PARALLAX_CONTENT_RANGE: [number, number]      = [0, 450];
export const PARALLAX_BG_OUTPUT: [string, string]                 = ["0%", "22%"];
export const PARALLAX_CONTENT_Y_OUTPUT: [number, number]          = [0, -55];

export const NAVBAR_SCROLL_THRESHOLD = 45;

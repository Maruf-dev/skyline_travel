import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FADE_UP } from "../constants/animations";

interface InViewProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function InView({ children, delay = 0, className = "" }: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-55px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      custom={delay}
      variants={FADE_UP}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

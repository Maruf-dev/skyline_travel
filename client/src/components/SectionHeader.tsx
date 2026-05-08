import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  em: string;
  sub?: string;
  light?: boolean;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function SectionHeader({ label, title, em, sub, light = false }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-55px" });

  return (
    <div className="section-header" ref={ref}>
      <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
        <span className={`section-label ${light ? "section-label--light" : ""}`}>
          {label}
        </span>
        <h2 className={`section-title ${light ? "section-title--light" : ""}`}>
          {title}
          <em>{em}</em>
        </h2>
        {sub && (
          <p className={`section-sub ${light ? "section-sub--light" : ""}`}>{sub}</p>
        )}
      </motion.div>
    </div>
  );
}

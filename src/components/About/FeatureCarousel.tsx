"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Signature,
  FileSearchCorner,
  ChartNoAxesColumnDecreasing,
  FileStack,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppIcon } from "@/components/shared/app-icon/AppIcon";
import styles from "./About.module.scss";

export const AUTOPLAY_MS = 5000;

export interface Slide {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const slides: Slide[] = [
  {
    icon: Signature,
    title: "Contracts",
    text: "Say farewell to the complexities of manual contract evaluations! Our advanced solution streamlines the review of terms and clauses, enhancing your workflow.",
  },
  {
    icon: FileStack,
    title: "Bulk extraction",
    text: "Remove the burden of extracting data from multiple documents! Our cutting-edge solution automates the whole process, allowing you to gather information efficiently in bulk.",
  },
  {
    icon: FileSearchCorner,
    title: "Search content",
    text: "Fed up with digging through countless files? Our state-of-the-art tool simplifies finding information by letting you search for specific keywords and phrases.",
  },
  {
    icon: ChartNoAxesColumnDecreasing,
    title: "Data analysis",
    text: "Wave goodbye to the monotonous task of manual document handling! Our groundbreaking solution automates the entire procedure, enabling you to optimize your processes.",
  },
];

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

interface FeatureCarouselProps {
  active: number;
  tick: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
}

export function FeatureCarousel({ active, tick, onPrev, onNext, onGoTo }: FeatureCarouselProps) {
  const [contentHeight, setContentHeight] = useState<number | "auto">("auto");
  const contentRef = useRef<HTMLDivElement>(null);
  const slide = slides[active];

  // Measure content height after slide change
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, [active]);

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.cardHeader}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className={styles.cardHeaderLeft}
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <AppIcon icon={slide.icon} bare />
            <span className={styles.cardTitle}>{slide.title}</span>
          </motion.div>
        </AnimatePresence>
        <div className={styles.cardNav}>
          <button className={styles.navButton} onClick={onPrev}>
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          <button className={styles.navButton} onClick={onNext}>
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <motion.div
        animate={{ height: contentHeight }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ overflow: "hidden", position: "relative" }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            ref={contentRef}
            className={styles.cardText}
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {slide.text}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <div
        className={styles.dots}
        style={
          { "--autoplay-duration": `${AUTOPLAY_MS}ms` } as React.CSSProperties
        }
      >
        {slides.map((_, i) => (
          <span
            key={`${i}-${i === active ? tick : ""}`}
            className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
            onClick={() => onGoTo(i)}
          />
        ))}
      </div>
    </motion.div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
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

const AUTOPLAY_MS = 5000;

interface Slide {
  icon: LucideIcon;
  title: string;
  text: string;
}

const slides: Slide[] = [
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

export function FeatureCarousel() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const slide = slides[active];

  const goTo = useCallback((i: number) => {
    setActive(i);
    setTick((t) => t + 1);
  }, []);

  const prev = () => goTo(active === 0 ? slides.length - 1 : active - 1);
  const next = () => goTo(active === slides.length - 1 ? 0 : active + 1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((i) => (i === slides.length - 1 ? 0 : i + 1));
      setTick((t) => t + 1);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [active, tick]);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderLeft}>
          <AppIcon icon={slide.icon} bare />
          <span className={styles.cardTitle}>{slide.title}</span>
        </div>
        <div className={styles.cardNav}>
          <button className={styles.navButton} onClick={prev}>
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          <button className={styles.navButton} onClick={next}>
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <p className={styles.cardText}>{slide.text}</p>

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
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

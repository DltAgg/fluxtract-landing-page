"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, FileStack, Scroll, FileSearchIcon, Signature } from "lucide-react";
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
    icon: FileStack,
    title: "Contracts",
    text: "Say goodbye to tedious manual document processing! Our innovative solution automates the entire process, allowing you to streamline.",
  },
  {
    icon: Scroll,
    title: "Bulk extraction",
    text: "Eliminate the stress of pulling data from various documents! Our innovative solution automates the entire process, allowing you to efficiently collect information in bulk.",
  },
  {
    icon: FileSearchIcon,
    title: "Search by words",
    text: "Tired of sifting through endless documents? Our cutting-edge solution makes it easy to locate information by simply searching for specific keywords and phrases.",
  },
  {
    icon: Signature,
    title: "Data analysis",
    text: "Say goodbye to tedious manual document processing! Our innovative solution automates the entire process, allowing you to streamline.",
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
        style={{ "--autoplay-duration": `${AUTOPLAY_MS}ms` } as React.CSSProperties}
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

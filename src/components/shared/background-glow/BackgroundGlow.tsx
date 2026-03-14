"use client";

import { useState, useEffect } from "react";
import styles from "./background-glow.module.scss";
import { GlowOrb } from "./glow-orb/GlowOrb";

const sectionIds = ["home", "about", "how-it-works", "templates", "pricing", "footer"];

export function BackgroundGlow() {
  const [section, setSection] = useState("home");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setSection(id);
        },
        { rootMargin: "-50% 0px -50% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const sectionClass = styles[`section_${section.replace("-", "_")}`] ?? "";

  return (
    <div className={styles.backgroundGlow} aria-hidden="true">
      <div className={`${styles.orbA} ${sectionClass}`}>
        <GlowOrb
          color="rgba(240, 106, 65, 0.22)"
          width={1000}
          height={900}
          style={{ animationDelay: "0s" }}
        />
      </div>
      <div className={`${styles.orbB} ${sectionClass}`}>
        <GlowOrb
          color="rgba(200, 50, 20, 0.16)"
          width={900}
          height={900}
          style={{ animationDelay: "3s" }}
        />
      </div>
    </div>
  );
}

"use client";

import styles from "./Hero.module.scss";
import { useEffect, useState, useCallback } from "react";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { CtaButton } from "@/components/shared/cta-button/CtaButton";
import { SectionBadge } from "@/components/shared/section-badge/SectionBadge";
import { AppIcon } from "@/components/shared/app-icon/AppIcon";
import { Signature, FileStack, FileSearchCorner, ChartNoAxesColumnDecreasing } from "lucide-react";

export function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const scrollToAboutSlide = useCallback((slideIndex: number) => {
    const about = document.getElementById("about");
    if (about) {
      about.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.dispatchEvent(new CustomEvent("about-slide", { detail: slideIndex }));
  }, []);

  const vis = visible ? styles.fadeVisible : styles.fadeHidden;

  return (
    <PageSlot id="home" dottedBg>
      <section className={styles.hero}>
      <div className={`${visible ? styles.iconsVisible : styles.iconsHidden}`}>
        <AppIcon icon={Signature} position="topLeft" label="Contracts" onClick={() => scrollToAboutSlide(0)} />
        <AppIcon icon={FileStack} position="topRight" label="Bulk extraction" onClick={() => scrollToAboutSlide(1)} />
        <AppIcon icon={FileSearchCorner} position="bottomLeft" label="Search content" onClick={() => scrollToAboutSlide(2)} />
        <AppIcon icon={ChartNoAxesColumnDecreasing} position="bottomRight" label="Data analysis" onClick={() => scrollToAboutSlide(3)} />
      </div>

      <div className={styles.content}>
        <div className={`${vis} ${styles.fadeDelay1}`}>
          <SectionBadge label="Powered by AI" />
        </div>

        <h1 className={`${styles.headline} ${vis} ${styles.fadeDelay2}`}>
          All your documents structured. Instantly.
        </h1>

        <p className={`${styles.subheadline} ${vis} ${styles.fadeDelay3}`}>
          Extract, analyse, and structure data from any document — delivered to any channel, automatically.
        </p>

        <div className={`${styles.actions} ${vis} ${styles.fadeDelay4}`}>
          <CtaButton label="Get early access" />

          <button className={styles.secondaryCta}>
            See how it works
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>
      </section>
    </PageSlot>
  );
}

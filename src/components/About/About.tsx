"use client";

import { useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLayout } from "@/components/shared/section-layout/SectionLayout";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { AppIcon } from "@/components/shared/app-icon/AppIcon";
import { CursorTooltip } from "@/components/shared/cursor-tooltip/CursorTooltip";
import { FeatureCarousel, slides, AUTOPLAY_MS } from "./FeatureCarousel";
import styles from "./About.module.scss";

const iconItems = [
  { imageSrc: "/svg-icons/pdf.svg", label: "PDF" },
  { imageSrc: "/svg-icons/whatsapp.svg", label: "WhatsApp" },
  { imageSrc: "/svg-icons/excel.svg", label: "Excel" },
  { imageSrc: "/svg-icons/word.svg", label: "Word" },
  { imageSrc: "/svg-icons/gmail.svg", label: "Gmail" },
];

const illustrations = [
  "/illustrations/contract.svg",
  "/illustrations/bulk-extraction.svg",
  "/illustrations/search-content.svg",
  "/illustrations/data-analysis.svg",
];

const illustrationVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

export function About() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  const goTo = useCallback((i: number) => {
    setActive(i);
    setTick((t) => t + 1);
  }, []);

  const prev = useCallback(() => {
    goTo(active === 0 ? slides.length - 1 : active - 1);
  }, [active, goTo]);

  const next = useCallback(() => {
    goTo(active === slides.length - 1 ? 0 : active + 1);
  }, [active, goTo]);

  // Single autoplay timer — shared by all carousel instances
  useEffect(() => {
    const timer = setTimeout(() => {
      goTo(active === slides.length - 1 ? 0 : active + 1);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [active, tick, goTo]);

  // Listen for Hero icon clicks
  useEffect(() => {
    const handler = (e: Event) => {
      const index = (e as CustomEvent<number>).detail;
      if (index >= 0 && index < slides.length) goTo(index);
    };
    window.addEventListener("about-slide", handler);
    return () => window.removeEventListener("about-slide", handler);
  }, [goTo]);

  const carouselProps = { active, tick, onPrev: prev, onNext: next, onGoTo: goTo };

  const illustrationPanel = (
    <div className={styles.illustrationWrapper}>
      <AnimatePresence mode="wait">
        <motion.img
          key={active}
          src={illustrations[active]}
          alt=""
          className={styles.folderIllustration}
          variants={illustrationVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </AnimatePresence>
    </div>
  );

  const iconRowContent = (
    <div className={styles.iconRow}>
      {iconItems.map((item, i) => (
        <motion.div
          key={item.imageSrc}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
        >
          <AppIcon imageSrc={item.imageSrc} label={item.label} />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: iconItems.length * 0.12 }}
      >
        <CursorTooltip label="soon...">
          <span className={styles.otherSources}>+ other sources</span>
        </CursorTooltip>
      </motion.div>
    </div>
  );

  return (
    <div id="about">
      <SectionLayout sectionName="about" />

      {/* Desktop */}
      <div className={styles.desktop}>
        <div className={styles.columns}>
          <div className={styles.columnLeft}>
            <PageSlot
              dottedBg
              noPadding
              hideSideRight
              intersections={["bottomLeft", "bottomRight"]}
            >
              <div className={styles.iconRowPadded}>{iconRowContent}</div>
            </PageSlot>
            <PageSlot noPadding hideSideRight intersections={[]}>
              <div className={styles.carouselPadded}>
                <FeatureCarousel {...carouselProps} />
              </div>
            </PageSlot>
          </div>
          <div className={styles.columnRight}>
            {illustrationPanel}
            <PageSlot dividerBottom dottedBg hideSideLeft />
            <PageSlot noPadding hideSideLeft intersections={[]}>
              <div className={styles.orangePanel} />
            </PageSlot>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className={styles.mobile}>
        <PageSlot dottedBg noPadding>
          <div className={styles.mobileIconRow}>{iconRowContent}</div>
        </PageSlot>
        <PageSlot dividerTop>
          <FeatureCarousel {...carouselProps} />
        </PageSlot>
        <div className={styles.mobileIllustrationArea}>
          {illustrationPanel}
          <PageSlot dividerTop dividerBottom dottedBg>
            <div className={styles.mobileEmpty} />
          </PageSlot>
          <PageSlot noPadding>
            <div className={styles.orangePanelMobile} />
          </PageSlot>
        </div>
      </div>
    </div>
  );
}

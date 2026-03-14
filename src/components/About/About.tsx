"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLayout } from "@/components/shared/section-layout/SectionLayout";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { AppIcon } from "@/components/shared/app-icon/AppIcon";
import { FeatureCarousel } from "./FeatureCarousel";
import styles from "./About.module.scss";

const iconItems = [
  { imageSrc: "/svg-icons/pdf.svg" },
  { imageSrc: "/svg-icons/whatsapp.svg" },
  { imageSrc: "/svg-icons/excel.svg" },
  { imageSrc: "/svg-icons/word.svg" },
  { imageSrc: "/svg-icons/gmail.svg" },
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
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  const illustrationPanel = (
    <div className={styles.illustrationWrapper}>
      <AnimatePresence mode="wait">
        <motion.img
          key={activeSlide}
          src={illustrations[activeSlide]}
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
          <AppIcon imageSrc={item.imageSrc} />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: iconItems.length * 0.12 }}
      >
        <span className={styles.otherSources}>+ other sources</span>
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
                <FeatureCarousel onSlideChange={handleSlideChange} />
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
          <FeatureCarousel onSlideChange={handleSlideChange} />
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

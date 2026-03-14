"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./section-layout.module.scss";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { SectionBadge } from "@/components/shared/section-badge/SectionBadge";
import { sectionContent, type SectionName } from "./section-content";

interface SectionLayoutProps {
  sectionName: SectionName;
  children?: React.ReactNode;
  id?: string;
}

export function SectionLayout({ sectionName, children, id }: SectionLayoutProps) {
  const { badge, headline, subheadline } = sectionContent[sectionName];
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-100px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const vis = visible ? styles.fadeVisible : styles.fadeHidden;

  return (
    <PageSlot dividerTop dividerBottom id={id}>
      <section className={styles.section} ref={sectionRef}>
        <div className={styles.header}>
          <div className={`${vis} ${styles.fadeDelay1}`}>
            <SectionBadge label={badge} />
          </div>
          <h2 className={`${styles.headline} ${vis} ${styles.fadeDelay2}`}>{headline}</h2>
          <p className={`${styles.subheadline} ${vis} ${styles.fadeDelay3}`}>{subheadline}</p>
        </div>

        {children && (
          <div className={`${styles.body} ${vis} ${styles.fadeDelay4}`}>{children}</div>
        )}
      </section>
    </PageSlot>
  );
}

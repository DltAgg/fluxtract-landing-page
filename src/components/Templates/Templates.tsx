"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "motion/react";
import { SectionLayout } from "@/components/shared/section-layout/SectionLayout";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import {
  FileText,
  Contact,
  ChevronRight,
  Receipt,
  Briefcase,
  FileCheck,
} from "lucide-react";
import styles from "./Templates.module.scss";

const templateCards = [
  {
    icon: FileText,
    title: "Resumes",
    description:
      "Analyze curricula, extract valuable information, and organize data in a clear and structured way",
  },
  {
    icon: Contact,
    title: "Get contact info",
    description:
      "Examine documents, extract essential contact details, and arrange the information in a clear and structured format.",
  },
  {
    icon: FileText,
    title: "Real estate contracts",
    description:
      "Review real estate contracts, gather essential details, and arrange the information in a clear and systematic manner.",
  },
  {
    icon: Receipt,
    title: "Invoices",
    description:
      "Process invoices automatically, extract line items, totals, and vendor details into structured data.",
  },
  {
    icon: Briefcase,
    title: "Business reports",
    description:
      "Parse business reports, extract key metrics, and organize findings into actionable summaries.",
  },
  {
    icon: FileCheck,
    title: "Legal documents",
    description:
      "Analyze legal documents, identify key clauses, and structure the information for quick review.",
  },
];

const CARD_WIDTH = 397;
const GAP = 30;
const SPEED = 0.5;

export function Templates() {
  const setWidth = templateCards.length * (CARD_WIDTH + GAP);
  const baseX = useMotionValue(0);
  const isDragging = useRef(false);

  useAnimationFrame(() => {
    if (isDragging.current) return;
    let next = baseX.get() - SPEED;
    if (next <= -setWidth) next += setWidth;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => {
    // wrap into [-setWidth, 0]
    return ((v % setWidth) + setWidth) % setWidth === 0
      ? 0
      : ((v % setWidth) + setWidth) % setWidth - setWidth;
  });

  return (
    <>
      <SectionLayout sectionName="templates" id="templates" />
      <PageSlot dividerBottom noPadding>
        <div className={styles.carouselWrapper}>
          <motion.div
            className={styles.cardRow}
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -setWidth, right: 0 }}
            dragElastic={0.1}
            onDragStart={() => {
              isDragging.current = true;
            }}
            onDragEnd={() => {
              isDragging.current = false;
              // wrap position
              const cur = baseX.get();
              const wrapped =
                ((cur % setWidth) + setWidth) % setWidth === 0
                  ? 0
                  : ((cur % setWidth) + setWidth) % setWidth - setWidth;
              baseX.set(wrapped);
            }}
          >
            {[...templateCards, ...templateCards, ...templateCards].map(
              (card, index) => {
                const Icon = card.icon;
                return (
                  <div key={index} className={styles.card}>
                    <Icon className={styles.icon} />
                    <h3 className={styles.title}>{card.title}</h3>
                    <p className={styles.description}>{card.description}</p>
                    <a href="#" className={styles.link}>
                      Get template <ChevronRight size={20} />
                    </a>
                    <div className={styles.decorativeCircle} />
                  </div>
                );
              }
            )}
          </motion.div>
        </div>
      </PageSlot>
    </>
  );
}

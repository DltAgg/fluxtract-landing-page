"use client";

import { useRef } from "react";
import { motion, useMotionValue } from "motion/react";
import { SectionLayout } from "@/components/shared/section-layout/SectionLayout";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { Workflow, ChevronRight } from "lucide-react";
import styles from "./Templates.module.scss";

const templateCards = [
  {
    title: "Resumes",
    description:
      "Extract key information from resumes, such as skills, experience, and education, and organize this data in a clear and structured format.",
  },
  {
    title: "Get contact info",
    description:
      "Collect and extract key contact information from documents, organizing it in a clear and structured format.",
  },
  {
    title: "Real estate contracts",
    description:
      "Analyze real estate contracts by examining key clauses, identifying potential risks, and summarizing the findings in an organized format.",
  },
  {
    title: "Summarize PDF",
    description:
      "Create concise summaries of PDF documents, extracting key points and organizing the information clearly and systematically.",
  },
];

const CARD_WIDTH = 397;
const GAP = 24;

export function Templates() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const totalWidth = templateCards.length * (CARD_WIDTH + GAP) - GAP;

  return (
    <>
      <SectionLayout sectionName="templates" id="templates" />
      <PageSlot noPadding dottedBg>
        <div ref={wrapperRef} className={styles.carouselWrapper}>
          <motion.div
            className={styles.cardRow}
            style={{ x }}
            drag="x"
            dragConstraints={wrapperRef}
            dragElastic={0.15}
          >
            {templateCards.map((card, index) => (
              <div key={index} className={styles.card}>
                <svg
                  width="0"
                  height="0"
                  style={{ position: "absolute" }}
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id={`tpl-grad-${index}`}
                      gradientUnits="userSpaceOnUse"
                      x1="0"
                      y1="0"
                      x2="30"
                      y2="30"
                    >
                      <stop offset="3%" stopColor="#ecbc91" />
                      <stop offset="20%" stopColor="#d17d47" />
                      <stop offset="80%" stopColor="#af3825" />
                    </linearGradient>
                  </defs>
                </svg>
                <Workflow
                  className={styles.icon}
                  stroke={`url(#tpl-grad-${index})`}
                />
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.description}>{card.description}</p>
                <a href="#" className={styles.link}>
                  Get template <ChevronRight size={20} />
                </a>
                <Workflow className={styles.bgIcon} />
                <div className={styles.decorativeCircle} />
              </div>
            ))}
          </motion.div>
        </div>
      </PageSlot>
    </>
  );
}

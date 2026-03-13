"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { SectionLayout } from "@/components/shared/section-layout/SectionLayout";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { Check } from "lucide-react";
import styles from "./HowItWorks.module.scss";

function usePipelineArrows(
  containerRef: React.RefObject<HTMLDivElement | null>,
  inputPillRef: React.RefObject<HTMLDivElement | null>,
  processingPillRef: React.RefObject<HTMLDivElement | null>,
  outputPillRef: React.RefObject<HTMLDivElement | null>,
) {
  const [paths, setPaths] = useState({ d1: "", arrow1: "", d2: "", arrow2: "" });

  const measure = useCallback(() => {
    const container = containerRef.current;
    const input = inputPillRef.current;
    const processing = processingPillRef.current;
    const output = outputPillRef.current;
    if (!container || !input || !processing || !output) return;

    const cr = container.getBoundingClientRect();
    const ir = input.getBoundingClientRect();
    const pr = processing.getBoundingClientRect();
    const or2 = output.getBoundingClientRect();

    const margin = 20;

    // Path 1: right side of Input → right side of Processing
    const x1Start = ir.right - cr.left;
    const y1Start = ir.top + ir.height / 2 - cr.top;
    const x1End = pr.right - cr.left;
    const y1End = pr.top + pr.height / 2 - cr.top;

    // Horizontal lines + semicircle connecting their ends
    const x1Far = Math.max(x1Start, x1End) + margin;
    const r1 = (y1End - y1Start) / 2;
    // Line from Input → far, semicircle arc down, line back to Processing
    const d1 = `M ${x1Start} ${y1Start} L ${x1Far} ${y1Start} A ${r1} ${r1} 0 0 1 ${x1Far} ${y1End} L ${x1End} ${y1End}`;
    const chevronSize = 6;
    const arrow1 = `${x1End + chevronSize},${y1End - chevronSize} ${x1End},${y1End} ${x1End + chevronSize},${y1End + chevronSize}`;

    // Path 2: left side of Processing → left side of Output
    const x2Start = pr.left - cr.left;
    const y2Start = pr.top + pr.height / 2 - cr.top;
    const x2End = or2.left - cr.left;
    const y2End = or2.top + or2.height / 2 - cr.top;

    const x2Far = Math.min(x2Start, x2End) - margin;
    const r2 = (y2End - y2Start) / 2;
    // Line from Processing left → far left, semicircle arc down, line back to Output
    const d2 = `M ${x2Start} ${y2Start} L ${x2Far} ${y2Start} A ${r2} ${r2} 0 0 0 ${x2Far} ${y2End} L ${x2End} ${y2End}`;
    const arrow2 = `${x2End - chevronSize},${y2End - chevronSize} ${x2End},${y2End} ${x2End - chevronSize},${y2End + chevronSize}`;

    setPaths({ d1, arrow1, d2, arrow2 });
  }, [containerRef, inputPillRef, processingPillRef, outputPillRef]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, containerRef]);

  return paths;
}

export function HowItWorks() {
  const pipelineRef = useRef<HTMLDivElement>(null);
  const inputPillRef = useRef<HTMLDivElement>(null);
  const processingPillRef = useRef<HTMLDivElement>(null);
  const outputPillRef = useRef<HTMLDivElement>(null);

  const { d1, arrow1, d2, arrow2 } = usePipelineArrows(
    pipelineRef,
    inputPillRef,
    processingPillRef,
    outputPillRef,
  );

  return (
    <>
      <SectionLayout sectionName="how-it-works" id="how-it-works" />
      <PageSlot>
        {/* <PageSlot dividerTop dividerBottom> */}
        <div className={styles.grid}>
          {/* ── Left column ──────────────────────────────── */}
          <div className={styles.colLeft}>
            {/* Hero card */}
            <div className={styles.cardHero}>
              <p className={styles.cardHeroText}>
                Transform files into real structured data
              </p>
              <img
                src="/illustrations/folder.svg"
                alt=""
                className={styles.cardHeroIllustration}
              />
            </div>

            {/* Bottom row: quote + notifications */}
            <div className={styles.bottomRow}>
              <div className={styles.cardQuote}>
                <span className={styles.quoteMark}>&ldquo;</span>
                <p className={styles.cardQuoteText}>
                  Integrates seamlessly into your workflow with minimal effort
                </p>
              </div>

              <div className={styles.cardNotifications}>
                <div className={styles.notifStack}>
                  {/* Ghost copies */}
                  <div className={`${styles.featuredNotif} ${styles.featuredNotifGhost} ${styles.featuredNotifGhostTop}`}>
                    <span className={`${styles.featuredNotifIcon} ${styles.featuredNotifIconGhost}`} />
                    <div className={styles.featuredNotifContent}>
                      <span className={styles.featuredNotifTextGhost}>
                        24 emails analized!
                      </span>
                      <span className={styles.featuredNotifTextGhost}>
                        Check insights
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.featuredNotif} ${styles.featuredNotifGhost} ${styles.featuredNotifGhostMid}`}>
                    <span className={`${styles.featuredNotifIcon} ${styles.featuredNotifIconGhost}`} />
                    <div className={styles.featuredNotifContent}>
                      <span className={styles.featuredNotifTextGhost}>
                        24 emails analized!
                      </span>
                      <span className={styles.featuredNotifTextGhost}>
                        Check insights
                      </span>
                    </div>
                  </div>

                  {/* Original */}
                  <div className={styles.featuredNotif}>
                    <span className={styles.featuredNotifIcon}>
                      <Check />
                    </span>
                    <div className={styles.featuredNotifContent}>
                      <span className={styles.featuredNotifText}>
                        24 emails analized!
                      </span>
                      <span className={styles.featuredNotifAction}>
                        Check insights
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column ─────────────────────────────── */}
          <div className={styles.colRight}>
            {/* Gradient card */}
            <div className={styles.cardGradient}>
              <p className={styles.cardGradientText}>
                Accelerate and <span className={styles.light}>simplify</span>{" "}
                your workflow
              </p>
            </div>

            {/* Pipeline card */}
            <div ref={pipelineRef} className={styles.cardPipeline}>
              {/* Input stage */}
              <div className={styles.pipelineStageInput}>
                <div ref={inputPillRef} className={styles.pill}>
                  <span className={styles.pillLabel}>Input</span>
                  <span className={styles.pillIcons}>
                    <img src="/svg-icons/whatsapp.svg" alt="WhatsApp" />
                    <img src="/svg-icons/pdf-2.svg" alt="PDF" />
                    <img src="/svg-icons/excel.svg" alt="Excel" />
                  </span>
                </div>
              </div>

              {/* Processing stage */}
              <div className={styles.pipelineStageProcessing}>
                <div ref={processingPillRef} className={styles.pill}>
                  <span className={styles.pillLabel}>Processing</span>
                  <span className={styles.processingSpinner}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <defs>
                        <linearGradient id="spinnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="3%" stopColor="#ecbc91" />
                          <stop offset="20%" stopColor="#d17d47" />
                          <stop offset="80%" stopColor="#af3825" />
                        </linearGradient>
                      </defs>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" stroke="url(#spinnerGrad)" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Output stage */}
              <div className={styles.pipelineStageOutput}>
                <div ref={outputPillRef} className={styles.pill}>
                  <span className={styles.pillLabel}>Output</span>
                  <span className={styles.pillIcons}>
                    <img src="/svg-icons/slack.svg" alt="Slack" />
                    <img src="/svg-icons/salesforce.svg" alt="Salesforce" />
                    <img src="/svg-icons/outlook.svg" alt="Outlook" />
                  </span>
                </div>
              </div>

              {/* Dashed arrows */}
              {d1 && (
                <div className={styles.arrowsContainer}>
                  <svg className={styles.arrowsSvg}>
                    <path
                      d={d1}
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="1.8"
                      strokeDasharray="5 4"
                      fill="none"
                    />
                    <polyline
                      points={arrow1}
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d={d2}
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="1.8"
                      strokeDasharray="5 4"
                      fill="none"
                    />
                    <polyline
                      points={arrow2}
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageSlot>
    </>
  );
}

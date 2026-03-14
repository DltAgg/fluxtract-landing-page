"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { SectionLayout } from "@/components/shared/section-layout/SectionLayout";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { Check } from "lucide-react";
import styles from "./HowItWorks.module.scss";

const TILT_CARD = 15;
const INNER_SHIFT = 20;

function TiltCard({
  className,
  children,
  externalRef,
  ...motionProps
}: {
  className?: string;
  children: React.ReactNode;
  externalRef?: React.RefObject<HTMLDivElement | null>;
} & Omit<React.ComponentProps<typeof motion.div>, "ref">) {
  const internalRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 20 };
  const springX = useSpring(rotateX, springConfig);
  const springY = useSpring(rotateY, springConfig);

  const setRefs = useCallback((node: HTMLDivElement | null) => {
    (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (externalRef) {
      (externalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  }, [externalRef]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = internalRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * TILT_CARD);
    rotateY.set(x * TILT_CARD);

    // Set glow position
    const pxX = e.clientX - rect.left;
    const pxY = e.clientY - rect.top;
    el.style.setProperty("--glow-x", `${pxX}px`);
    el.style.setProperty("--glow-y", `${pxY}px`);
    el.dataset.hovered = "true";

    const kids = el.children;
    for (let i = 0; i < kids.length; i++) {
      const child = kids[i] as HTMLElement;
      if (child.dataset.glow) continue;
      child.style.transform = `translate3d(${x * INNER_SHIFT}px, ${y * INNER_SHIFT}px, 40px)`;
    }
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    const el = internalRef.current;
    if (!el) return;
    el.dataset.hovered = "false";

    const kids = el.children;
    for (let i = 0; i < kids.length; i++) {
      const child = kids[i] as HTMLElement;
      if (child.dataset.glow) continue;
      child.style.transform = "";
    }
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={setRefs}
      className={className}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

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
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-200px" });

  const cardAnim = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  });

  const { d1, arrow1, d2, arrow2 } = usePipelineArrows(
    pipelineRef,
    inputPillRef,
    processingPillRef,
    outputPillRef,
  );

  return (
    <div id="how-it-works">
      <SectionLayout sectionName="how-it-works" />
      <PageSlot dottedBg>
        {/* <PageSlot dividerTop dividerBottom> */}
        <div ref={gridRef} className={styles.grid}>
          {/* ── Left column ──────────────────────────────── */}
          <div className={styles.colLeft}>
            {/* Hero card */}
            <TiltCard className={styles.cardHero} {...cardAnim(0)}>
              <div className={styles.heroGlowStatic} data-glow="true" />
              <div className={styles.glowMouse} data-glow="true" />
              <p className={styles.cardHeroText}>
                Transform files into real structured data
              </p>
              <img
                src="/illustrations/folder.svg"
                alt=""
                className={styles.cardHeroIllustration}
              />
            </TiltCard>

            {/* Bottom row: quote + notifications */}
            <div className={styles.bottomRow}>
              <TiltCard className={styles.cardQuote} {...cardAnim(0.3)}>
                <span className={styles.quoteMark}>&ldquo;</span>
                <p className={styles.cardQuoteText}>
                  Integrates seamlessly into your workflow with minimal effort
                </p>
              </TiltCard>

              <TiltCard className={styles.cardNotifications} {...cardAnim(0.45)}>
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
              </TiltCard>
            </div>
          </div>

          {/* ── Right column ─────────────────────────────── */}
          <div className={styles.colRight}>
            {/* Gradient card */}
            <TiltCard className={styles.cardGradient} {...cardAnim(0.15)}>
              <p className={styles.cardGradientText}>
                Accelerate and <span className={styles.light}>simplify</span>{" "}
                your workflow
              </p>
            </TiltCard>

            {/* Pipeline card */}
            <TiltCard externalRef={pipelineRef} className={styles.cardPipeline} {...cardAnim(0.6)}>
              <div className={styles.pipelineGlowStatic} data-glow="true" />
              <div className={styles.glowMouse} data-glow="true" />
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
            </TiltCard>
          </div>
        </div>
      </PageSlot>
    </div>
  );
}

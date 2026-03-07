import { SectionLayout } from "@/components/shared/section-layout/SectionLayout";
import {
  FileText,
  Mail,
  FileSpreadsheet,
  Loader,
  MessageSquare,
  Database,
  Send,
  CheckCircle,
  Bell,
  Clock,
} from "lucide-react";
import styles from "./HowItWorks.module.scss";

export function HowItWorks() {
  return (
    <SectionLayout sectionName="how-it-works">
      <div className={styles.grid}>
        {/* ── Left column ──────────────────────────────── */}
        <div className={styles.colLeft}>
          {/* Hero card */}
          <div className={styles.cardHero}>
            <p className={styles.cardHeroText}>
              Transform files into real structured data
            </p>
          </div>

          {/* Bottom row: quote + notifications */}
          <div className={styles.bottomRow}>
            {/* Quote card */}
            <div className={styles.cardQuote}>
              <span className={styles.quoteMark}>&ldquo;</span>
              <p className={styles.cardQuoteText}>
                Integrates seamlessly into your workflow with minimal effort
              </p>
            </div>

            {/* Notifications card */}
            <div className={styles.cardNotifications}>
              <div className={styles.notifStack}>
                <div className={styles.notifItem}>
                  <span className={styles.notifIcon}>
                    <Clock />
                  </span>
                  <span className={styles.notifText}>3 tasks pending</span>
                </div>
                <div className={styles.notifItem}>
                  <span className={styles.notifIcon}>
                    <Bell />
                  </span>
                  <span className={styles.notifText}>New upload received</span>
                </div>
                <div className={styles.notifItem}>
                  <span className={styles.notifIcon}>
                    <CheckCircle />
                  </span>
                  <span className={styles.notifText}>24 emails analized!</span>
                  <span className={styles.notifAction}>Check insights</span>
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
              Accelerate and <span className={styles.light}>simplify</span> your
              workflow
            </p>
          </div>

          {/* Pipeline card */}
          <div className={styles.cardPipeline}>
            <div className={styles.pipelineRow}>
              {/* Input stage */}
              <div
                className={`${styles.pipelineStage} ${styles.pipelineStageInput}`}
              >
                <div className={styles.pill}>
                  <span className={styles.pillLabel}>Input</span>
                  <span className={styles.pillIcons}>
                    <FileText />
                    <Mail />
                    <FileSpreadsheet />
                  </span>
                </div>
              </div>

              {/* Processing stage */}
              <div
                className={`${styles.pipelineStage} ${styles.pipelineStageProcessing}`}
              >
                <div className={styles.pill}>
                  <span className={styles.pillLabel}>Processing</span>
                  <span className={styles.processingSpinner}>
                    <Loader />
                  </span>
                </div>
              </div>

              {/* Output stage */}
              <div
                className={`${styles.pipelineStage} ${styles.pipelineStageOutput}`}
              >
                <div className={styles.pill}>
                  <span className={styles.pillLabel}>Output</span>
                  <span className={styles.pillIcons}>
                    <MessageSquare />
                    <Database />
                    <Send />
                  </span>
                </div>
              </div>

              {/* Dashed arrows overlay */}
              <div className={styles.arrowsContainer}>
                <svg
                  className={styles.arrowsSvg}
                  viewBox="0 0 350 80"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M 85 40 Q 135 -10 175 40"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                    strokeDasharray="5 4"
                    fill="none"
                  />
                  <path
                    d="M 210 40 Q 250 90 290 40"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                    strokeDasharray="5 4"
                    fill="none"
                  />
                  {/* Arrow heads */}
                  <polygon
                    points="173,36 179,40 173,44"
                    fill="rgba(255,255,255,0.2)"
                  />
                  <polygon
                    points="288,36 294,40 288,44"
                    fill="rgba(255,255,255,0.2)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}

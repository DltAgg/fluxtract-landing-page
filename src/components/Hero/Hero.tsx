import styles from "./Hero.module.scss";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { CtaButton } from "@/components/shared/cta-button/CtaButton";

export function Hero() {
  return (
    <PageSlot>
      <section className={styles.hero}>
      {/* Floating corner icons */}
      <div className={`${styles.floatingIcon} ${styles.topLeft}`}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      </div>
      <div className={`${styles.floatingIcon} ${styles.topRight}`}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="9" y1="7" x2="15" y2="7" />
          <line x1="9" y1="11" x2="15" y2="11" />
          <line x1="9" y1="15" x2="12" y2="15" />
        </svg>
      </div>
      <div className={`${styles.floatingIcon} ${styles.bottomLeft}`}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <div className={`${styles.floatingIcon} ${styles.bottomRight}`}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      </div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span>Powered by AI</span>
        </div>

        <h1 className={styles.headline}>
          All your <em>documents</em>
          <br />
          structured. <span className={styles.accent}>Instantly.</span>
        </h1>

        <p className={styles.subheadline}>
          Extract, analyse, and structure data from any
          <br />
          document — delivered to any channel, automatically.
        </p>

        <div className={styles.actions}>
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

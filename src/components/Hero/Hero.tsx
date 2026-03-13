import styles from "./Hero.module.scss";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { CtaButton } from "@/components/shared/cta-button/CtaButton";
import { SectionBadge } from "@/components/shared/section-badge/SectionBadge";
import { AppIcon } from "@/components/shared/app-icon/AppIcon";
import { Signature, FileStack, FileSearchCorner, ChartNoAxesColumnDecreasing } from "lucide-react";

export function Hero() {
  return (
    <PageSlot id="home" dottedBg>
      <section className={styles.hero}>
      <AppIcon icon={Signature} position="topLeft" />
      <AppIcon icon={FileStack} position="topRight" />
      <AppIcon icon={FileSearchCorner} position="bottomLeft" />
      <AppIcon icon={ChartNoAxesColumnDecreasing} position="bottomRight" />

      <div className={styles.content}>
        <SectionBadge label="Powered by AI" />

        <h1 className={styles.headline}>
          All your documents structured. Instantly.
        </h1>

        <p className={styles.subheadline}>
          Extract, analyse, and structure data from any document — delivered to any channel, automatically.
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

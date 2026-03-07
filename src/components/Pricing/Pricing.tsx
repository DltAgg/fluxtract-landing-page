import { SectionLayout } from "@/components/shared/section-layout/SectionLayout";
import { CtaButton } from "@/components/shared/cta-button/CtaButton";
import styles from "./Pricing.module.scss";

export function Pricing() {
  return (
    <SectionLayout sectionName="pricing">
      <div className={styles.panelWrapper}>
        <div className={styles.panels}>
          {/* Left panel — glass sign-up card */}
          <div className={styles.leftPanel}>
            <h3 className={styles.formTitle}>
              Sign up for the
              <br />
              waiting list
            </h3>

            <div className={styles.fields}>
              <input
                type="text"
                className={styles.input}
                placeholder="Name"
                aria-label="Name"
              />
              <input
                type="email"
                className={styles.input}
                placeholder="Email"
                aria-label="Email"
              />
            </div>

            <CtaButton label="Subscribe" />
          </div>

          {/* Right panel — orange gradient with phone mockup */}
          <div className={styles.rightPanel}>
            <div className={styles.phoneMockup}>
              <span className={styles.phoneMockupLabel}>Fluxtract</span>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}

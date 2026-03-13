import { SectionLayout } from "@/components/shared/section-layout/SectionLayout";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { CtaButton } from "@/components/shared/cta-button/CtaButton";
import styles from "./Pricing.module.scss";

export function Pricing() {
  return (
    <>
      <SectionLayout sectionName="pricing" id="pricing" />
      <PageSlot dividerTop dottedBg intersections={["topLeft", "topRight"]}>
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

            {/* Right panel — mockup */}
            <div className={styles.rightPanel}>
              <img
                src="/mockup.png"
                alt="Fluxtract app mockup"
                className={styles.mockupImage}
              />
            </div>
          </div>
        </div>
      </PageSlot>
    </>
  );
}

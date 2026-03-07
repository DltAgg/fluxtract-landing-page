import styles from "./About.module.scss";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { SectionBadge } from "@/components/shared/section-badge/SectionBadge";

export function About() {
  return (
    <PageSlot>
      <section className={styles.about}>
        <div className={styles.content}>
          <SectionBadge label="About" />

          <h2 className={styles.headline}>Drowning in documents?</h2>

          <p className={styles.subheadline}>
            {`With Fluxtract, there's no need for manual document processing, making your workflow smoother than ever.`}
          </p>
        </div>
      </section>
    </PageSlot>
  );
}

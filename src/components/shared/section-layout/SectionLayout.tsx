import styles from "./section-layout.module.scss";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { SectionBadge } from "@/components/shared/section-badge/SectionBadge";
import { sectionContent, type SectionName } from "./section-content";

interface SectionLayoutProps {
  sectionName: SectionName;
  children?: React.ReactNode;
}

export function SectionLayout({ sectionName, children }: SectionLayoutProps) {
  const { badge, headline, subheadline } = sectionContent[sectionName];

  return (
    <PageSlot dividerTop dividerBottom>
      <section className={styles.section}>
        <div className={styles.header}>
          <SectionBadge label={badge} />
          <h2 className={styles.headline}>{headline}</h2>
          <p className={styles.subheadline}>{subheadline}</p>
        </div>

        {children && <div className={styles.body}>{children}</div>}
      </section>
    </PageSlot>
  );
}

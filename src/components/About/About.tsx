import { SectionLayout } from "@/components/shared/section-layout/SectionLayout";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { AppIcon } from "@/components/shared/app-icon/AppIcon";
import { FileStack, Scroll, FileSearchIcon, Signature } from "lucide-react";
import { FeatureCarousel } from "./FeatureCarousel";
import styles from "./About.module.scss";

export function About() {
  return (
    <>
      <SectionLayout sectionName="about" />
      <PageSlot dividerBottom noPadding>
        <div className={styles.grid}>
          <div className={styles.row}>
            <PageSlot dividerBottom hideSides>
              <div className={styles.left}>
                <div className={styles.iconRow}>
                  <AppIcon icon={FileStack} position="topLeft" />
                  <AppIcon icon={Scroll} position="topLeft" />
                  <AppIcon icon={FileSearchIcon} position="topLeft" />
                  <AppIcon icon={Signature} position="topLeft" />
                </div>
              </div>
            </PageSlot>
            <PageSlot dividerBottom hideSides>
              <div className={styles.right} />
            </PageSlot>
          </div>
          <div className={styles.row}>
            <div className={styles.left}>
              <FeatureCarousel />
            </div>
            <div className={`${styles.right} ${styles.rightNoPadding}`}>
              <div className={styles.orangePanel} />
            </div>
          </div>
        </div>
      </PageSlot>
    </>
  );
}

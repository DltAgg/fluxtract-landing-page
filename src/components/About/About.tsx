import { SectionLayout } from "@/components/shared/section-layout/SectionLayout";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { AppIcon } from "@/components/shared/app-icon/AppIcon";
import { FeatureCarousel } from "./FeatureCarousel";
import styles from "./About.module.scss";

export function About() {
  const iconRowContent = (
    <div className={styles.iconRow}>
      <AppIcon imageSrc="/svg-icons/pdf.svg" />
      <AppIcon imageSrc="/svg-icons/whatsapp.svg" />
      <AppIcon imageSrc="/svg-icons/excel.svg" />
      <AppIcon imageSrc="/svg-icons/word.svg" />
      <AppIcon imageSrc="/svg-icons/gmail.svg" />
      <span className={styles.otherSources}>+ other sources</span>
    </div>
  );

  return (
    <>
      <SectionLayout sectionName="about" id="about" />

      {/* Desktop */}
      <div className={styles.desktop}>
        <PageSlot dividerBottom noPadding>
          <div className={styles.row}>
            <div className={styles.left}>{iconRowContent}</div>
            <div className={styles.right} />
          </div>
        </PageSlot>
        <PageSlot dividerTop noPadding>
          <div className={styles.row}>
            <div className={`${styles.left} ${styles.leftSmallPadding}`}>
              <FeatureCarousel />
            </div>
            <div className={`${styles.right} ${styles.rightNoPadding}`}>
              <div className={styles.orangePanel} />
            </div>
          </div>
        </PageSlot>
      </div>

      {/* Mobile */}
      <div className={styles.mobile}>
        <PageSlot>{iconRowContent}</PageSlot>
        <PageSlot dividerTop dividerBottom>
          <FeatureCarousel />
        </PageSlot>
        <PageSlot dividerTop dividerBottom>
          <div className={styles.mobileEmpty} />
        </PageSlot>
        <PageSlot noPadding>
          <div className={styles.orangePanelMobile} />
        </PageSlot>
      </div>
    </>
  );
}

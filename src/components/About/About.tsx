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
        <div className={styles.columns}>
          <div className={styles.columnLeft}>
            <PageSlot
              dottedBg
              noPadding
              hideSideRight
              intersections={["bottomLeft", "bottomRight"]}
            >
              <div className={styles.iconRowPadded}>{iconRowContent}</div>
            </PageSlot>
            <PageSlot noPadding hideSideRight intersections={[]}>
              <div className={styles.carouselPadded}>
                <FeatureCarousel />
              </div>
            </PageSlot>
          </div>
          <div className={styles.columnRight}>
            <PageSlot dividerBottom dottedBg hideSideLeft />
            <PageSlot noPadding hideSideLeft intersections={[]}>
              <div className={styles.orangePanel}>
                <img
                  src="/illustrations/folder.svg"
                  alt=""
                  className={styles.folderIllustration}
                />
              </div>
            </PageSlot>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className={styles.mobile}>
        <PageSlot dottedBg noPadding>
          <div className={styles.mobileIconRow}>{iconRowContent}</div>
        </PageSlot>
        <PageSlot dividerTop>
          <FeatureCarousel />
        </PageSlot>
        <PageSlot dividerTop dividerBottom dottedBg>
          <div className={styles.mobileEmpty} />
        </PageSlot>
        <PageSlot noPadding>
          <div className={styles.orangePanelMobile}>
            <img
              src="/illustrations/folder.svg"
              alt=""
              className={styles.folderIllustration}
            />
          </div>
        </PageSlot>
      </div>
    </>
  );
}

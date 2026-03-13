import styles from "./page-slot.module.scss";
import { DividerIntersection } from "@/components/shared/divider-intersection/DividerIntersection";

interface PageSlotProps {
  children?: React.ReactNode;
  dividerTop?: boolean;
  dividerBottom?: boolean;
  hideSides?: boolean;
  noPadding?: boolean;
  dottedBg?: boolean;
  id?: string;
}

export function PageSlot({
  children,
  dividerTop = false,
  dividerBottom = false,
  hideSides = false,
  noPadding = false,
  dottedBg = false,
  id,
}: PageSlotProps) {
  const hasChildren = !!children;
  const centerClass = `${styles.center} ${noPadding ? styles.noPadding : ""} ${dottedBg ? styles.dottedBg : ""}`;

  return (
    <div id={id} className={`${styles.pageSlot} ${hideSides ? styles.hideSides : ""}`}>
      {dividerTop && <div className={styles.dividerTop} />}
      <div className={`${styles.row} ${!hasChildren ? styles.empty : ""}`}>
        {!hideSides && <div className={styles.sideLeft} />}
        <div className={hideSides ? styles.centerFull : centerClass}>{children}</div>
        {!hideSides && <div className={styles.sideRight} />}
      </div>
      {dividerBottom && <div className={styles.dividerBottom} />}

      {dividerTop && (
        <>
          <DividerIntersection className={styles.intersectionTopLeft} />
          <DividerIntersection className={styles.intersectionTopRight} />
        </>
      )}
      {dividerBottom && (
        <>
          <DividerIntersection className={styles.intersectionBottomLeft} />
          <DividerIntersection className={styles.intersectionBottomRight} />
        </>
      )}
    </div>
  );
}

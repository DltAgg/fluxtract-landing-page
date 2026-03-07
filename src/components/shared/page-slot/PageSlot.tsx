import styles from "./page-slot.module.scss";
import { DividerIntersection } from "@/components/shared/divider-intersection/DividerIntersection";

interface PageSlotProps {
  children?: React.ReactNode;
  dividerTop?: boolean;
  dividerBottom?: boolean;
  hideSides?: boolean;
  noPadding?: boolean;
}

export function PageSlot({
  children,
  dividerTop = false,
  dividerBottom = false,
  hideSides = false,
  noPadding = false,
}: PageSlotProps) {
  const hasChildren = !!children;
  const centerClass = `${styles.center} ${noPadding ? styles.noPadding : ""}`;

  return (
    <div className={styles.pageSlot}>
      {dividerTop && <div className={styles.dividerTop} />}
      <div className={`${styles.row} ${!hasChildren ? styles.empty : ""}`}>
        {!hideSides && <div className={styles.sideLeft} />}
        <div className={hideSides ? styles.centerFull : centerClass}>{children}</div>
        {!hideSides && <div className={styles.sideRight} />}
      </div>
      {dividerBottom && <div className={styles.dividerBottom} />}

      {dividerTop && (
        <>
          <DividerIntersection style={{ position: "absolute", top: 0, left: hideSides ? 0 : "5%", transform: `translate(-50%, -50%)` }} />
          <DividerIntersection style={{ position: "absolute", top: 0, right: hideSides ? 0 : "5%", transform: `translate(50%, -50%)` }} />
        </>
      )}
      {dividerBottom && (
        <>
          <DividerIntersection style={{ position: "absolute", bottom: 0, left: hideSides ? 0 : "5%", transform: `translate(-50%, 50%)` }} />
          <DividerIntersection style={{ position: "absolute", bottom: 0, right: hideSides ? 0 : "5%", transform: `translate(50%, 50%)` }} />
        </>
      )}
    </div>
  );
}

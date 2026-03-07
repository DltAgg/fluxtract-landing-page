import styles from "./page-slot.module.scss";
import { DividerIntersection } from "@/components/shared/divider-intersection/DividerIntersection";

interface PageSlotProps {
  children?: React.ReactNode;
  dividerTop?: boolean;
  dividerBottom?: boolean;
}

export function PageSlot({ children, dividerTop = false, dividerBottom = false }: PageSlotProps) {
  const hasChildren = !!children;

  return (
    <div className={styles.pageSlot}>
      {dividerTop && <div className={styles.dividerTop} />}
      <div className={`${styles.row} ${!hasChildren ? styles.empty : ""}`}>
        <div className={styles.sideLeft} />
        <div className={styles.center}>{children}</div>
        <div className={styles.sideRight} />
      </div>
      {dividerBottom && <div className={styles.dividerBottom} />}

      {dividerTop && (
        <>
          <DividerIntersection style={{ position: "absolute", top: 0, left: "5%", transform: "translate(-50%, -50%)" }} />
          <DividerIntersection style={{ position: "absolute", top: 0, right: "5%", transform: "translate(50%, -50%)" }} />
        </>
      )}
      {dividerBottom && (
        <>
          <DividerIntersection style={{ position: "absolute", bottom: 0, left: "5%", transform: "translate(-50%, 50%)" }} />
          <DividerIntersection style={{ position: "absolute", bottom: 0, right: "5%", transform: "translate(50%, 50%)" }} />
        </>
      )}
    </div>
  );
}

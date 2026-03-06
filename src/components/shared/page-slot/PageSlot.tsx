import styles from "./page-slot.module.scss";

interface PageSlotProps {
  children?: React.ReactNode;
}

export function PageSlot({ children }: PageSlotProps) {
  const hasChildren = !!children;

  return (
    <div className={styles.pageSlot}>
      <div className={styles.dividerTop} />
      <div className={`${styles.row} ${!hasChildren ? styles.empty : ""}`}>
        <div className={styles.sideLeft} />
        <div className={styles.center}>{children}</div>
        <div className={styles.sideRight} />
      </div>
      <div className={styles.dividerBottom} />
    </div>
  );
}

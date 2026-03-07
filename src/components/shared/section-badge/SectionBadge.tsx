import styles from "./section-badge.module.scss";

export function SectionBadge({ label }: { label: string }) {
  return (
    <div className={styles.badge}>
      <span>{label}</span>
    </div>
  );
}

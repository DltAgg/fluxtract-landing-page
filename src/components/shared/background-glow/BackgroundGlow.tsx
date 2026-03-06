import styles from "./background-glow.module.scss";

export function BackgroundGlow() {
  return (
    <div className={styles.backgroundGlow} aria-hidden="true">
      <div className={styles.glowCenter} />
      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />
    </div>
  );
}

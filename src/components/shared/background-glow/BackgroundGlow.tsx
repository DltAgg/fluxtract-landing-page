import styles from "./background-glow.module.scss";
import { GlowOrb } from "./glow-orb/GlowOrb";

export function BackgroundGlow() {
  return (
    <div className={styles.backgroundGlow} aria-hidden="true">
      <div className={styles.glowCenter}>
        <GlowOrb
          color="rgba(240, 106, 65, 0.18)"
          width={600}
          height={400}
          style={{ animationDelay: "0s" }}
        />
      </div>
      <div className={styles.glowLeft}>
        <GlowOrb
          color="rgba(200, 50, 20, 0.12)"
          width={350}
          height={350}
          style={{ animationDelay: "2s" }}
        />
      </div>
      <div className={styles.glowRight}>
        <GlowOrb
          color="rgba(200, 50, 20, 0.1)"
          width={350}
          height={350}
          style={{ animationDelay: "4s" }}
        />
      </div>
    </div>
  );
}

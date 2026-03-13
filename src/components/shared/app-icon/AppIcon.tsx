import type { LucideIcon } from "lucide-react";
import { DividerIntersection } from "@/components/shared/divider-intersection/DividerIntersection";
import styles from "./app-icon.module.scss";

type Position = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

interface AppIconProps {
  icon?: LucideIcon;
  imageSrc?: string;
  position?: Position;
  bare?: boolean;
}

const gradientDefs = (
  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
    <defs>
      <linearGradient id="icon-gradient" gradientUnits="userSpaceOnUse" x1="1" y1="7" x2="23" y2="17">
        <stop offset="3%" stopColor="#ecbc91" />
        <stop offset="30%" stopColor="#d17d47" />
        <stop offset="90%" stopColor="#af3825" />
      </linearGradient>
    </defs>
  </svg>
);

export function AppIcon({ icon: Icon, imageSrc, position, bare = false }: AppIconProps) {
  if (bare) {
    const bareContent = imageSrc ? (
      <img src={imageSrc} alt="" width={34} height={34} />
    ) : Icon ? (
      <Icon size={34} strokeWidth={1.8} />
    ) : null;

    return (
      <>
        {Icon && gradientDefs}
        <div className={`${styles.iconCard} ${styles.bare}`}>
          {bareContent}
        </div>
      </>
    );
  }

  const iconContent = imageSrc ? (
    <img src={imageSrc} alt="" width={22} height={22} />
  ) : Icon ? (
    <Icon size={22} strokeWidth={1.8} />
  ) : null;

  return (
    <div className={`${styles.wrapper} ${position ? styles[position] : ""}`}>
      {Icon && gradientDefs}
      <DividerIntersection color="#282828" />
      <DividerIntersection color="#282828" />
      <DividerIntersection color="#282828" />
      <DividerIntersection color="#282828" />
      <div className={styles.iconCard}>
        {iconContent}
      </div>
    </div>
  );
}

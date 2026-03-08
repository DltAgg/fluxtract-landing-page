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

export function AppIcon({ icon: Icon, imageSrc, position, bare = false }: AppIconProps) {
  if (bare) {
    const bareContent = imageSrc ? (
      <img src={imageSrc} alt="" width={34} height={34} />
    ) : Icon ? (
      <Icon size={34} strokeWidth={1.7} />
    ) : null;

    return (
      <div className={`${styles.iconCard} ${styles.bare}`}>
        {bareContent}
      </div>
    );
  }

  const iconContent = imageSrc ? (
    <img src={imageSrc} alt="" width={22} height={22} />
  ) : Icon ? (
    <Icon size={22} strokeWidth={1.5} />
  ) : null;

  return (
    <div className={`${styles.wrapper} ${position ? styles[position] : ""}`}>
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

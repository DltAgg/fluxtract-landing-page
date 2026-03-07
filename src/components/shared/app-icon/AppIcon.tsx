import type { LucideIcon } from "lucide-react";
import { DividerIntersection } from "@/components/shared/divider-intersection/DividerIntersection";
import styles from "./app-icon.module.scss";

type Position = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

interface AppIconProps {
  icon: LucideIcon;
  position?: Position;
  bare?: boolean;
}

export function AppIcon({ icon: Icon, position, bare = false }: AppIconProps) {
  if (bare) {
    return (
      <div className={`${styles.iconCard} ${styles.bare}`}>
        <Icon size={34} strokeWidth={1.7} />
      </div>
    );
  }

  return (
    <div className={`${styles.wrapper} ${position ? styles[position] : ""}`}>
      <DividerIntersection color="#282828" />
      <DividerIntersection color="#282828" />
      <DividerIntersection color="#282828" />
      <DividerIntersection color="#282828" />
      <div className={styles.iconCard}>
        <Icon size={22} strokeWidth={1.5} />
      </div>
    </div>
  );
}

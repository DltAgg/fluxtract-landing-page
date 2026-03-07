import type { LucideIcon } from "lucide-react";
import { DividerIntersection } from "@/components/shared/divider-intersection/DividerIntersection";
import styles from "./app-icon.module.scss";

type Position = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

interface AppIconProps {
  icon: LucideIcon;
  position: Position;
}

export function AppIcon({ icon: Icon, position }: AppIconProps) {
  return (
    <div className={`${styles.wrapper} ${styles[position]}`}>
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

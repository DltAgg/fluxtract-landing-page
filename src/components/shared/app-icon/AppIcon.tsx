"use client";

import { useRef, useCallback } from "react";
import type { LucideIcon } from "lucide-react";
import { DividerIntersection } from "@/components/shared/divider-intersection/DividerIntersection";
import styles from "./app-icon.module.scss";

type Position = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

interface AppIconProps {
  icon?: LucideIcon;
  imageSrc?: string;
  position?: Position;
  bare?: boolean;
  label?: string;
  onClick?: () => void;
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

export function AppIcon({ icon: Icon, imageSrc, position, bare = false, label, onClick }: AppIconProps) {
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = tooltipRef.current;
    if (!el) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    el.style.left = `${e.clientX - rect.left}px`;
    el.style.top = `${e.clientY - rect.top - el.offsetHeight - 10}px`;
  }, []);

  const tooltip = label ? (
    <span ref={tooltipRef} className={styles.tooltip}>{label}</span>
  ) : null;

  const tooltipHandlers = label ? { onMouseMove: handleMouseMove } : {};

  if (bare) {
    const bareContent = imageSrc ? (
      <img src={imageSrc} alt="" width={34} height={34} />
    ) : Icon ? (
      <Icon size={34} strokeWidth={1.8} />
    ) : null;

    return (
      <>
        {Icon && gradientDefs}
        <div
          className={`${styles.iconCard} ${styles.bare} ${label ? styles.hasTooltip : ""}`}
          {...tooltipHandlers}
        >
          {bareContent}
          {tooltip}
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
    <div
      className={`${styles.wrapper} ${position ? styles[position] : ""} ${label ? styles.hasTooltip : ""} ${onClick ? styles.clickable : ""}`}
      {...tooltipHandlers}
      onClick={onClick}
    >
      <DividerIntersection color="#282828" />
      <DividerIntersection color="#282828" />
      <DividerIntersection color="#282828" />
      <DividerIntersection color="#282828" />
      <div className={styles.iconCard}>
        {Icon && gradientDefs}
        {iconContent}
      </div>
      {tooltip}
    </div>
  );
}

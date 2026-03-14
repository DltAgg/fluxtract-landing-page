"use client";

import { useRef, useCallback } from "react";
import styles from "./cursor-tooltip.module.scss";

interface CursorTooltipProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function CursorTooltip({ label, children, className }: CursorTooltipProps) {
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = tooltipRef.current;
    if (!el) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    el.style.left = `${e.clientX - rect.left}px`;
    el.style.top = `${e.clientY - rect.top - el.offsetHeight - 10}px`;
  }, []);

  return (
    <span className={`${styles.wrapper} ${className ?? ""}`} onMouseMove={handleMouseMove}>
      {children}
      <span ref={tooltipRef} className={styles.tooltip}>{label}</span>
    </span>
  );
}

"use client";

import { useRef, useEffect } from "react";
import styles from "./About.module.scss";

interface AboutGridProps {
  children: React.ReactNode;
}

export function AboutGrid({ children }: AboutGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const topLeft = grid.querySelector(`.${styles.left}`) as HTMLElement;
    if (!topLeft) return;

    const observer = new ResizeObserver(() => {
      const h = topLeft.offsetHeight;
      grid.style.gridTemplateRows = `auto ${h * 2.5}px`;
    });

    observer.observe(topLeft);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className={styles.grid}>
      {children}
    </div>
  );
}

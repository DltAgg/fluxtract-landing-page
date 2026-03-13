import styles from "./page-slot.module.scss";
import { DividerIntersection } from "@/components/shared/divider-intersection/DividerIntersection";

type IntersectionPosition = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

interface PageSlotProps {
  children?: React.ReactNode;
  dividerTop?: boolean;
  dividerBottom?: boolean;
  hideSides?: boolean;
  hideSideLeft?: boolean;
  hideSideRight?: boolean;
  noPadding?: boolean;
  dottedBg?: boolean;
  id?: string;
  intersections?: IntersectionPosition[];
}

export function PageSlot({
  children,
  dividerTop = false,
  dividerBottom = false,
  hideSides = false,
  hideSideLeft = false,
  hideSideRight = false,
  noPadding = false,
  dottedBg = false,
  id,
  intersections,
}: PageSlotProps) {
  const hasChildren = !!children;
  const showLeft = !hideSides && !hideSideLeft;
  const showRight = !hideSides && !hideSideRight;

  const centerClass = hideSides
    ? styles.centerFull
    : `${styles.center} ${noPadding ? styles.noPadding : ""} ${dottedBg ? styles.dottedBg : ""}`;

  const slotClasses = [
    styles.pageSlot,
    hideSides && styles.hideSides,
    !showLeft && !hideSides && styles.noSideLeft,
    !showRight && !hideSides && styles.noSideRight,
  ].filter(Boolean).join(" ");

  const visibleIntersections: Set<IntersectionPosition> = intersections
    ? new Set(intersections)
    : new Set([
        ...(dividerTop ? (["topLeft", "topRight"] as const) : []),
        ...(dividerBottom ? (["bottomLeft", "bottomRight"] as const) : []),
      ]);

  return (
    <div id={id} className={slotClasses}>
      {dividerTop && <div className={styles.dividerTop} />}
      <div className={`${styles.row} ${!hasChildren ? styles.empty : ""}`}>
        {showLeft && <div className={styles.sideLeft} />}
        <div className={centerClass}>{children}</div>
        {showRight && <div className={styles.sideRight} />}
      </div>
      {dividerBottom && <div className={styles.dividerBottom} />}

      {visibleIntersections.has("topLeft") && <DividerIntersection className={styles.intersectionTopLeft} />}
      {visibleIntersections.has("topRight") && <DividerIntersection className={styles.intersectionTopRight} />}
      {visibleIntersections.has("bottomLeft") && <DividerIntersection className={styles.intersectionBottomLeft} />}
      {visibleIntersections.has("bottomRight") && <DividerIntersection className={styles.intersectionBottomRight} />}
    </div>
  );
}

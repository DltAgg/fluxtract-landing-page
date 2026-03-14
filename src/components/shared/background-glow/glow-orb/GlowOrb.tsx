import styles from "./glow-orb.module.scss";

interface GlowOrbProps {
  color?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  className?: string;
}

export function GlowOrb({
  color = "rgba(175, 56, 37, 0.38)",
  width = 400,
  height = 400,
  style,
  className,
}: GlowOrbProps) {
  return (
    <div
      className={`${styles.glowOrb} ${className ?? ""}`}
      style={
        {
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          "--orb-color": color,
          ...style,
        } as React.CSSProperties
      }
    />
  );
}

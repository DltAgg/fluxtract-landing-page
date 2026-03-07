interface DividerIntersectionProps {
  color?: string;
  size?: number;
}

export function DividerIntersection({ color = "#282828", size = 14 }: DividerIntersectionProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 13"
      fill="none"
    >
      <path
        d="M0 6.12439L2.26645 4.77016C3.68791 3.92081 4.87622 2.73178 5.72469 1.30978L6.2153 0.487553C6.60253 -0.161429 7.54201 -0.162864 7.93122 0.484931L8.44258 1.33602C9.28687 2.74123 10.4637 3.91732 11.8694 4.76075L12.713 5.2669C13.3603 5.6553 13.3603 6.59348 12.713 6.98188L11.8694 7.48803C10.4637 8.33146 9.28687 9.50755 8.44258 10.9128L7.93122 11.7638C7.54201 12.4116 6.60253 12.4102 6.21529 11.7612L5.72469 10.939C4.87622 9.517 3.68791 8.32796 2.26645 7.47862L0 6.12439Z"
        fill={color}
      />
    </svg>
  );
}

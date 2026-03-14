import { ChevronRight } from "lucide-react";
import styles from "./cta-button.module.scss";

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function CtaButton({ label = "Subscribe", ...rest }: CtaButtonProps) {
  return (
    <button className={styles.ctaButton} {...rest}>
      {label}
      <span className={styles.arrowContainer}>
        <ChevronRight size={20} strokeWidth={2.5} />
      </span>
    </button>
  );
}

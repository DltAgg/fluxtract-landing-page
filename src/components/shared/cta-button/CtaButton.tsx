import { ChevronRight } from "lucide-react";
import styles from "./cta-button.module.scss";

export function CtaButton({ label = "Subscribe" }: { label?: string }) {
  return (
    <button className={styles.ctaButton}>
      {label}
      <span className={styles.arrowContainer}>
        <ChevronRight size={20} strokeWidth={2.5} />
      </span>
    </button>
  );
}

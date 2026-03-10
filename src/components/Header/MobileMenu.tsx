"use client";

import { useEffect } from "react";
import styles from "./MobileMenu.module.scss";
import Link from "next/link";
import { CtaButton } from "@/components/shared/cta-button/CtaButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Block page scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ""}`}
        onClick={onClose}
      />
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg width="22" height="18" viewBox="0 0 28 23" fill="none">
            <path
              d="M1 1.5L11.5 11.5L1 21.5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 1.5L25.5 11.5L15 21.5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.content}>
          <nav className={styles.navLinks}>
            <Link href="#home" onClick={onClose}>Home</Link>
            <Link href="#about" onClick={onClose}>About</Link>
            <Link href="#how-it-works" onClick={onClose}>How it works?</Link>
            <Link href="#templates" onClick={onClose}>Templates</Link>
            <Link href="#pricing" onClick={onClose}>Pricing</Link>
          </nav>

          <div className={styles.divider} />

          <div className={styles.ctaWrapper}>
            <CtaButton />
          </div>
        </div>
      </div>
    </>
  );
}

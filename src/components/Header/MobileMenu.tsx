"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./MobileMenu.module.scss";
import Link from "next/link";
import { CtaButton } from "@/components/shared/cta-button/CtaButton";
import { GlowOrb } from "@/components/shared/background-glow/glow-orb/GlowOrb";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarTransition = {
  type: "spring",
  damping: 28,
  stiffness: 220,
} as const;

const backdropTransition = {
  duration: 0.3,
  ease: "easeInOut",
} as const;

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            onClick={onClose}
          />

          <motion.div
            className={styles.sidebar}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={sidebarTransition}
          >
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

            {/* Entry animation (x): starts fully outside, slides to 50% outside */}
            <motion.div
              key="glow-entry"
              className={styles.glowContainer}
              initial={{ x: 249 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 140 }}
            >
              {/* Float animation (y): slow traversal with strong ease in/out at each end */}
              <motion.div
                animate={{ y: ["0vh", "-100vh"] }}
                transition={{
                  delay: 0.8,
                  duration: 40,
                  // strong cubic-bezier: slow start, fast middle, slow end — pronounced deceleration at each extreme
                  ease: [0.76, 0, 0.24, 1],
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <GlowOrb
                  color="rgba(175, 56, 37, 0.45)"
                  width={499}
                  height={454}
                />
              </motion.div>
            </motion.div>

            <div className={styles.content}>
              <nav className={styles.navLinks}>
                <Link href="#home" onClick={onClose}>
                  Home
                </Link>
                <Link href="#about" onClick={onClose}>
                  About
                </Link>
                <Link href="#how-it-works" onClick={onClose}>
                  How it works?
                </Link>
                <Link href="#templates" onClick={onClose}>
                  Templates
                </Link>
                <Link href="#pricing" onClick={onClose}>
                  Pricing
                </Link>
              </nav>

              <div className={styles.divider} />

              <div className={styles.ctaWrapper}>
                <CtaButton />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

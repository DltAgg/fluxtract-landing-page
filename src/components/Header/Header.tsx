"use client";

import styles from "./Header.module.scss";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { CtaButton } from "@/components/shared/cta-button/CtaButton";
import { MobileMenu } from "./MobileMenu";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#how-it-works", label: "How it works?" },
  { href: "#templates", label: "Templates" },
  { href: "#pricing", label: "Pricing" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-50% 0px -50% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <PageSlot dividerTop dividerBottom>
        {/* keep this spacer */}
        <div className={styles.spacer} />
      </PageSlot>
      <header
        className={`${styles.header} ${visible ? styles.headerVisible : styles.headerHidden}`}
      >
        <div className={styles.container}>
          <div className={styles.logo}>
            <Image
              src="/logotype.png"
              alt="Fluxtract"
              height={36}
              width={160}
              className={styles.logoImage}
              style={{ objectFit: "contain" }}
            />
          </div>

          <nav className={styles.nav}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={activeSection === item.href.slice(1) ? styles.navActive : ""}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.right}>
            <div className={styles.ctaWrapper}>
              <CtaButton onClick={() => {
                const form = document.getElementById("pricing-form");
                if (form) form.scrollIntoView({ behavior: "smooth", block: "center" });
              }} />
            </div>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

"use client";

import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { CtaButton } from "@/components/shared/cta-button/CtaButton";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <PageSlot dividerTop dividerBottom>
        {/* keep this spacer */}
        <div className={styles.spacer} />
      </PageSlot>
      <header className={styles.header}>
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
            <Link href="#home">Home</Link>
            <Link href="#about">About</Link>
            <Link href="#how-it-works">How it works?</Link>
            <Link href="#templates">Templates</Link>
            <Link href="#pricing">Pricing</Link>
          </nav>

          <div className={styles.right}>
            <div className={styles.ctaWrapper}>
              <CtaButton />
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

"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import Image from "next/image";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const copyrightRef = useRef<HTMLParagraphElement>(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const [copyrightVisible, setCopyrightVisible] = useState(false);

  useEffect(() => {
    const footerEl = footerRef.current;
    const copyrightEl = copyrightRef.current;

    const observers: IntersectionObserver[] = [];

    if (footerEl) {
      const o = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setFooterVisible(true);
            o.disconnect();
          }
        },
        { rootMargin: "-100px" }
      );
      o.observe(footerEl);
      observers.push(o);
    }

    if (copyrightEl) {
      const o = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCopyrightVisible(true);
            o.disconnect();
          }
        },
        { rootMargin: "-50px" }
      );
      o.observe(copyrightEl);
      observers.push(o);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <PageSlot dividerTop>
        <footer
          id="footer"
          ref={footerRef}
          className={`${styles.footer} ${footerVisible ? styles.fadeVisible : styles.fadeHidden}`}
        >
          <div className={styles.logo}>
            <Image
              src="/logotype.png"
              alt="Fluxtract"
              fill
            />
          </div>

          <nav className={styles.nav}>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#how-it-works">How it works?</a>
            <a href="#templates">Templates</a>
            <a href="#pricing">Pricing</a>
          </nav>

          <div className={styles.socials}>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <Image src="/svg-icons/social/x.svg" alt="X" width={24} height={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Image src="/svg-icons/social/f.svg" alt="Facebook" width={24} height={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Image src="/svg-icons/social/instagram.svg" alt="Instagram" width={24} height={24} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Image src="/svg-icons/social/youtube.svg" alt="YouTube" width={24} height={24} />
            </a>
          </div>
        </footer>
      </PageSlot>

      <PageSlot dividerTop>
        <p
          ref={copyrightRef}
          className={`${styles.copyright} ${copyrightVisible ? styles.fadeVisible : styles.fadeHidden}`}
        >
          &copy; 2026 Fluxtract. All rights reserved.
        </p>
      </PageSlot>
    </>
  );
}

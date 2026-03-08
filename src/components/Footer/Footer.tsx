import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";

export function Footer() {
  return (
    <>
      <PageSlot dividerTop>
        <footer className={styles.footer}>
          <div className={styles.logo}>
            <Image
              src="/logotype.png"
              alt="Fluxtract"
              fill
            />
          </div>

          <nav className={styles.nav}>
            <Link href="#home">Home</Link>
            <Link href="#about">About</Link>
            <Link href="#how-it-works">How it works?</Link>
            <Link href="#templates">Templates</Link>
            <Link href="#pricing">Pricing</Link>
          </nav>

          <div className={styles.socials}>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <Twitter size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Youtube size={24} />
            </a>
          </div>
        </footer>
      </PageSlot>

      <PageSlot dividerTop>
        <p className={styles.copyright}>
          &copy; 2026 Fluxtract. All rights reserved.
        </p>
      </PageSlot>
    </>
  );
}

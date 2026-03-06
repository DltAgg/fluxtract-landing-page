import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { PageSlot } from "@/components/shared/page-slot/PageSlot";
import { CtaButton } from "@/components/shared/cta-button/CtaButton";

export function Header() {
  return (
    <>
      <PageSlot>
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
              style={{ objectFit: "contain" }}
            />
          </div>

          <nav className={styles.nav}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/templates">Templates</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>

          <CtaButton />
        </div>
      </header>
    </>
  );
}

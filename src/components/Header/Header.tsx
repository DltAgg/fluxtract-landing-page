import styles from "./Header.module.scss";
import Link from "next/link";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            {/* Simple representation of the logo icon */}
            <div className={styles.bookLeft}></div>
            <div className={styles.bookRight}></div>
          </div>
          <span>Fluxtract</span>
        </div>

        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/templates">Templates</Link>
          <Link href="/pricing">Pricing</Link>
        </nav>

        <button className={styles.cta}>
          Subscribe
          <span className={styles.arrowContainer}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </header>
  );
}

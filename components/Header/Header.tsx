"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isCatalog = pathname === "/catalog";

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Rental<span className={styles.logoAccent}>Car</span>
        </Link>

        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.navLink} ${isHome ? styles.active : ""}`}
          >
            Home
          </Link>

          <Link
            href="/catalog"
            className={`${styles.navLink} ${isCatalog ? styles.active : ""}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}

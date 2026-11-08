import Link from "next/link";
import styles from "./Hero.module.css";

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <div className={styles.background} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>Find your perfect rental car</h1>
        <p className={styles.description}>
          Reliable and budget-friendly rentals for any journey
        </p>

        <Link href="/catalog" className={styles.catalogButton}>
          View Catalog
        </Link>
      </div>
    </section>
  );
}

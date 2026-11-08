import { Suspense } from "react";
import CarDetailsPageClient from "./CarDetailsPageClient";
import styles from "./page.module.css";

export default function CarDetailsPage() {
  return (
    <Suspense
      fallback={
        <p className={styles.loaderWrapper}>
          <span className={styles.loader}></span>
        </p>
      }
    >
      <CarDetailsPageClient />
    </Suspense>
  );
}

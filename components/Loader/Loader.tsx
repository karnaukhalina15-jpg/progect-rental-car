"use client";

import { useEffect } from "react";
import styles from "./Loader.module.css";

export default function SuccessModal() {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.iconWrapper}>
          <span className={styles.loader} />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>Loading...</h2>

          <p className={styles.description}>
            Please wait while we fetch the best
            <br />
            cars for you.
          </p>
        </div>
      </div>
    </div>
  );
}

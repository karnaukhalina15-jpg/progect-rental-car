import Image from "next/image";
import styles from "./NotFoundCatalog.module.css";

type NotFoundCatalogProps = {
  onResetFilters: () => void;
};

export default function NotFoundCatalog({
  onResetFilters,
}: NotFoundCatalogProps) {
  return (
    <section className={styles.notFound}>
      <Image
        src="/not-found.webp"
        alt="No cars found"
        width={414}
        height={388}
        className={styles.image}
      />

      <div className={styles.content}>
        <h2 className={styles.title}>No cars found</h2>

        <p className={styles.description}>
          We couldn`t find any cars that match your current filters. Try
          changing your search criteria or reset the filters.
        </p>
      </div>

      <button
        type="button"
        className={styles.resetButton}
        onClick={onResetFilters}
      >
        Reset filters
      </button>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/car";
import styles from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const city = car.location?.city || "";
  const country = car.location?.country || "";

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={244}
          height={268}
          className={styles.image}
          sizes="(max-width: 1439px) 50vw, 33vw"
          loading="eager"
        />
      </div>

      <div className={styles.header}>
        <div
          className={styles.titleContainer}
          title={`${car.brand} ${car.model}, ${car.year}`}
        >
          <span className={styles.brand}>{car.brand} </span>
          <span className={styles.model}>{car.model}, </span>
          <span className={styles.year}>{car.year}</span>
        </div>
        <div className={styles.price}>${car.rentalPrice}</div>
      </div>

      <div className={styles.tags}>
        <span>{city}</span>
        <span>|</span>
        <span>{country}</span>
        <span>|</span>
        <span>{car.rentalCompany}</span>
        <span>|</span>
        <span>{car.type}</span>
        <span>|</span>
        <span>{car.mileage} km</span>
      </div>

      <Link
        href={`/catalog/${car.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
      >
        Read more
      </Link>
    </div>
  );
}

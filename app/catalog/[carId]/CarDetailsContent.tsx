"use client";

import { useState } from "react";
import Image from "next/image";
import RentalForm from "@/components/RentalForm/RentalForm";
import type { Car } from "@/types/car";
import styles from "./CarDetailsContent.module.css";

interface CarDetailsContentProps {
  car: Car;
}

function SpecIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    year: "M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z",
    type: "M3 13l2-6h14l2 6M5 13v5m14-5v5M3 13h18M7 18h.01M17 18h.01",
    fuel: "M4 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18M4 10h12M8 6h4m8 4v8a2 2 0 0 1-4 0v-4",
    engine: "M3 10h3l2-3h8l2 3h3v8h-3l-2 2H8l-2-2H3z",
    mileage: "M12 8v4l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
    check: "M20 6 9 17l-5-5",
  };

  return (
    <svg
      className={styles.specIcon}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icons[type] || icons.check} />
    </svg>
  );
}

export default function CarDetailsContent({ car }: CarDetailsContentProps) {
  const [isLoading, setIsLoading] = useState(true);

  const article = car.img
    ? (car.img.match(/\/(\d+)-/)?.[1] ?? car.id.slice(0, 4))
    : car.id.slice(0, 4);

  const specifications = [
    { label: "Year", value: car.year, icon: "year" },
    { label: "Type", value: car.type, icon: "type" },
    {
      label: "Fuel Consumption",
      value: car.fuelConsumption,
      icon: "fuel",
    },
    {
      label: "Engine",
      value: car.engine,
      icon: "engine",
    },
    {
      label: "Mileage",
      value: `${car.mileage.toLocaleString("en-US")} km`,
      icon: "mileage",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.leftColumn}>
          <div
            className={`${styles.imageWrapper} relative overflow-hidden bg-gray-200`}
          >
            {isLoading && (
              <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center z-10">
                <span className="text-gray-500 text-sm font-medium"></span>
              </div>
            )}

            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className={`${styles.carImage} object-cover duration-700 ease-in-out ${
                isLoading
                  ? "scale-105 blur-sm opacity-0"
                  : "scale-100 blur-0 opacity-100"
              }`}
              priority
            />
          </div>

          <section className={styles.bookingSection}>
            <h2 className={styles.sectionTitle}>Book your car now</h2>

            <p className={styles.bookingDescription}>
              Stay connected! We are always ready to help you.
            </p>

            <RentalForm carId={car.id} />
          </section>
        </div>

        <div className={styles.rightColumn}>
          <section className={styles.carInfo}>
            <div className={styles.headerRow}>
              <h1 className={styles.carTitle}>
                {car.brand} {car.model}, {car.year}
              </h1>

              <span className={styles.carId}>Article: {article}</span>
            </div>

            <p className={styles.location}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <circle
                  cx="12"
                  cy="10"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
              </svg>
              {car.location.city}, {car.location.country}
            </p>

            <p className={styles.price}>${car.rentalPrice}</p>
          </section>

          <section className={styles.descriptionSection}>
            <p className={styles.description}>{car.description}</p>
          </section>

          <section className={styles.conditionsSection}>
            <h2 className={styles.sectionTitle}>Rental Conditions</h2>

            <ul className={styles.conditionsList}>
              {car.rentalConditions.map((condition, index) => (
                <li
                  key={`${condition}-${index}`}
                  className={styles.conditionItem}
                >
                  <SpecIcon type="check" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.specifications}>
            <h2 className={styles.sectionTitle}>Car Specifications</h2>

            <ul className={styles.specList}>
              {specifications.map((spec) => (
                <li key={spec.label} className={styles.specItem}>
                  <SpecIcon type={spec.icon} />

                  <span>
                    {spec.label}: {spec.value}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.featuresSection}>
            <h2 className={styles.sectionTitle}>Features</h2>

            <ul className={styles.featuresList}>
              {car.features.map((feature, index) => (
                <li key={`${feature}-${index}`} className={styles.featureItem}>
                  <SpecIcon type="check" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

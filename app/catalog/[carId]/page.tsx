import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import CarDetailsPageClient from "./CarDetailsPageClient";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ carId: string }>;
};

async function getCarMetadata(carId: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(
    `${apiUrl.replace(/\/$/, "")}/cars/${encodeURIComponent(carId)}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch car metadata");
  }

  return response.json() as Promise<{
    brand: string;
    model: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { carId } = await params;

  try {
    const car = await getCarMetadata(carId);

    return {
      title: `${car.brand} ${car.model}`,
      description: `Rent ${car.brand} ${car.model}. Book your car with RentalCar.`,
    };
  } catch {
    return {
      title: "Car not found",
      description: "The requested car could not be found.",
    };
  }
}

async function DynamicMarker() {
  await connection();
  return null;
}

export default function CarDetailsPage() {
  return (
    <>
      <Suspense fallback={null}>
        <DynamicMarker />
      </Suspense>

      <Suspense
        fallback={
          <p className={styles.loaderWrapper}>
            <span className={styles.loader}></span>
          </p>
        }
      >
        <CarDetailsPageClient />
      </Suspense>
    </>
  );
}

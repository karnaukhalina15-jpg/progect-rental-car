"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCarById } from "@/lib/api";
import CarDetailsContent from "./CarDetailsContent";

export default function CarDetailsPageClient() {
  const { carId } = useParams<{ carId: string }>();

  const {
    data: car,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => getCarById(carId),
    enabled: Boolean(carId),
  });

  if (isPending) {
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>
        Loading car details...
      </p>
    );
  }

  if (isError) {
    console.error("Error loading car:", error);

    return (
      <p style={{ textAlign: "center", padding: "40px" }}>
        Failed to load car details. Please try again.
      </p>
    );
  }

  if (!car) {
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>Car not found.</p>
    );
  }

  return <CarDetailsContent car={car} />;
}

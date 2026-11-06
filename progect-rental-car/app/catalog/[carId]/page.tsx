import { Suspense } from "react";
import CarDetailsPageClient from "./CarDetailsPageClient";

export default function CarDetailsPage() {
  return (
    <Suspense
      fallback={
        <p style={{ textAlign: "center", padding: "40px" }}>
          Loading car details...
        </p>
      }
    >
      <CarDetailsPageClient />
    </Suspense>
  );
}

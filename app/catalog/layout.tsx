import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Catalog",
  description:
    "Browse our car rental catalog. Filter vehicles by brand, price, and mileage to find the perfect car for your trip.",
  openGraph: {
    title: "Car Catalog | RentalCar",
    description:
      "Explore available rental cars and find the right vehicle for your needs.",
    type: "website",
  },
};

export default function CatalogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

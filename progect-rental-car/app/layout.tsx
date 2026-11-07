import type { Metadata } from "next";
import { Suspense } from "react";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header/Header";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RentalCar — Car Rental Service",
    template: "%s | RentalCar",
  },
  description:
    "Find and rent your perfect car with RentalCar. Explore our collection of vehicles and book your car easily online.",
  keywords: [
    "car rental",
    "rent a car",
    "car hire",
    "vehicle rental",
    "RentalCar",
  ],
  openGraph: {
    title: "RentalCar — Car Rental Service",
    description:
      "Explore our collection of vehicles and book your perfect car with RentalCar.",
    siteName: "RentalCar",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${inter.variable} ${manrope.className} antialiased bg-white text-gray-900 min-h-screen flex flex-col`}
      >
        <Providers>
          <Suspense fallback={null}>
            <Header />
          </Suspense>

          <main className="flex-grow">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
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
  title: "RentalCar",
  description: "Reliable and budget-friendly rentals for any journey",
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
          <Header />
          <main className="flex-grow">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

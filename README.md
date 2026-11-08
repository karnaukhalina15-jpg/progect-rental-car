# 🚗 RentalCar App

A modern, full-featured web application for a car rental company, developed as part of the GoIT Full-Stack course. The application allows users to browse a catalog of available vehicles, filter them by various criteria, view detailed specifications, and submit rental booking requests.

---

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Stack](#-technologies-stack)
- [Project Structure](#-project-structure)
- [Getting Started & Installation](#-getting-started--installation)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Author](#-author)

---

## ✨ Features

- **Home Page (`/`)**: A welcoming hero section with a clear call-to-action directing users to the vehicle catalog.
- **Catalog Page (`/catalog`)**:
  - Displays a comprehensive list of cars fetched from the backend API.
  - Advanced filtering system (by brand, price, and mileage range).
  - "Load More" pagination supporting active filters.
  - Ability to open vehicle details in a new browser tab.
- **Car Details Page (`/catalog/[carId]`)**:
  - Full vehicle specifications, high-quality images, and rental conditions.
  - Interactive booking form with backend integration and success notifications.
- **Responsive & Modern UI**: Built with strict adherence to the Figma design layout, clean animations, and a polished user experience.

---

## 🛠 Technologies Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management & Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **API Client**: [Axios](https://axios-http.com/)
- **Styling**: CSS Modules / Tailwind CSS
- **Deployment**: [Vercel](https://vercel.com/)

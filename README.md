# 🚗 RentalCar App

<p align="center">
  <strong>A modern car rental application built with Next.js, React and TypeScript.</strong>
</p>

<p align="center">
  Explore available vehicles, find the right car using advanced filters, view detailed specifications and submit booking requests.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.4.4-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.3.0-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Styling-CSS_Modules-1572B6?logo=css3" alt="CSS Modules" />
</p>

---

## 📋 Table of Contents

- [✨ About the Project](#-about-the-project)
- [🚀 Features](#-features)
- [🛠 Technologies](#-technologies)
- [📁 Project Structure](#-project-structure)
- [⚙️ Getting Started](#️-getting-started)
- [🔑 API Configuration](#-api-configuration)
- [🌐 Deployment](#-deployment)
- [👩‍💻 Author](#-author)

---

## ✨ About the Project

**RentalCar** is a responsive web application developed as part of the **GoIT Full-Stack Developer course**.

The application provides a convenient way to explore a car catalog, filter vehicles according to individual preferences and view detailed information about each car.

Users can also submit booking requests through an interactive form connected to the backend API.

The interface is designed according to the provided Figma design.

---

## 🚀 Features

### 🏠 Home Page

- Modern hero section.
- Clear call-to-action button.
- Quick navigation to the car catalog.

### 🚘 Car Catalog

- Dynamic car catalog fetched from the backend API.
- Filtering by:
  - Car brand.
  - Rental price.
  - Minimum mileage.
  - Maximum mileage.
- Combined filtering options.
- Load More pagination.
- Pagination preserves the selected filters.
- Car details open in a new browser tab.

### 📄 Car Details

- Detailed vehicle information.
- Vehicle images and specifications.
- Rental conditions and available features.
- Dynamic car information based on the selected vehicle.
- Booking form integrated with the backend API.

### 📝 Booking Form

- Input validation.
- Field-specific error messages.
- Loading state during submission.
- Success and error notifications.
- Booking request submission to the backend.

### 📱 Responsive Design

- Responsive layout for different screen sizes.
- CSS Modules for component styling.
- Interactive buttons and hover effects.
- Layout based on the Figma design.

---

## 🛠 Technologies

| Technology                                                | Purpose                                   |
| --------------------------------------------------------- | ----------------------------------------- |
| [Next.js 16](https://nextjs.org/)                         | React framework and App Router            |
| [React 19](https://react.dev/)                            | Building user interfaces                  |
| [TypeScript](https://www.typescriptlang.org/)             | Static typing                             |
| [TanStack Query](https://tanstack.com/query/latest)       | Server state management and data fetching |
| [Axios](https://axios-http.com/)                          | HTTP requests to the backend API          |
| CSS Modules                                               | Component-scoped styling                  |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library                              |

---

## 📁 Project Structure

```text
progect-rental-car/
│
├── app/
│   ├── catalog/
│   │   └── [carId]/
│   │       ├── CarDetailsContent.module.css
│   │       ├── CarDetailsContent.tsx
│   │       ├── CarDetailsPageClient.tsx
│   │       ├── page.module.css
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   └── providers.tsx
│
├── components/
│   ├── CarCard/
│   ├── CarFilters/
│   ├── CatalogClient/
│   ├── Header/
│   ├── Hero/
│   ├── Loader/
│   ├── NotFoundCatalog/
│   ├── Notification/
│   └── RentalForm/
│
├── lib/
│   └── api.ts
│
├── types/
│   └── car.ts
│
├── public/
│
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)

### Installation

**1. Clone the repository**

```bash
git clone git@github.com:karnaukhalina15-jpg/progect-rental-car.git
```

**2. Navigate to the project directory**

```bash
cd progect-rental-car
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create your local environment file using the provided `.env.example` as a reference.

**5. Start the development server**

```bash
npm run dev
```

**6. Open the application**

Visit [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Starts the development server |
| `npm run build` | Creates a production build    |
| `npm run start` | Starts the production server  |
| `npm run lint`  | Runs ESLint                   |

---

### 🔧 API Configuration

The application uses the GoIT Car Rental API.

Create a `.env.local` file in the root directory of the project and add:

```env
NEXT_PUBLIC_API_URL=https://car-rental-api.goit.study
```

The API URL is configured through the `NEXT_PUBLIC_API_URL` environment variable.

Make sure the environment variable is set before starting the application.

### Deployment Steps

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the application.
5. Open the generated deployment URL.

---

## 👩‍💻 Author

**RentalCar App**

Developed as part of the **GoIT Full-Stack Developer course**.

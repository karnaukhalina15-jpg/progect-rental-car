"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCars } from "@/lib/api";
import CarCard from "@/components/CarCard/CarCard";
import CarFilters from "@/components/CarFilters/CarFilters";
import { CarFiltersState, Car } from "@/types/car";
import styles from "./page.module.css";

export default function CatalogPage() {
  const [filters, setFilters] = useState<CarFiltersState>({});

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["cars", filters],
    queryFn: ({ pageParam = 1 }) =>
      getCars({
        page: pageParam,
        perPage: 12,
        ...filters,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const cars: Car[] = data?.pages.flatMap((page) => page.cars) || [];

  return (
    <div className={styles.container}>
      <CarFilters onFilterChange={setFilters} />

      {isLoading && <div className={styles.loader}>Loading cars...</div>}
      {isError && (
        <div className={styles.error}>
          Failed to load cars. Please try again.
        </div>
      )}

      {!isLoading && cars.length === 0 && (
        <div className={styles.loader}>
          No cars found matching your criteria.
        </div>
      )}

      <div className={styles.grid}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {hasNextPage && (
        <div className={styles.loadMoreContainer}>
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={styles.loadMoreButton}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}

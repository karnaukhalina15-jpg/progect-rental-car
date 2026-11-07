"use client";

import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCars } from "@/lib/api";
import CarCard from "@/components/CarCard/CarCard";
import CarFilters from "@/components/CarFilters/CarFilters";
import SuccessModal from "@/components/SuccessModal/SuccessModal";
import NotFoundCatalog from "@/components/NotFoundCatalog/NotFoundCatalog";
import type { CarFiltersState, Car } from "@/types/car";
import styles from "./page.module.css";

export default function CatalogPage() {
  const [filters, setFilters] = useState<CarFiltersState>({});
  const [resetKey, setResetKey] = useState(0);
  const [searchVersion, setSearchVersion] = useState(0);

  const handledSearchVersion = useRef(0);

  const handleFilterChange = (newFilters: CarFiltersState) => {
    setFilters(newFilters);
    setSearchVersion((prev) => prev + 1);
  };

  const handleResetFilters = () => {
    setFilters({});
    setResetKey((prev) => prev + 1);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["cars", filters],
    queryFn: ({ pageParam = 1 }) =>
      getCars({
        page: pageParam,
        perPage: 12,
        ...filters,
      }),
    placeholderData: (previousData) => previousData,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });

  const cars: Car[] = data?.pages.flatMap((page) => page.cars) || [];

  useEffect(() => {
    if (
      isSuccess &&
      !isError &&
      cars.length === 0 &&
      searchVersion > 0 &&
      handledSearchVersion.current !== searchVersion
    ) {
      handledSearchVersion.current = searchVersion;
      setResetKey((prev) => prev + 1);
    }
  }, [isSuccess, isError, cars.length, searchVersion]);

  return (
    <div className={styles.container}>
      <CarFilters key={resetKey} onFilterChange={handleFilterChange} />

      {isFetching && !isFetchingNextPage && <SuccessModal />}

      {isError && (
        <div className={styles.error}>
          Failed to load cars. Please try again.
        </div>
      )}

      {!isFetching && !isError && cars.length === 0 && (
        <NotFoundCatalog onResetFilters={handleResetFilters} />
      )}

      {cars.length > 0 && (
        <div className={styles.grid}>
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}

      {cars.length > 0 && hasNextPage && (
        <div className={styles.loadMoreContainer}>
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={styles.loadMoreButton}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        </div>
      )}

      {isFetchingNextPage && <SuccessModal />}
    </div>
  );
}

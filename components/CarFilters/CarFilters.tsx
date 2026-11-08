"use client";

import { useState, useEffect, type FormEvent } from "react";
import { getCarsFilters } from "@/lib/api";
import type { CarFiltersState } from "@/types/car";
import styles from "./CarFilters.module.css";

interface CarFiltersProps {
  onFilterChange: (filters: CarFiltersState) => void;
}

export default function CarFilters({ onFilterChange }: CarFiltersProps) {
  const [brands, setBrands] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const [openDropdown, setOpenDropdown] = useState<"brand" | "price" | null>(
    null,
  );

  const [mileageError, setMileageError] = useState("");

  useEffect(() => {
    getCarsFilters()
      .then((data) => {
        setBrands(data.brands);

        const { min, max } = data.price;
        const priceOptions: number[] = [];

        for (let price = Math.ceil(min / 10) * 10; price <= max; price += 10) {
          priceOptions.push(price);
        }

        setPrices(priceOptions);
      })
      .catch((err) => {
        console.error("Failed to load filters:", err);
      });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const min = minMileage ? Number(minMileage) : undefined;
    const max = maxMileage ? Number(maxMileage) : undefined;

    if (min !== undefined && max !== undefined && min > max) {
      setMileageError("Minimum mileage cannot exceed maximum mileage.");
      return;
    }

    setMileageError("");

    onFilterChange({
      brand: selectedBrand || undefined,
      price: selectedPrice ? Number(selectedPrice) : undefined,
      minMileage: min,
      maxMileage: max,
    });

    setOpenDropdown(null);
  };

  const handleClear = () => {
    setSelectedBrand("");
    setSelectedPrice("");
    setMinMileage("");
    setMaxMileage("");
    setMileageError("");
    setOpenDropdown(null);

    onFilterChange({});
  };

  const handleMileageChange = (
    setter: (value: string) => void,
    value: string,
  ) => {
    if (value === "" || /^\d+$/.test(value)) {
      setter(value);
      setMileageError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.filtersForm}>
      <div className={styles.filterFields}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} id="brand-label">
            Car brand
          </label>

          <div className={styles.dropdownWrapper}>
            <button
              type="button"
              className={styles.selectButton}
              aria-labelledby="brand-label"
              aria-expanded={openDropdown === "brand"}
              onClick={() =>
                setOpenDropdown((prev) => (prev === "brand" ? null : "brand"))
              }
            >
              <span className={selectedBrand ? styles.selectedValue : ""}>
                {selectedBrand || "Choose a brand"}
              </span>

              <svg
                className={`${styles.chevron} ${
                  openDropdown === "brand" ? styles.chevronOpen : ""
                }`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 6L8 11L13 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {openDropdown === "brand" && (
              <ul className={styles.dropdownList}>
                {brands.map((brand) => (
                  <li key={brand}>
                    <button
                      type="button"
                      className={`${styles.dropdownOption} ${
                        selectedBrand === brand ? styles.activeOption : ""
                      }`}
                      onClick={() => {
                        setSelectedBrand(brand);
                        setOpenDropdown(null);
                      }}
                    >
                      {brand}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} id="price-label">
            Price / 1 hour
          </label>

          <div className={styles.dropdownWrapper}>
            <button
              type="button"
              className={styles.selectButton}
              aria-labelledby="price-label"
              aria-expanded={openDropdown === "price"}
              onClick={() =>
                setOpenDropdown((prev) => (prev === "price" ? null : "price"))
              }
            >
              <span className={selectedPrice ? styles.selectedValue : ""}>
                {selectedPrice ? `$${selectedPrice}` : "Choose a price"}
              </span>

              <svg
                className={`${styles.chevron} ${
                  openDropdown === "price" ? styles.chevronOpen : ""
                }`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 6L8 11L13 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {openDropdown === "price" && (
              <ul className={styles.dropdownList}>
                {prices.map((price) => (
                  <li key={price}>
                    <button
                      type="button"
                      className={`${styles.dropdownOption} ${
                        selectedPrice === String(price)
                          ? styles.activeOption
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedPrice(String(price));
                        setOpenDropdown(null);
                      }}
                    >
                      {price}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} htmlFor="minMileage">
            Car mileage / km
          </label>

          <div className={styles.mileageInputs}>
            <input
              id="minMileage"
              type="number"
              min="0"
              placeholder="From"
              value={minMileage}
              onChange={(e) =>
                handleMileageChange(setMinMileage, e.target.value)
              }
              className={styles.inputFrom}
              aria-invalid={Boolean(mileageError)}
            />

            <input
              id="maxMileage"
              type="number"
              min="0"
              placeholder="To"
              value={maxMileage}
              onChange={(e) =>
                handleMileageChange(setMaxMileage, e.target.value)
              }
              className={styles.inputTo}
              aria-label="Maximum mileage"
              aria-invalid={Boolean(mileageError)}
            />
          </div>

          {mileageError && (
            <p className={styles.errorMessage}>{mileageError}</p>
          )}
        </div>
      </div>

      <div className={styles.buttons}>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>

        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
        >
          Clear filters
        </button>
      </div>
    </form>
  );
}

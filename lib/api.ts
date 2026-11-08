import axios from "axios";
import type { CarsResponse, Car } from "@/types/car";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.study",
});

export interface GetCarsParams {
  page?: number;
  perPage?: number;
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

export const getCars = async (
  params: GetCarsParams = {},
): Promise<CarsResponse> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );

  try {
    const response = await api.get<CarsResponse>("/cars", {
      params: cleanParams,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Cars API error:",
        JSON.stringify(error.response?.data, null, 2),
      );
    }

    throw error;
  }
};

export const getCarsFilters = async () => {
  const response = await api.get<{
    brands: string[];
    price: { min: number; max: number };
  }>("/cars/filters");

  return response.data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const response = await api.get<Car>(`/cars/${id}`);
  return response.data;
};

export interface BookingPayload {
  name: string;
  email: string;
  comment?: string;
}

export interface BookingPayload {
  name: string;
  email: string;
  comment?: string;
}

export interface BookingResponse {
  message: string;
}

export const createBookingRequest = async (
  carId: string,
  data: BookingPayload,
): Promise<BookingResponse> => {
  try {
    const response = await api.post<BookingResponse>(
      `/cars/${carId}/booking-requests`,
      data,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Cars API error:", {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
      });
    } else {
      console.error("Unexpected error:", error);
    }

    throw error;
  }
};

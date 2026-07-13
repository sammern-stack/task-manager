import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

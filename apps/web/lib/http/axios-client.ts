import axios, { AxiosError } from "axios";
import { ApiClientError } from "./api-error";
import { tokenStore } from "../auth/token";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function isAxiosError(error: unknown): error is AxiosError<any> {
  return axios.isAxiosError(error);
}

export function toApiClientError(error: unknown): ApiClientError {
  if (isAxiosError(error)) {
    return new ApiClientError({
      message:
        error.response?.data?.message ?? error.message ?? "Request failed",
      code: error.response?.data?.code,
      details: error.response?.data,
    });
  }

  return new ApiClientError({ message: "Unexpected error", details: error });
}

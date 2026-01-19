import axios, { AxiosError } from "axios";
import { ApiClientError } from "./api-error";

export const webApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEB_API_BASE_URL,
  proxy: false,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

function isAxiosError(error: unknown): error is AxiosError<any> {
  return axios.isAxiosError(error);
}

export function toWebApiClientError(error: unknown): ApiClientError {
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

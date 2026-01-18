export type ApiErrorPayload = {
  message?: string;
  code?: string;
  details?: unknown;
};

export class ApiClientError extends Error {
  readonly code?: string;
  readonly details?: unknown;

  constructor(payload: ApiErrorPayload) {
    super(payload.message ?? "Request failed");
    this.name = "ApiClientError";
    this.code = payload.code;
    this.details = payload.details;
  }
}

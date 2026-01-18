import { apiClient, toApiClientError } from "../http/axios-client";

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
};

export class AuthService {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    try {
      const { data } = await apiClient.post<LoginResponse>(
        "/auth/login",
        payload,
      );
      return data;
    } catch (e: unknown) {
      throw toApiClientError(e);
    }
  }
}

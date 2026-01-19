import { apiClient, toApiClientError } from "../http/axios-client";
import { tokenStore } from "@/lib/auth/token";

export type CreateOnboardingRequest = {
  fullName: string;
  document: string;
  email: string;
  initialAmount: string;
};

export type CreateOnboardingResponse = {
  onboardingId: string;
  status: "REQUEST" | "APPROVED" | "REJECTED";
};

export class OnboardingService {
  async create(
    payload: CreateOnboardingRequest,
  ): Promise<CreateOnboardingResponse> {
    try {
      const accessToken = tokenStore.get();
      console.log(accessToken);

      const { data } = await apiClient.post("/onboarding", payload, {
        headers: accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : undefined,
      });
      return data as CreateOnboardingResponse;
    } catch (e: unknown) {
      throw toApiClientError(e);
    }
  }
}

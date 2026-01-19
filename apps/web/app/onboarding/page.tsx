"use client";

import { useState } from "react";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { OnboardingResponse } from "@/components/onboarding/OnboardingResponse";

export default function OnboardingPage() {
  const [createdOnboardingId, setCreatedOnboardingId] = useState<string | null>(
    null,
  );

  if (createdOnboardingId) {
    return (
      <OnboardingResponse
        onboardingId={createdOnboardingId}
        onBack={() => setCreatedOnboardingId(null)}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-ink sm:text-5xl">
            Crea tu Cuenta Segura
          </h1>
          <p className="mt-3 text-lg font-medium text-gray-500">
            Proporciona tus datos para iniciar la solicitud de registro.
          </p>
        </div>

        <OnboardingForm onCreated={(id) => setCreatedOnboardingId(id)} />
      </main>
    </div>
  );
}

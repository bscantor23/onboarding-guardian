import { OnboardingForm } from "@/components/onboarding/OnboardingForm";

export default function OnboardingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-tight text-ink sm:text-5xl">
            Crea tu Cuenta Segura
          </h1>
          <p className="mt-3 text-lg font-medium text-gray-500">
            Proporciona tus datos para iniciar la solicitud de registro.
          </p>
        </div>

        <OnboardingForm />
      </main>
    </div>
  );
}

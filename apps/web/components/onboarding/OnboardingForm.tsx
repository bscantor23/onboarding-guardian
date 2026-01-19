"use client";

import { useEffect, useState } from "react";
import { OnboardingService } from "@/lib/services/onboarding.service";
import { Button } from "@/components/ui/Button";
import { tokenStore } from "@/lib/auth/token";

export function OnboardingForm() {
  const service = new OnboardingService();

  const [fullName, setFullName] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [initialAmount, setinitialAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    setLoading(true);
    try {
      const res = await service.create({
        fullName: fullName.trim(),
        document: document.trim(),
        email: email.trim(),
        initialAmount: initialAmount.trim(),
      });

      setMessage(`Solicitud creada: ${res.onboardingId} (${res.status})`);
    } catch {
      setError(
        "No fue posible crear la solicitud. Verifica tu sesión e intenta de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = tokenStore.get();
    if (!token) {
      globalThis.location.assign("/login");
    }
  }, []);

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-8 shadow-2xl shadow-black/5">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="px-1 text-sm font-bold text-ink"
            >
              Nombre Completo
            </label>
            <input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-14 rounded-xl border border-mint bg-surface px-4 text-ink outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Ingresa tu nombre completo"
              autoComplete="name"
              required
            />
            <p className="px-1 text-[10px] font-medium text-gray-500">
              Nombre completo según documento oficial
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="document"
              className="px-1 text-sm font-bold text-ink "
            >
              Número de Documento
            </label>
            <input
              id="document"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              className="h-14 rounded-xl border border-mint bg-surface px-4 text-ink outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="ej. Documento"
              required
            />
            <p className="px-1 text-[10px] font-medium text-gray-500">
              Cédula, Documento de Identidad o Pasaporte
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="px-1 text-sm font-bold text-ink">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 rounded-xl border border-mint bg-surface px-4 text-ink outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="guardian@onboarding.com"
              autoComplete="email"
              required
            />
            <p className="px-1 text-[10px] font-medium text-gray-500">
              Correo electrónico válido
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="initialAmount"
              className="px-1 text-sm font-bold text-ink"
            >
              Monto Inicial de Depósito
            </label>
            <input
              id="initialAmount"
              type="number"
              value={initialAmount}
              onChange={(e) => setinitialAmount(e.target.value)}
              className="h-14 rounded-xl border border-mint bg-surface px-4 text-ink outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />

            <p className="px-1 text-[10px] font-medium text-gray-500">
              Monto a solicitar inicialmente
            </p>
          </div>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
            {message}
          </div>
        ) : null}

        <Button
          type="submit"
          className="h-14 w-full rounded-xl"
          disabled={loading}
        >
          {loading ? "CREANDO..." : "CREAR SOLICITUD"}
        </Button>
      </form>
    </div>
  );
}

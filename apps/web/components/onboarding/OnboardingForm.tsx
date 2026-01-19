"use client";

import { useEffect, useState } from "react";
import { OnboardingService } from "@/lib/services/onboarding.service";
import { Button } from "@/components/ui/Button";
import { tokenStore } from "@/lib/auth/token";
import { FullscreenLoader } from "../ui/FullscreenLoader";
import { useToast } from "../ui/ToastProvider";
import { TextField } from "../ui/TextField";
import {
  faIdCard,
  faMailBulk,
  faMoneyBill,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export function OnboardingForm({
  onCreated,
}: Readonly<{ onCreated: (id: string) => void }>) {
  const { showToast } = useToast();

  const service = new OnboardingService();

  const [fullName, setFullName] = useState("");
  const [document, setDocument] = useState("");
  const [email, setEmail] = useState("");
  const [initialAmount, setInitialAmount] = useState("");

  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await service.create({
        fullName: fullName.trim(),
        document: document.trim(),
        email: email.trim(),
        initialAmount: initialAmount.trim(),
      });

      onCreated(response.onboardingId);
      showToast("Solicitud registrada. Redirigiendo...", "success", 1000);
    } catch (e: any) {
      if (e?.message === "Unauthorized") {
        showToast("Sesión expirada. Redireccionando a login", "error", 1000);
        setTimeout(() => {
          tokenStore.clear();
          globalThis.location.assign("/login");
        }, 2000);
      }

      showToast(
        "No fue posible crear la solicitud. Verifica tu sesión e intenta de nuevo.",
        "error",
        5000,
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
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
            <TextField
              id="fullName"
              label="Nombre Completo"
              placeholder="Ingresa tu nombre completo"
              value={fullName}
              onChange={setFullName}
              icon={faUser}
              required
            />
            <p className="px-1 text-[10px] font-medium text-gray-500">
              Nombre completo según documento oficial
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <TextField
              id="document"
              label="Número de Documento"
              placeholder="ej. Documento"
              value={document}
              onChange={setDocument}
              icon={faIdCard}
              required
            />
            <p className="px-1 text-[10px] font-medium text-gray-500">
              Cédula, Documento de Identidad o Pasaporte
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <TextField
              id="email"
              label="Correo Electrónico"
              placeholder="guardian@onboarding.com"
              value={email}
              type="email"
              onChange={setEmail}
              icon={faMailBulk}
              required
            />
            <p className="px-1 text-[10px] font-medium text-gray-500">
              Correo electrónico válido
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <TextField
              id="initialAmount"
              label="Monto Inicial de Depósito"
              placeholder="0.00"
              value={initialAmount}
              type="number"
              onChange={setInitialAmount}
              icon={faMoneyBill}
              required
            />

            <p className="px-1 text-[10px] font-medium text-gray-500">
              Monto a solicitar inicialmente
            </p>
          </div>
        </div>

        <Button
          type="submit"
          className="h-14 w-full rounded-xl"
          disabled={loading}
        >
          {loading ? "CREANDO..." : "CREAR SOLICITUD"}
        </Button>
      </form>

      <FullscreenLoader open={loading} label="Validando credenciales..." />
    </div>
  );
}

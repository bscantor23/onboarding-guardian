"use client";

import { LoginPayload, validateLogin } from "@/lib/validators";
import { useMemo, useState } from "react";
import { TextField } from "../ui/TextField";
import {
  faArrowRight,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthService } from "@/lib/services/auth.service";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastProvider";
import { FullscreenLoader } from "../ui/FullscreenLoader";
import { tokenStore } from "@/lib/auth/token";

type AuthGateway = {
  login: (payload: LoginPayload) => Promise<void>;
};

const authService = new AuthService();

export function LoginForm({
  gateway,
}: Readonly<{
  gateway?: AuthGateway;
}>) {
  const { showToast } = useToast();

  const defaultGateway: AuthGateway = {
    async login(payload) {
      const response = await authService.login(payload);
      tokenStore.set(response.accessToken);
    },
  };

  const effectiveGateway = gateway ?? defaultGateway;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const payload = useMemo<LoginPayload>(
    () => ({ username, password }),
    [username, password],
  );
  const validation = useMemo(() => validateLogin(payload), [payload]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setClicked(true);

    if (!validation.ok) return;

    try {
      setLoading(true);
      await effectiveGateway.login(payload);

      showToast("Ingreso exitoso. Redirigiendo...", "success", 1000);

      setTimeout(() => {
        globalThis.location.assign("/onboarding");
      }, 1000);
    } catch (e: any) {
      const msg =
        e?.message === "Invalid credentials"
          ? "Credenciales inválidas. Verifica e intenta de nuevo."
          : "Ocurrió un error al iniciar sesión.";

      showToast(msg, "error", 2000);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setClicked(false);
      }, 1000);
    }
  }

  const errors = clicked ? validation.errors : {};

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-5">
        <TextField
          id="username"
          label="Usuario"
          placeholder="Digite sus credenciales"
          value={username}
          onChange={setUsername}
          icon={faUser}
          error={errors.username}
          autoComplete="username"
        />

        <TextField
          id="password"
          label="Clave"
          type="password"
          placeholder="*******"
          value={password}
          onChange={setPassword}
          icon={faLock}
          error={errors.password}
          autoComplete="current-password"
          rightSlot={
            <a
              className="text-xs font-bold text-primary hover:underline"
              href="/"
            >
              ¿Olvidaste tu clave?
            </a>
          }
        />

        <Button type="submit" disabled={loading}>
          <span>Iniciar sesión</span>
          <span className="transition-transform group-hover:translate-x-1">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </Button>
      </form>

      <FullscreenLoader open={loading} label="Validando credenciales..." />
    </>
  );
}

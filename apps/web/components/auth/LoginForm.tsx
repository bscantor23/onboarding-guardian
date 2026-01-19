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

type AuthGateway = {
  login: (payload: LoginPayload) => Promise<void>;
};

const authService = new AuthService();

const defaultGateway: AuthGateway = {
  async login(payload) {
    const response = await authService.login(payload);

    localStorage.setItem("access_token", response.accessToken);
    globalThis.location.href = "/dashboard";
  },
};

export function LoginForm({
  gateway = defaultGateway,
}: Readonly<{
  gateway?: AuthGateway;
}>) {
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
      await gateway.login(payload);
    } finally {
      setClicked(false);
    }
  }

  const errors = clicked ? validation.errors : {};

  return (
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
  );
}

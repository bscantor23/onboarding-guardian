export type LoginPayload = {
  username: string;
  password: string;
};

export function validateLogin(payload: LoginPayload) {
  const errors: Partial<Record<keyof LoginPayload, string>> = {};

  if (!payload.username.trim()) errors.username = "El usuario es requerido";
  if (payload.password.length < 6)
    errors.password = "La clave debe ser de al menos 6 caracteres";

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}

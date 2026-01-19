const KEY = process.env.NEXT_PUBLIC_API_JWT_SECRET ?? "access_token";

function isBrowser() {
  return typeof globalThis.window !== "undefined";
}

export const tokenStore = {
  get(): string | null {
    if (!KEY) return null;
    if (!isBrowser()) return null;
    return localStorage.getItem(KEY);
  },
  set(token: string) {
    if (!KEY) return null;
    if (!isBrowser()) return;
    localStorage.setItem(KEY, token);
  },
  clear() {
    if (!KEY) return null;
    if (!isBrowser()) return;
    localStorage.removeItem(KEY);
  },
};

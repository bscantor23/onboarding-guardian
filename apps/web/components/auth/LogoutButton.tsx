"use client";

import { tokenStore } from "@/lib/auth/token";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function onLogout() {
  tokenStore.clear();
  globalThis.location.assign("/login");
}

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={onLogout}
      className="inline-flex h-10 items-center justify-center rounded-lg bg-red-50 px-4 text-sm font-bold text-red-700 transition-colors hover:bg-red-100"
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
      Cerrar sesión
    </button>
  );
}

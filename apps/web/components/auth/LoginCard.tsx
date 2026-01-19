import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SurfaceCard } from "../ui/SurfaceCard";
import {
  faShieldHalved,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { LoginForm } from "./LoginForm";

export function LoginCard() {
  return (
    <SurfaceCard className="max-w-105">
      <div className="mb-6 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mint text-primary shadow-sm">
          <FontAwesomeIcon icon={faShieldHalved} className="text-2xl" />
        </div>
      </div>
      <div className="mb-8 text-center">
        <h1 className="pb-2 text-[32px] font-bold text-ink">Onboarding</h1>
        <p className="text-base font-normal text-gray-500">
          Seguridad automatizada para aperturas virtuales
        </p>

        <LoginForm />

        <div className="mt-8 border-t border-mint pt-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-2 text-xs font-semibold uppercase text-mintText">
            <FontAwesomeIcon icon={faUserShield} className="text-sm" />
            <span>Protegido por Onboarding Guardian</span>
          </div>

          <p className="text-xs text-gray-400">
            Encriptación activamente monitoreada para la sesión
          </p>
        </div>
      </div>
    </SurfaceCard>
  );
}

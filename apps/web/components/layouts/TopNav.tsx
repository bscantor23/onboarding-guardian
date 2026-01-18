import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function TopNav() {
  return (
    <header className="z-10 flex items-center justify-between border-b border-mint bg-white/80 px-4 py-4 sm:px-10">

      <div className="flex items-center gap-3 text-primary">
        <span className="inline-flex h-6w-6 items-center justify-center">
          <FontAwesomeIcon icon={faShieldHalved} className="text-xl" />
        </span>
        <h2 className="text-lg font-bold text-ink">
          Onboarding Guardian
        </h2>
      </div>
    </header>
  );
}

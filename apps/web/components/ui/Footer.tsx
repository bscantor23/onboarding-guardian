export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-surface py-12">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row">
        <span className="text-sm font-bold text-gray-500">
          Onboarding Guardian © 2026
        </span>
        <div className="flex gap-8">
          <a
            className="text-xs font-semibold text-gray-400 hover:text-primary transition-colors"
            href="/"
          >
            Política de Privacidad
          </a>
          <a
            className="text-xs font-semibold text-gray-400 hover:text-primary transition-colors"
            href="/"
          >
            Términos y Condiciones
          </a>
          <a
            className="text-xs font-semibold text-gray-400 hover:text-primary transition-colors"
            href="/"
          >
            Soporte
          </a>
        </div>
      </div>
    </footer>
  );
}

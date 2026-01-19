import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6">
        <h1 className="mb-10 text-5xl font-black tracking-tight text-ink sm:text-6xl md:text-8xl">
          El Guardian de las{" "}
          <span className="text-primary">Aperturas Bancarias</span>
        </h1>

        <p className="mx-auto mb-14 max-w-3xl text-lg leading-relaxed text-gray-500 sm:text-xl md:text-xl">
          Sistema de registro digital bancario que protege los procesos de
          incorporación digital para nuevos clientes de acuerdo con catálogos de
          productos bancarios. Te invitamos a conocer más de nuestro ecosistema
          y los procesos para aperturar tu nuevo producto de forma completamente
          digital.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Link
            href="/products"
            className="group inline-flex h-16 items-center justify-center gap-2 rounded-full bg-primary px-12 text-xl font-bold text-white shadow-xl shadow-primary/30 transition-transform hover:scale-[1.03] hover:bg-emerald-900 active:scale-[0.97]"
          >
            Ver catálogo
          </Link>
        </div>
      </main>

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[15%] left-[10%] h-130 w-130 rounded-full bg-primary/5 blur-[140px]" />
        <div className="absolute -bottom-[15%] right-[10%] h-130 w-130 rounded-full bg-blue-400/5 blur-[140px]" />
      </div>
    </div>
  );
}

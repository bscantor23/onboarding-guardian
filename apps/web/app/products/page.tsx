import Link from "next/link";
import { ProductsService } from "@/lib/services/products.service";
import { ProductsGrid } from "@/components/products/ProductsGrid";

type SearchParams = {
  type?: string;
};

const TABS = [
  { label: "Todos los productos", code: "ALL" },
  { label: "Cuentas de ahorros", code: "SAVINGS" },
  { label: "Cuentas corrientes", code: "CHECKING" },
  { label: "Créditos", code: "CREDIT" },
  { label: "Inversiones", code: "INVESTMENT" },
  { label: "Préstamos", code: "LOAN" },
  { label: "Cuentas digitales", code: "DIGITAL" },
] as const;

export default async function ProductsPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<SearchParams>;
}>) {
  const sp = await searchParams;
  const selectedType = (sp.type ?? "ALL").toUpperCase();

  const service = new ProductsService();

  let products: Awaited<ReturnType<ProductsService["list"]>> = [];
  let errorMessage: string | null = null;

  try {
    products = await service.list();
  } catch (e: any) {
    console.log(e);
    errorMessage = "Error al cargar los productos.";
  }

  const filteredProducts =
    selectedType === "ALL"
      ? products
      : products.filter((p) => p.type?.code?.toUpperCase() === selectedType);

  const renderContent = () => {
    if (errorMessage) {
      return (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      );
    }

    if (filteredProducts.length === 0) {
      return (
        <div className="rounded-xl border border-mint bg-surface p-8 text-center text-gray-600">
          No se encontraron registros.
        </div>
      );
    }

    return <ProductsGrid products={filteredProducts} />;
  };

  return (
    <div className="relative overflow-hidden">
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h1 className="mb-3 text-3xl font-black tracking-tight text-ink md:text-4xl">
              Catálogo Productos
            </h1>
            <p className="text-lg text-gray-500">
              Descubre nuestras soluciones bancarias para tu crecimiento digital
            </p>
          </div>
        </div>

        <div className="mb-10 overflow-x-auto">
          <div className="flex min-w-max gap-8 border-b border-gray-200">
            {TABS.map((t) => {
              const isActive = t.code === selectedType;
              const href =
                t.code === "ALL" ? "/products" : `/products?type=${t.code}`;

              return (
                <Link
                  key={t.code}
                  href={href}
                  className={
                    isActive
                      ? "border-b-2 border-primary px-1 pb-4 text-sm font-bold text-primary"
                      : "border-b-2 border-transparent px-1 pb-4 text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
                  }
                >
                  {t.label}
                </Link>
              );
            })}
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
}

import { Product } from "@/lib/services/products.service";
import {
  faBuildingColumns,
  faChartLine,
  faChevronRight,
  faCoins,
  faCreditCard,
  faMoneyBillWave,
  faPiggyBank,
  faTag,
  faUsers,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../ui/Button";
import { formatMoney } from "@/lib/utils/formatMoney";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { parseAudienceType } from "@/lib/utils/productParsers";

export function ProductCard({
  product,
  onViewDetails,
}: {
  product: Product;
  onViewDetails: (id: string) => void;
}) {
  const TYPE_ICON_MAP: Record<string, IconDefinition> = {
    SAVINGS: faPiggyBank,
    CHECKING: faBuildingColumns,
    CREDIT: faCreditCard,
    INVESTMENT: faChartLine,
    LOAN: faMoneyBillWave,
    DIGITAL: faWallet,
    DEFAULT: faTag,
  };

  const typeCode = product.type.code.toUpperCase() ?? "DEFAULT";
  const icon = TYPE_ICON_MAP[typeCode];

  const currencyCode = product?.currency?.code ?? "COP";
  const audience = product?.audienceType;

  const minText = formatMoney(Number(product.minAmount), currencyCode);
  const maxText = formatMoney(Number(product.maxAmount), currencyCode);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-mint bg-surface p-8 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/50">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-mint/20 blur-3xl" />
      </div>

      <div className="relative">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-primary ring-1 ring-primary/10">
            <FontAwesomeIcon icon={icon} className="text-2xl" />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {audience ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[10px] font-black uppercase text-gray-700">
                <FontAwesomeIcon icon={faUsers} className="h-3.5 w-3.5" />
                {parseAudienceType(audience)}
              </span>
            ) : null}

            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-[10px] font-black uppercase text-gray-600">
              <FontAwesomeIcon icon={faCoins} className="h-3.5 w-3.5" />
              {currencyCode}
            </span>
          </div>
        </div>

        <h3 className="mb-2 text-xl font-extrabold text-ink">{product.name}</h3>

        <p className="mb-6 line-clamp-2 text-sm text-gray-500">
          {product.headline?.trim() ||
            "Sin descripción disponible para este producto"}
        </p>

        <div className="mb-8 flex w-full items-center justify-between gap-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[10px] font-bold uppercase text-slate-400">
              Monto mínimo
            </p>
            <span className="block truncate text-lg font-black text-ink">
              {minText}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[10px] font-bold uppercase text-slate-400">
              Monto máximo
            </p>
            <span className="block truncate text-lg font-black text-ink">
              {maxText}
            </span>
          </div>
        </div>

        <Button
          onClick={() => onViewDetails(product.id)}
          type="button"
          className="h-12 w-full rounded-xl"
        >
          <span>Ver detalles</span>
          <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4 text-sm" />
        </Button>
      </div>
    </article>
  );
}

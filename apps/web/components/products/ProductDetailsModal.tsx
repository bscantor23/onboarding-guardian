"use client";

import { Product, ProductsService } from "@/lib/services/products.service";
import { formatMoney } from "@/lib/utils/formatMoney";
import { parseRequirements } from "@/lib/utils/formatRequirements";
import {
  parseAudienceType,
  parseProductType,
} from "@/lib/utils/productParsers";
import {
  faArrowRight,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = Readonly<{
  open: boolean;
  productId: string | null;
  onClose: () => void;
}>;

export function ProductDetailsModal({ open, productId, onClose }: Props) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const service = new ProductsService();

  useEffect(() => {
    if (!open || !productId) return;

    setLoading(true);
    setError(null);
    setData(null);

    service
      .getById(productId)
      .then(setData)
      .catch(() => setError("No fue posible cargar el producto"))
      .finally(() => setLoading(false));
  }, [open, productId]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const requirements = parseRequirements(data?.requirements);

  const minText = formatMoney(Number(data?.minAmount), data?.currency?.code);
  const maxText = formatMoney(Number(data?.maxAmount), data?.currency?.code);

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 p-4"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      >
        <div className="mb-6 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-bold uppercase text-primary">
                Detalles del producto
              </span>

              <span className="text-sm font-mono text-slate-400">
                CODE: {data?.code}
              </span>
            </div>

            <h2 className="text-2xl font-black">
              {loading ? "Cargando..." : data?.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-primary text-xl"
          >
            <FontAwesomeIcon icon={faXmark} className="text-xl" />
          </button>
        </div>

        {error ? (
          <div className="rounded-lg bg-red-100 p-4 text-red-700 font-semibold">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Descripción
              </span>
              <p className="text-lg font-bold">{data?.headline || "—"}</p>
            </div>

            <div className="md:col-span-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Información General
              </span>
              <p
                className="text-sm text-slate-600"
                style={{ textAlign: "justify" }}
              >
                {data?.generalInfo || "—"}
              </p>
            </div>

            <div className="md:col-span-2 bg-slate-50  p-4 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400 mb-2 block">
                Requerimientos
              </span>
              <ul className="grid md:grid-cols-2 gap-2">
                {requirements.map((requirement: string) => (
                  <li
                    key={requirement}
                    className="text-sm flex gap-2 items-center"
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-sm text-primary"
                    />
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Público Objetivo
              </span>
              <p className="font-bold uppercase">
                {parseAudienceType(data?.audienceType)}
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Tasa
              </span>
              <p className="font-bold">
                {data?.rate || "—"}% {data?.rateType || "—"}
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Moneda
              </span>
              <p className="font-bold">{data?.currency.code}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Tipo de Producto
              </span>
              <p className="font-bold uppercase">
                {parseProductType(data?.type.code)}
              </p>
            </div>

            <div className="p-4 bg-primary/5 rounded-lg">
              <span className="text-[10px] font-bold text-primary uppercase mb-1 block">
                Monto mínimo
              </span>
              <div className="flex items-baseline gap-1">
                <span className="block truncate text-lg font-black text-ink">
                  {minText}
                </span>
              </div>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <span className="text-[10px] font-bold text-primary uppercase mb-1 block">
                Monto máximo
              </span>
              <div className="flex items-baseline gap-1">
                <span className="block truncate text-lg font-black text-ink">
                  {maxText}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <Link
            href="/login"
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-primary py-3 font-bold text-white transition-colors hover:bg-primary/90"
          >
            Realizar aplicación
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
          <button
            onClick={onClose}
            className="rounded-xl px-6 py-3 font-bold text-slate-500 hover:bg-slate-100"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

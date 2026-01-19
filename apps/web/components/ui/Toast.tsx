"use client";

import { useEffect, useState } from "react";
type ToastVariant = "success" | "error";

export function Toast({
  open,
  message,
  variant,
  duration = 3000,
  onClose,
}: Readonly<{
  open: boolean;
  message: string;
  variant: ToastVariant;
  duration?: number;
  onClose: () => void;
}>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      const t = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 200);
      }, duration);

      return () => clearTimeout(t);
    }
  }, [open, duration, onClose]);

  if (!open) return null;

  const styles =
    variant === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-red-200 bg-red-50 text-red-800";

  return (
    <div className="fixed bottom-10 right-5 z-200 pointer-events-none">
      <div
        className={`min-w-70 max-w-90 rounded-xl border p-4 shadow-lg transform transition-all duration-300 ease-in-out
          ${visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}
          ${styles}`}
      >
        <p className="text-sm font-bold">{message}</p>
      </div>
    </div>
  );
}

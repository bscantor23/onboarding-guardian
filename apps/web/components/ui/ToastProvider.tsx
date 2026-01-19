"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Toast } from "./Toast";

type ToastVariant = "success" | "error";

type ToastContextType = {
  showToast: (
    message: string,
    variant?: ToastVariant,
    duration?: number,
  ) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState<ToastVariant>("success");
  const [duration, setDuration] = useState(3000);

  const showToast = useCallback(
    (msg: string, v: ToastVariant = "success", d = 3000) => {
      setMessage(msg);
      setVariant(v);
      setDuration(d);
      setOpen(true);
    },
    [],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast
        open={open}
        message={message}
        variant={variant}
        duration={duration}
        onClose={() => setOpen(false)}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
}

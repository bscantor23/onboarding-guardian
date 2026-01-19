"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export function FullscreenLoader({
  open,
}: Readonly<{
  open: boolean;
  label?: string;
}>) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          size="2x"
          className="text-primary"
        />
      </div>
    </div>
  );
}

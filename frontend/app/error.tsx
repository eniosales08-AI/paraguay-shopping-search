"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--color-bg)]">
      <h1 className="text-xl font-semibold text-[var(--color-text)] mb-2">
        Algo salió mal
      </h1>
      <p className="text-[var(--color-text-muted)] mb-6 text-center max-w-md">
        {error.message || "Ocurrió un error inesperado."}
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-[var(--color-primary-hover)]"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="px-4 py-2 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface)]"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

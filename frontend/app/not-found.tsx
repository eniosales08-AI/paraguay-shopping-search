import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--color-bg)]">
      <h1 className="text-xl font-semibold text-[var(--color-text)] mb-2">
        Página no encontrada
      </h1>
      <p className="text-[var(--color-text-muted)] mb-6">
        La página que buscás no existe.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-[var(--color-primary-hover)]"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

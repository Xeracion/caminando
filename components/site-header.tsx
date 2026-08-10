import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/becas", label: "Becas" },
  { href: "/trabajo", label: "Trabajo" },
  { href: "/migracion", label: "Migración" },
  { href: "/historias", label: "Historias" },
  { href: "/sobre-pam", label: "Sobre Pam" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          Caminando<span className="text-sun-deep">.</span>lat
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap font-body text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/oportunidades"
            className="hidden rounded-lg bg-sun px-4 py-2 font-body text-sm font-bold text-navy-deep transition-transform hover:-translate-y-px sm:inline-block"
          >
            Buscar oportunidades
          </Link>
        </div>
      </div>
    </header>
  );
}

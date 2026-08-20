"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

/** Hamburger menu shown below the `lg` breakpoint — the header's own nav/CTA are hidden there. */
export function MobileNav({ navItems, ctaLabel }: { navItems: NavItem[]; ctaLabel: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-strong"
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full border-b border-line bg-paper px-6 py-6 shadow-lg"
        >
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 font-body text-base font-medium text-ink transition-colors hover:bg-surface-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/oportunidades"
            className="mt-4 flex items-center justify-center rounded-lg bg-sun px-4 py-3 font-body text-sm font-bold text-navy-deep transition-transform hover:-translate-y-px"
          >
            {ctaLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

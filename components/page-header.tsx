import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  dek: string;
  action?: ReactNode;
};

/**
 * The repeating page pattern from the IA doc: Eyebrow > H1 > Dek > Acción.
 * Used by every hub-level page so the hierarchy stays recognizable at scale.
 */
export function PageHeader({ eyebrow, title, dek, action }: Props) {
  return (
    <header className="border-b border-line py-14 sm:py-20">
      <div data-reveal className="mx-auto max-w-6xl px-6">
        <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-navy-light">{eyebrow}</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.08] sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-xl text-lg text-ink-muted">{dek}</p>
        {action ? <div className="mt-8">{action}</div> : null}
      </div>
    </header>
  );
}

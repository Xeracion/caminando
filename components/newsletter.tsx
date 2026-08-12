"use client";

import { useState, type FormEvent } from "react";

export function Newsletter({ title, body }: { title?: string; body?: string }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="newsletter" data-reveal className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h2 className="text-3xl font-semibold sm:text-4xl">
        {title || "Una oportunidad nueva cada semana, directo a tu correo."}
      </h2>
      <p className="mt-3 text-ink-muted">{body || "Sin spam, sin ruido. Puedes darte de baja cuando quieras."}</p>

      {submitted ? (
        <p className="mx-auto mt-8 max-w-sm rounded-lg bg-surface-2 px-6 py-4 text-sm font-semibold text-ink">
          Listo — revisa tu correo para confirmar la suscripción.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="tucorreo@ejemplo.com"
            className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm placeholder:text-ink-muted focus:border-navy-light"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-sun px-6 py-3 font-body text-sm font-bold text-navy-deep transition-transform hover:-translate-y-px"
          >
            Suscribirme
          </button>
        </form>
      )}
    </section>
  );
}

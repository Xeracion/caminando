import Link from "next/link";
import { countries } from "@/lib/data/countries";

function ComingSoon({ label }: { label: string }) {
  return <span className="text-ink-muted/60">{label} · próximamente</span>;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div>
            <h3 className="font-body text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
              Oportunidades
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/oportunidades" className="hover:text-navy-light">
                  Todas las oportunidades
                </Link>
              </li>
              <li>
                <Link href="/oportunidades?categoria=beca" className="hover:text-navy-light">
                  Becas
                </Link>
              </li>
              <li>
                <Link href="/oportunidades?categoria=trabajo" className="hover:text-navy-light">
                  Trabajo
                </Link>
              </li>
              <li>
                <Link href="/oportunidades?categoria=migracion" className="hover:text-navy-light">
                  Migración
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-body text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Países</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {countries.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link href={`/paises/${c.slug}`} className="hover:text-navy-light">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-body text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Historias</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/historias" className="hover:text-navy-light">
                  Todas las historias
                </Link>
              </li>
              <li>
                <Link href="/#newsletter" className="hover:text-navy-light">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-body text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">Compañía</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/#sobre-pam" className="hover:text-navy-light">
                  Sobre Pam
                </Link>
              </li>
              <li>
                <ComingSoon label="Prensa" />
              </li>
              <li>
                <ComingSoon label="Contacto" />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-8 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Un proyecto de Pam Guerrero</p>
          <p>© {new Date().getFullYear()} Caminando.lat — Las oportunidades existen. Te ayudamos a encontrarlas.</p>
        </div>
      </div>
    </footer>
  );
}

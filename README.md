# Caminando.lat

Plataforma editorial de oportunidades internacionales para latinoamericanos —
becas, trabajo y rutas de migración. Un proyecto de Pam Guerrero.

Este repositorio contiene la Fase 2: la implementación en código (Next.js +
Tailwind) de la estrategia de marca, producto, SEO y motor de contenido
definida previamente. Incluye la Home completa y tres páginas piloto:
`/oportunidades` (directorio maestro), `/paises/[slug]` (hub país, ejemplo
`/paises/espana`) e `/historias`.

## Empezar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Decisiones clave implementadas

- **Sistema de diseño** en `app/globals.css` vía tokens de Tailwind v4
  (`@theme`): azul marino como color dominante, blanco cálido de fondo,
  amarillo reservado únicamente para llamadas a la acción reales. Tipografía
  serif editorial para titulares + sans de sistema para UI, ambas con pila de
  fuentes de sistema (sin dependencias de red). Modo oscuro vía clase `.dark`
  con los mismos tokens redefinidos.
- **Motor de ciclo de vida** (`lib/lifecycle.ts`): cada oportunidad pasa de
  Activa → Por cerrar → Cerrada según su `closingDate`. Una oportunidad
  cerrada nunca desaparece: se archiva y sugiere activas similares.
- **Buscador de divulgación progresiva**: la Home lanza en modo "Revista"
  (búsqueda discreta, sin aparentar un catálogo que aún no existe) y
  `/oportunidades` ya expone el explorador facetado completo — mismo modelo
  de datos, listo para escalar sin rediseño cuando el catálogo crezca.
- **Arquitectura SEO**: metadata por página, `sitemap.ts`/`robots.ts`,
  `generateStaticParams` para hubs de país, JSON-LD (Organization,
  BreadcrumbList) y URLs de filtros con `canonical` hacia la versión limpia.
- **Contenido de ejemplo**: los datos en `lib/data/` son ilustrativos, no
  listados verificados en vivo — ver `lib/data/opportunities.ts`.

## Estructura

```
app/                  Rutas (App Router)
components/           Componentes de UI compartidos
lib/types.ts          Modelo de datos
lib/lifecycle.ts       Motor de ciclo de vida de oportunidades
lib/data/              Contenido de ejemplo (países, oportunidades, historias)
```

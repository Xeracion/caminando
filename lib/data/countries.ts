import type { Country } from "../types";

export const countries: Country[] = [
  {
    slug: "espana",
    name: "España",
    region: "Europa",
    tagline: "El destino más buscado por hispanohablantes: mismo idioma, comunidad grande, puerta de entrada a la UE.",
  },
  {
    slug: "alemania",
    name: "Alemania",
    region: "Europa",
    tagline: "Economía fuerte y déficit de personal cualificado: becas de posgrado y trabajo con patrocinio de visa.",
  },
  {
    slug: "canada",
    name: "Canadá",
    region: "Norteamérica",
    tagline: "Rutas migratorias claras de estudio o trabajo hacia la residencia permanente.",
  },
  {
    slug: "mexico",
    name: "México",
    region: "Norteamérica",
    tagline: "Programas de posgrado con financiamiento público y creciente demanda de perfiles técnicos.",
  },
  {
    slug: "chile",
    name: "Chile",
    region: "Sudamérica",
    tagline: "Hub regional de trabajo remoto y tecnología dentro de Latinoamérica.",
  },
  {
    slug: "portugal",
    name: "Portugal",
    region: "Europa",
    tagline: "Visado D7 y comunidad latinoamericana en crecimiento — todavía estamos construyendo este hub.",
  },
];

export function getCountry(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}

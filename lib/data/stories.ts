import type { Story } from "../types";

export const stories: Story[] = [
  {
    slug: "de-bogota-a-un-laboratorio-en-munich",
    headline: "De Bogotá a un laboratorio en Múnich",
    dek: "Sara terminó ingeniería química en Colombia sin haber salido nunca del país. Dos años después, investiga baterías para vehículos eléctricos en Alemania.",
    countrySlug: "alemania",
    originCountry: "Colombia",
    theme: "Becas",
    readingMinutes: 6,
  },
  {
    slug: "la-visa-de-trabajo-que-tardo-once-meses",
    headline: "La visa de trabajo que tardó once meses en Lisboa",
    dek: "Nicolás cuenta, con fechas y trámites reales, cómo fue el proceso completo desde que recibió la oferta hasta que pisó Portugal.",
    countrySlug: "portugal",
    originCountry: "Argentina",
    theme: "Migración",
    readingMinutes: 8,
  },
  {
    slug: "seis-meses-despues-la-vida-real-en-toronto",
    headline: "Seis meses después: la vida real en Toronto",
    dek: "No todo fue fácil. Un balance honesto de costos, soledad y primeros logros después de migrar a Canadá con un permiso de trabajo.",
    countrySlug: "canada",
    originCountry: "México",
    theme: "Historias",
    readingMinutes: 7,
  },
  {
    slug: "la-beca-que-la-llevo-de-lima-a-barcelona",
    headline: "La beca que la llevó de Lima a Barcelona",
    dek: "Valentina aplicó tres veces antes de conseguirlo. Esto fue lo que cambió en su tercera postulación.",
    countrySlug: "espana",
    originCountry: "Perú",
    theme: "Becas",
    readingMinutes: 5,
  },
];

export function getStoriesByCountry(countrySlug: string): Story[] {
  return stories.filter((s) => s.countrySlug === countrySlug);
}

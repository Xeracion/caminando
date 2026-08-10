import type { MetadataRoute } from "next";
import { countries } from "@/lib/data/countries";

const SITE_URL = "https://caminando.lat";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/oportunidades",
    "/becas",
    "/trabajo",
    "/migracion",
    "/historias",
    "/sobre-pam",
    "/prensa",
    "/contacto",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const countryRoutes = countries.map((c) => ({
    url: `${SITE_URL}/paises/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...countryRoutes];
}

import type { MetadataRoute } from "next";
import { getCountries } from "@/lib/data/countries";
import { getStories } from "@/lib/data/stories";
import { getOpportunities } from "@/lib/data/opportunities";

const SITE_URL = "https://caminando.lat";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [countries, stories, opportunities] = await Promise.all([getCountries(), getStories(), getOpportunities()]);

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

  const storyRoutes = stories.map((s) => ({
    url: `${SITE_URL}/historias/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const opportunityRoutes = opportunities.map((o) => ({
    url: `${SITE_URL}/oportunidades/${o.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...countryRoutes, ...storyRoutes, ...opportunityRoutes];
}

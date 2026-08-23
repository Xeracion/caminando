// GROQ projections shaped to match lib/types.ts exactly, so the mapping layer
// in lib/data/ can hand Sanity results straight to components with no
// per-page reshaping.

export const countriesQuery = /* groq */ `
  *[_type == "country"] | order(name asc) {
    "slug": slug.current,
    name,
    region,
    tagline,
  }
`;

const opportunityProjection = /* groq */ `
  "slug": slug.current,
  category,
  "countrySlug": country->slug.current,
  title,
  summary,
  level,
  fundingNote,
  applicationUrl,
  closingDate,
  lastReviewed,
  visaSponsorship,
  remote,
  route,
  sourceName,
  sourceTier,
`;

export const opportunitiesQuery = /* groq */ `
  *[_type == "opportunity" && defined(country->slug.current)] | order(coalesce(closingDate, "9999-12-31") asc) {
    ${opportunityProjection}
  }
`;

const storyProjection = /* groq */ `
  _id,
  _type,
  "slug": slug.current,
  headline,
  dek,
  "countrySlug": country->slug.current,
  originCountry,
  theme,
  readingMinutes,
  "imageUrl": image,
  "imageAlt": image.alt,
  body,
`;

export const storiesQuery = /* groq */ `
  *[_type == "story" && defined(country->slug.current)] | order(_createdAt desc) {
    ${storyProjection}
  }
`;

export const siteSettingsQuery = /* groq */ `
  *[_type == "siteSettings"][0] {
    _id,
    _type,
    "heroImage": heroImage,
    "heroImageAlt": heroImage.alt,
    "founderImage": founderImage,
    "founderImageAlt": founderImage.alt,
    "quickAccessEstudiarImage": quickAccessEstudiarImage,
    "quickAccessEstudiarImageAlt": quickAccessEstudiarImage.alt,
    "quickAccessTrabajarImage": quickAccessTrabajarImage,
    "quickAccessTrabajarImageAlt": quickAccessTrabajarImage.alt,
    "quickAccessMigrarImage": quickAccessMigrarImage,
    "quickAccessMigrarImageAlt": quickAccessMigrarImage.alt,
    "quickAccessHistoriasImage": quickAccessHistoriasImage,
    "quickAccessHistoriasImageAlt": quickAccessHistoriasImage.alt,

    heroEyebrow,
    heroHeadline,
    heroSubheadline,
    heroCtaLabel,

    aboutTeaserEyebrow,
    aboutTeaserTitle,
    aboutTeaserBody1,
    aboutTeaserBody2,
    aboutTeaserLinkLabel,

    aboutPageEyebrow,
    aboutPageTitle,
    aboutPageIntro,
    aboutPageMission,
    aboutPageCtaLabel,
    timeline,
    mentionsEmptyText,

    oportunidadesHeader,
    becasHeader,
    trabajoHeader,
    migracionHeader,
    historiasHeader,
    contactoHeader,
    prensaHeader,

    headerCtaLabel,
    newsletterTitle,
    newsletterBody,
    footerTagline,
  }
`;

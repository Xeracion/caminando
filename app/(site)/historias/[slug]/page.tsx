import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { EditorialPhoto } from "@/components/editorial-photo";
import { getStories, getStory } from "@/lib/data/stories";
import { getCountry } from "@/lib/data/countries";

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return {};
  return {
    title: story.headline,
    description: story.dek,
    alternates: { canonical: `/historias/${story.slug}` },
    openGraph: story.imageUrl ? { images: [{ url: story.imageUrl }] } : undefined,
  };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();

  const country = await getCountry(story.countrySlug);
  const destination = `${story.originCountry} → ${country?.name ?? story.countrySlug}`;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: story.headline,
            description: story.dek,
            image: story.imageUrl,
            author: { "@type": "Organization", name: "Caminando.lat" },
          }),
        }}
      />

      <div className="mx-auto max-w-3xl px-6 pb-6 pt-16">
        <Link href="/historias" className="text-sm font-semibold text-navy-light hover:underline">
          ← Todas las historias
        </Link>
        <p className="mt-6 font-body text-xs font-bold uppercase tracking-[0.14em] text-navy-light">
          {story.theme} · {destination} · {story.readingMinutes} min de lectura
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-[1.1] sm:text-5xl">{story.headline}</h1>
        <p className="mt-5 text-lg text-ink-muted">{story.dek}</p>
      </div>

      <div data-reveal className="mx-auto max-w-5xl px-6">
        <EditorialPhoto
          src={story.imageUrl}
          alt={story.imageAlt ?? destination}
          dataAttribute={story.imageDataAttribute}
          tone="warm"
          className="aspect-[16/9]"
        />
      </div>

      <div data-reveal className="mx-auto max-w-3xl px-6 py-14">
        {story.body && story.body.length > 0 ? (
          <div className="prose-story">
            <PortableText value={story.body} />
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-line-strong p-8 text-center text-sm text-ink-muted">
            El reportaje completo está en preparación — por ahora, el resumen de arriba es todo lo que tenemos
            publicado de esta historia.
          </p>
        )}
      </div>
    </main>
  );
}

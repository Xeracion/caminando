import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { StoryCard } from "@/components/story-card";
import { getStories } from "@/lib/data/stories";
import { getSiteSettings } from "@/lib/data/site-settings";

export const metadata: Metadata = {
  title: "Historias reales de latinoamericanos en el mundo",
  description: "Reportajes, no testimonios: cómo fue de verdad el proceso, contado por quienes ya lo vivieron.",
  alternates: { canonical: "/historias" },
};

export default async function HistoriasPage() {
  const [stories, settings] = await Promise.all([getStories(), getSiteSettings()]);
  const [first, ...rest] = stories;
  const header = settings.historiasHeader;

  return (
    <main>
      <PageHeader
        eyebrow={header?.eyebrow || "Historias"}
        title={header?.title || "Reportajes, no testimonios"}
        dek={
          header?.dek ||
          "Nada de citas de cliente satisfecho. Estas son las decisiones, los costos y los tropiezos reales detrás de cada mudanza."
        }
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <StoryCard story={first} large />

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-line pt-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { EditorialPhoto } from "./editorial-photo";
import { getCountry } from "@/lib/data/countries";
import type { Story } from "@/lib/types";

export async function StoryCard({ story, large = false }: { story: Story; large?: boolean }) {
  const country = await getCountry(story.countrySlug);
  const destination = `${story.originCountry} → ${country?.name ?? story.countrySlug}`;

  return (
    <Link href={`/historias/${story.slug}`} data-reveal className="group block">
      <EditorialPhoto
        src={story.imageUrl}
        alt={story.imageAlt ?? destination}
        dataAttribute={story.imageDataAttribute}
        tone="warm"
        className={large ? "aspect-[16/10]" : "aspect-[4/3]"}
      />
      <p className="mt-4 font-body text-xs font-bold uppercase tracking-[0.1em] text-navy-light">
        {story.theme} · {story.readingMinutes} min de lectura
      </p>
      <h3
        className={`mt-2 font-semibold leading-snug transition-colors group-hover:text-navy-light ${large ? "text-2xl sm:text-3xl" : "text-lg"}`}
      >
        {story.headline}
      </h3>
      <p className="mt-2 text-sm text-ink-muted">{story.dek}</p>
    </Link>
  );
}

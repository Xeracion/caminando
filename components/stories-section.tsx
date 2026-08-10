import Link from "next/link";
import { StoryCard } from "./story-card";
import { getStories } from "@/lib/data/stories";

export async function StoriesSection() {
  const stories = await getStories();
  const [first, ...rest] = stories;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-navy-light">Reportajes</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Historias reales</h2>
        </div>
        <Link href="/historias" className="text-sm font-semibold text-navy-light hover:underline">
          Ver todas →
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <StoryCard story={first} large />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-1">
          {rest.slice(0, 2).map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

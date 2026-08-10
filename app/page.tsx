import { Hero } from "@/components/hero";
import { QuickAccess } from "@/components/quick-access";
import { FeaturedOpportunities } from "@/components/featured-opportunities";
import { StoriesSection } from "@/components/stories-section";
import { AboutPam } from "@/components/about-pam";
import { Newsletter } from "@/components/newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <QuickAccess />
      <FeaturedOpportunities />
      <StoriesSection />
      <AboutPam />
      <Newsletter />
    </main>
  );
}

import { Hero } from "@/components/hero";
import { QuickAccess } from "@/components/quick-access";
import { FeaturedOpportunities } from "@/components/featured-opportunities";
import { StoriesSection } from "@/components/stories-section";
import { AboutPam } from "@/components/about-pam";
import { Newsletter } from "@/components/newsletter";
import { getSiteSettings } from "@/lib/data/site-settings";

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <main>
      <Hero />
      <QuickAccess />
      <FeaturedOpportunities />
      <StoriesSection />
      <AboutPam />
      <Newsletter title={settings.newsletterTitle} body={settings.newsletterBody} />
    </main>
  );
}

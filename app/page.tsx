import { getProjects } from "@/lib/portfolio";
import showcase from "@/content/showcase.json";
import about from "@/content/about.json";
import Showcase from "@/components/Showcase";
import FilterableProjects from "@/components/FilterableProjects";
import type { ShowcaseContent } from "@/lib/types";

export default function Home() {
  const projects = getProjects();
  const showcaseContent = showcase as ShowcaseContent;

  return (
    <>
      <section className="info">
        <p className="tagline">
          <b>{about.headline}</b> — {about.bullets.join(" ")}
        </p>
      </section>

      <Showcase content={showcaseContent} />

      <section className="mt-8">
        <header>
          <h1 className="text-2xl font-semibold mt-4">Farshad Nayeri</h1>
        </header>
        <FilterableProjects projects={projects} />
      </section>
    </>
  );
}

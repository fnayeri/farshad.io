import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/portfolio";
import ArtifactGallery from "@/components/ArtifactGallery";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} – ${project.customer} – farshad.io`,
    description: project.body,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="portfolio-page-outer">
      <div
        className="portfolio-page-embody"
        style={
          {
            ["--portfolio-bg" as string]: `#${project.background}`,
            ["--portfolio-color" as string]: `#${project.color}`,
            ["--portfolio-border" as string]: `#${project.border}`,
            backgroundColor: `#${project.background}`,
          } as React.CSSProperties
        }
      >
        <ArtifactGallery project={project} />
      </div>
    </div>
  );
}

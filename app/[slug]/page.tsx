import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/portfolio";
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

const Section = ({
  kind,
  text,
  iconSrc,
}: {
  kind: "problem" | "stakes" | "discovery" | "outcome";
  text: string;
  iconSrc: string;
}) => {
  if (!text) return null;
  const labels = {
    problem: "Problem",
    stakes: "Stakes",
    discovery: "Discovery",
    outcome: "Outcome",
  } as const;
  return (
    <div className={`aspect-card ${kind}`}>
      <img
        src={iconSrc}
        alt=""
        aria-hidden="true"
        style={{ width: 28, height: 28, marginBottom: 6 }}
      />
      <h2>{labels[kind]}</h2>
      <p>{text}</p>
    </div>
  );
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const hasLink = project.link.length > 0;

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
        <article className="portfolio-item">
          <div className="portfolio-title">
            {hasLink ? (
              <a
                className="portfolio-logo-link"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="logo" src={project.logo} alt={project.title} />
              </a>
            ) : (
              <img className="logo" src={project.logo} alt={project.title} />
            )}

            <h1 className="synopsis">
              <span style={{ color: `#${project.color}` }}>{project.role}</span>
              <br />
              {project.title}
              <br />
              {hasLink ? (
                <span className="portfolio-customer-row">
                  <a
                    className="portfolio-customer-link"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.customer}
                  </a>
                  <a
                    className="portfolio-customer-external"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Project website"
                  >
                    →
                  </a>
                </span>
              ) : (
                project.customer
              )}
            </h1>
          </div>

          {project.body && <p className="synopsis">{project.body}</p>}

          {project.tags.length > 0 && (
            <div className="tags">
              {project.tags.map((t) => (
                <a key={t} className="tag" href={`/?tag=${encodeURIComponent(t)}`}>
                  {t}
                </a>
              ))}
            </div>
          )}

          <div className="portfolio-break" />

          <div className="aspects-grid">
            <Section
              kind="problem"
              text={project.problem}
              iconSrc="/assets/icons/problem.png"
            />
            <Section
              kind="stakes"
              text={project.stakes}
              iconSrc="/assets/icons/stakes.png"
            />
            <Section
              kind="discovery"
              text={project.discovery}
              iconSrc="/assets/icons/discovery.png"
            />
            <Section
              kind="outcome"
              text={project.outcome}
              iconSrc="/assets/icons/outcome.png"
            />
          </div>

          <div className="portfolio-break" />
        </article>
      </div>
    </div>
  );
}

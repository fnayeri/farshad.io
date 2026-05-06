import profile from "../../../../shared/content/profile.json";
import personasData from "../../../../shared/content/personas.json";
import testimonialsData from "../../../../shared/content/testimonials.json";
import clientsData from "../../../../shared/content/clients.json";
import talksData from "../../../../shared/content/talks/talks.json";

export type Persona = {
  id: string;
  label: string;
  default: boolean;
  pitch_line: string;
  credibility_anchors: string[];
  shape_of_the_gap: string;
  what_he_uniquely_does: string;
  angles_to_play: string[];
  head_off_early: string;
  closing_pitch: string;
  featured_project_slugs: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  title: string;
  quote: string;
  source: string;
  personas: string[];
};

export type Talk = {
  id: string;
  title: string;
  venue: string;
  date: string;
  url: string | null;
  featured: boolean;
  description: string;
};

export const personas = (personasData as { personas: Persona[] }).personas;
export const testimonials = (testimonialsData as { testimonials: Testimonial[] }).testimonials;
export const clients = (clientsData as { clients: string[] }).clients;
export const talks = (talksData as { talks: Talk[] }).talks;
export { profile };

export function defaultPersona(): Persona {
  return personas.find((p) => p.default) ?? personas[0];
}

export function getPersona(id: string): Persona | undefined {
  return personas.find((p) => p.id === id);
}

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  client: string;
  role: string;
  dates: string;
  location: string;
  personas: string[];
  outcome: string;
  collaborators: string[];
  hero_image: string | null;
};

export type ProjectModule = {
  frontmatter: ProjectFrontmatter;
  Content: unknown;
};

const projectGlob = import.meta.glob<ProjectModule>(
  "../../../../shared/content/projects/*.mdx",
  { eager: true }
);

export const projects: ProjectFrontmatter[] = Object.values(projectGlob)
  .map((m) => m.frontmatter)
  .sort((a, b) => a.title.localeCompare(b.title));

export function projectsForPersona(personaId: string): ProjectFrontmatter[] {
  return projects.filter((p) => p.personas.includes(personaId));
}

export function getProjectModule(slug: string): ProjectModule | undefined {
  return Object.values(projectGlob).find((m) => m.frontmatter.slug === slug);
}

export type WritingFrontmatter = {
  title: string;
  slug: string;
  date: string;
  personas: string[];
  description: string;
};

export type WritingModule = {
  frontmatter: WritingFrontmatter;
  Content: unknown;
};

const writingGlob = import.meta.glob<WritingModule>(
  "../../../../shared/content/writing/*.mdx",
  { eager: true }
);

export const writing: WritingFrontmatter[] = Object.values(writingGlob)
  .map((m) => m.frontmatter)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getWritingModule(slug: string): WritingModule | undefined {
  return Object.values(writingGlob).find((m) => m.frontmatter.slug === slug);
}

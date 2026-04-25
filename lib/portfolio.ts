import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";

export type Project = {
  name: string;
  slug: string;
  permalinkSlug: string;
  title: string;
  customer: string;
  role: string;
  link: string;
  body: string;
  problem: string;
  stakes: string;
  discovery: string;
  outcome: string;
  considerations: string;
  tags: string[];
  color: string;
  background: string;
  border: string;
  logo: string;
};

type RawRow = Record<string, string | undefined>;

const CSV_PATH = path.join(process.cwd(), "src", "_data", "portfolio.csv");

const sanitizeSlug = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");

let cache: Project[] | null = null;

export function getProjects(): Project[] {
  if (cache) return cache;

  const csv = fs.readFileSync(CSV_PATH, "utf8");
  const parsed = Papa.parse<RawRow>(csv, {
    header: true,
    skipEmptyLines: true,
  });

  const projects: Project[] = [];
  for (const row of parsed.data) {
    const name = (row.name ?? "").trim();
    if (!name) continue;
    if (name.startsWith("#")) continue;

    const rawSlug = (row.slug ?? "").trim();
    const slug = sanitizeSlug(rawSlug || name);

    const tags = (row.tags ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const background = (row.background ?? "").trim();
    const colorTrim = (row.color ?? "").trim();
    const borderTrim = (row.border ?? "").trim();

    projects.push({
      name,
      slug,
      permalinkSlug: slug,
      title: (row.title ?? "").trim(),
      customer: (row.customer ?? "").trim(),
      role: (row.role ?? "").trim(),
      link: (row.link ?? "").trim(),
      body: (row.body ?? "").trim(),
      problem: (row.problem ?? "").trim(),
      stakes: (row.stakes ?? "").trim(),
      discovery: (row.discovery ?? "").trim(),
      outcome: (row.outcome ?? "").trim(),
      considerations: (row.considerations ?? "").trim(),
      tags,
      color: colorTrim || "888",
      background: background || "FFF",
      border: borderTrim || colorTrim || "666",
      logo: `/assets/logos/${name}.png`,
    });
  }

  cache = projects;
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const p of getProjects()) {
    for (const t of p.tags) set.add(t);
  }
  return Array.from(set).sort();
}

export function getAllRoles(): string[] {
  const set = new Set<string>();
  for (const p of getProjects()) {
    if (p.role) set.add(p.role);
  }
  return Array.from(set);
}

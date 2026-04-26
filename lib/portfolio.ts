import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";

export type Artifact = {
  src: string;
  kind: "image" | "video";
  poster?: string;
};

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
  artifacts: Artifact[];
};

type RawRow = Record<string, string | undefined>;

const CSV_PATH = path.join(process.cwd(), "src", "_data", "portfolio.csv");
const ARTIFACTS_ROOT = path.join(process.cwd(), "public", "assets", "artifacts");

const ARTIFACT_KEY_OVERRIDES: Record<string, string> = {
  "health-of-nations": "thehealthofnations",
};

const VIDEO_EXT = new Set(["m4v", "mp4", "webm", "mov"]);
const IMAGE_EXT = new Set(["png", "jpg", "jpeg", "gif"]);

function loadArtifacts(name: string): Artifact[] {
  const key = ARTIFACT_KEY_OVERRIDES[name] ?? name;
  const dir = path.join(ARTIFACTS_ROOT, key);
  if (!fs.existsSync(dir)) return [];

  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .sort();

  const result: Artifact[] = [];
  for (const file of entries) {
    const ext = file.split(".").pop()?.toLowerCase() ?? "";
    const src = `/assets/artifacts/${key}/${file}`;
    if (VIDEO_EXT.has(ext)) {
      let poster: string | undefined;
      if (key === "pixxa") poster = "/assets/video/pixxa-sankey.png";
      else if (key === "thehealthofnations")
        poster = "/assets/thehealthofnations/thehealthofnations.png";
      result.push({ src, kind: "video", poster });
    } else if (IMAGE_EXT.has(ext)) {
      result.push({ src, kind: "image" });
    }
  }
  return result;
}

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
      artifacts: loadArtifacts(name),
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

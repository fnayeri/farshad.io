// Mapping from project slug → directory key for /assets/logos and /assets/artifacts.
// Slugs are content-driven (mdx); asset folders predate the rename, so we map.
export const ASSET_KEY_BY_SLUG: Record<string, string> = {
  "pixxa-perspective": "pixxa",
  "asymco": "asymco",
  "airshow": "harvardxr",
  "critical-mass": "critical-mass",
  "iphone-clock-app": "appstore",
  "verizon-dti": "verizon-dti",
  "ey-blockchain": "ey-blockchain",
  "baupost-niws": "baupost-niws",
  "fidelity-readiness": "fidelity-readiness",
  "christensen-institute": "christensen-institute",
  "dx-mba": "christensen-institute",
  "health-of-nations": "thehealthofnations",
  "gte-labs-dom": "gte-labs",
  "igen": "igen",
};

export type Artifact = { src: string; kind: "image" | "video"; poster?: string; alt: string };

const VIDEO_EXT = new Set(["m4v", "mp4", "webm", "mov"]);
const IMAGE_EXT = new Set(["png", "jpg", "jpeg", "gif", "webp", "svg"]);

// Static artifact lists per asset key (mirrors what's on disk under public/assets/artifacts/<key>/).
// We keep this in code so Astro's static build does not need to crawl the symlink at build time.
export const ARTIFACTS_BY_KEY: Record<string, Array<{ file: string; alt?: string }>> = {
  "pixxa": [
    { file: "pixxa-orig.m4v", alt: "Pixxa Perspective demo reel" },
  ],
  "asymco": [
    { file: "asymco-newsbot.jpg", alt: "Asymco One newsbot interface" },
    { file: "asymco-social-ops.jpg", alt: "Asymco social operations dashboard" },
  ],
  "harvardxr": [
    { file: "Data Cinematography - HarvardXR v1.0.png", alt: "Data Cinematography at HarvardXR 2025" },
    { file: "harvardxr.png", alt: "HarvardXR speaker plate" },
  ],
  "appstore": [
    { file: "app-infographic.png", alt: "iOS App Store launches infographic" },
  ],
  "verizon-dti": [
    { file: "1-verizon-field-tech.jpg", alt: "Verizon field technician with the QoS app" },
    { file: "4-verizon-dti.png", alt: "Verizon DTI dashboard" },
  ],
  "verizon-tips": [
    { file: "noc-example.jpg", alt: "Verizon NOC monitoring example" },
    { file: "verizon-tips-patent-01.png", alt: "Verizon TIPS patent diagram" },
  ],
  "ey-blockchain": [
    { file: "0-ey-layers.png", alt: "EY blockchain platform layers" },
    { file: "ey-blockchain-website-1.png", alt: "EY blockchain website" },
  ],
  "baupost-niws": [
    { file: "baupost-niws.png", alt: "Baupost compliance system" },
  ],
  "fidelity-pm": [
    { file: "fidelity-pm.jpeg", alt: "Fidelity readiness app" },
  ],
  "christensen-institute": [
    { file: "christensen-institute.png", alt: "Disruptive Innovation community" },
  ],
  "cme-chat": [
    { file: "cme-chat-basic.png", alt: "CME chat clearing app" },
    { file: "cme-chat.png", alt: "CME chat interactive trade clearing" },
  ],
  "peoplefluent": [
    { file: "1-directory.png", alt: "Peoplefluent talent directory" },
    { file: "2-map.png", alt: "Peoplefluent talent map" },
  ],
  "redbook-keep": [
    { file: "0-redbook-info.png", alt: "Redbook info plate" },
    { file: "1-redbook-blueprint.png", alt: "Redbook blueprint" },
    { file: "2-redbook-keep.png", alt: "Redbook Keep app" },
  ],
  "og1": [
    { file: "1-og1-certificate.png", alt: "OG1 certificate of first use" },
    { file: "2-og1-home.png", alt: "OG1 home" },
  ],
  "thehealthofnations": [
    { file: "The Health of Nations v0.8.m4v", alt: "The Health of Nations data-cinematic presentation" },
  ],
  "symtrend": [
    { file: "symtrend-architecture.png", alt: "Symtrend architecture" },
    { file: "symtrend-energy-levels.png", alt: "Symtrend energy levels chart" },
  ],
  "linguistic-categories-ai": [
    { file: "carousel.png", alt: "What linguistic categories reveal about AI" },
  ],
};

export function projectLogo(slug: string): string | null {
  const key = ASSET_KEY_BY_SLUG[slug];
  if (!key) return null;
  // Prefer .png in /assets/logos/<key>.png
  return `/assets/logos/${key}.png`;
}

export function projectArtifacts(slug: string): Artifact[] {
  const key = ASSET_KEY_BY_SLUG[slug];
  if (!key) return [];
  const entries = ARTIFACTS_BY_KEY[key] ?? [];
  return entries.map(({ file, alt }) => {
    const ext = (file.split(".").pop() || "").toLowerCase();
    const src = `/assets/artifacts/${key}/${encodeURIComponent(file).replace(/%2F/g, "/")}`;
    if (VIDEO_EXT.has(ext)) {
      let poster: string | undefined;
      if (key === "pixxa") poster = "/assets/video/pixxa-sankey.png";
      else if (key === "thehealthofnations") poster = "/assets/thehealthofnations/thehealthofnations.png";
      return { src, kind: "video" as const, poster, alt: alt ?? file };
    }
    return { src, kind: "image" as const, alt: alt ?? file };
  });
}

export function projectFirstArtifact(slug: string): Artifact | null {
  const list = projectArtifacts(slug);
  return list[0] ?? null;
}

export const CATEGORY_COLORS: Record<string, { hex: string; name: string }> = {
  "product-builder":  { hex: "#1d4ed8", name: "Builder" },
  "data-storyteller": { hex: "#d97706", name: "Storyteller" },
  "strategist":       { hex: "#15803d", name: "Strategist" },
  "founder":          { hex: "#a21caf", name: "Founder" },
  "dev-tools":        { hex: "#475569", name: "Dev Tools" },
};

export function categoryColor(personaId: string): string {
  return CATEGORY_COLORS[personaId]?.hex ?? "#666";
}

// Approximate start year per project (parsed from frontmatter dates).
// We pick the leading 4-digit year from the dates string.
export function parseStartYear(dates: string): number | null {
  const m = dates.match(/(\d{4})/);
  return m ? parseInt(m[1], 10) : null;
}

export function parseEndYear(dates: string): number | null {
  // "2018–2020" → 2020; "1998–present" → current year; "1995" → 1995
  const all = dates.match(/\d{4}/g);
  if (all && all.length >= 2) return parseInt(all[all.length - 1], 10);
  if (/present/i.test(dates)) return new Date().getFullYear();
  if (all && all.length === 1) return parseInt(all[0], 10);
  return null;
}

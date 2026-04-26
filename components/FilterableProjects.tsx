"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Project } from "@/lib/portfolio";
import ChartView from "./ChartView";

type ViewMode = "bento" | "list" | "chart";

const INDUSTRY_TAGS = new Set([
  "financial",
  "healthcare",
  "telecom",
  "retail",
  "consumer",
  "government",
  "management",
  "innovation research",
]);

function groupTags(tags: string[]) {
  const industry: string[] = [];
  const skills: string[] = [];
  for (const t of tags) {
    if (INDUSTRY_TAGS.has(t.toLowerCase())) industry.push(t);
    else skills.push(t);
  }
  return { industry, skills };
}

function parseView(v: string | null): ViewMode {
  if (v === "bento" || v === "list" || v === "chart") return v;
  if (v === "analytics" || v === "graph") return "chart";
  return "list";
}

export default function FilterableProjects({
  projects,
}: {
  projects: Project[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const view = parseView(searchParams.get("fmt"));
  const activeTag = searchParams.get("tag");
  const activeRole = searchParams.get("role");

  const updateParams = useCallback(
    (next: { view?: ViewMode; tag?: string | null; role?: string | null }) => {
      const params = new URLSearchParams(searchParams.toString());
      const nextView = next.view ?? view;
      if (nextView === "list") params.delete("fmt");
      else params.set("fmt", nextView);

      if (next.tag !== undefined) {
        if (next.tag) params.set("tag", next.tag);
        else params.delete("tag");
      }
      if (next.role !== undefined) {
        if (next.role) params.set("role", next.role);
        else params.delete("role");
      }
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams, view]
  );

  const setView = (v: ViewMode) => updateParams({ view: v });
  const toggleRole = (r: string) =>
    updateParams({ role: activeRole === r ? null : r, tag: null });
  const toggleTag = (t: string) =>
    updateParams({ tag: activeTag === t ? null : t, role: null });
  const onChartFilter = useCallback(
    (kind: "tag" | "role", value: string) => {
      updateParams({
        view: "list",
        tag: kind === "tag" ? value : null,
        role: kind === "role" ? value : null,
      });
    },
    [updateParams]
  );

  const roles = useMemo(() => {
    const order = ["Product Lead", "Platform Lead", "Lead Architect"];
    const counts = new Map<string, number>();
    for (const p of projects) {
      if (!p.role) continue;
      counts.set(p.role, (counts.get(p.role) ?? 0) + 1);
    }
    return Array.from(counts.keys()).sort((a, b) => {
      const ia = order.indexOf(a);
      const ib = order.indexOf(b);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return (counts.get(b) ?? 0) - (counts.get(a) ?? 0);
    });
  }, [projects]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) for (const t of p.tags) set.add(t);
    return Array.from(set);
  }, [projects]);

  const { industry, skills } = useMemo(() => groupTags(allTags), [allTags]);

  const matches = (p: Project) => {
    if (activeRole && p.role !== activeRole) return false;
    if (activeTag) {
      const lc = p.tags.map((t) => t.toLowerCase());
      const wanted = activeTag
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);
      if (!wanted.some((w) => lc.includes(w))) return false;
    }
    return true;
  };

  return (
    <>
      <div className="my-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="filter-section-label">Roles</span>
          <div className="filter-tags">
            {roles.map((r) => (
              <span
                key={r}
                className={`filter-tag ${activeRole === r ? "active" : ""}`}
                onClick={() => toggleRole(r)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleRole(r);
                  }
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="filter-section-label">Industry</span>
          <div className="filter-tags">
            {industry.map((t) => (
              <span
                key={t}
                className={`filter-tag ${activeTag === t ? "active" : ""}`}
                onClick={() => toggleTag(t)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleTag(t);
                  }
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="filter-section-label">Core Skills</span>
          <div className="filter-tags">
            {skills.map((t) => (
              <span
                key={t}
                className={`filter-tag ${activeTag === t ? "active" : ""}`}
                onClick={() => toggleTag(t)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleTag(t);
                  }
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {(activeRole || activeTag) && (
          <button
            type="button"
            onClick={() => updateParams({ tag: null, role: null })}
            className="self-start text-xs text-[var(--secondary)] underline"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="view-controls">
        <div className="view-icons">
          <button
            type="button"
            className={`view-icon ${view === "bento" ? "active" : ""}`}
            aria-label="Bento view"
            aria-pressed={view === "bento"}
            onClick={() => setView("bento")}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </button>
          <button
            type="button"
            className={`view-icon ${view === "list" ? "active" : ""}`}
            aria-label="List view"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 6h12M8 12h12M8 18h12" />
              <path d="M4 6h2M4 12h2M4 18h2" />
            </svg>
          </button>
          <button
            type="button"
            className={`view-icon ${view === "chart" ? "active" : ""}`}
            aria-label="Chart view"
            aria-pressed={view === "chart"}
            onClick={() => setView("chart")}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </button>
        </div>
      </div>

      {view === "bento" && (
        <>
          <h3 className="section-heading">Projects</h3>
          <div className="bento-grid-main">
            {projects.filter(matches).map((p) => {
              return (
                <Link
                  key={p.slug}
                  href={`/${p.slug}/`}
                  className="bento"
                  style={{
                    color: `#${p.color}`,
                    backgroundColor: `#${p.background}`,
                    borderColor: `#${p.border}`,
                  }}
                >
                  <div className="icon-area">
                    <img
                      className="portfolio-image"
                      src={p.logo}
                      alt={p.title || p.customer}
                    />
                  </div>
                  <span className="bento-arrow" aria-hidden="true">
                    →
                  </span>
                  <div className="bento-labels">
                    <h2 className="bento-customer">{p.customer}</h2>
                    <p className="bento-description">{p.title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}

      {view === "list" && (
        <>
          <h3 className="section-heading">Experience</h3>
          <table className="portfolio-table">
            <tbody>
              {projects.filter(matches).map((p) => {
                return (
                  <tr
                    key={p.slug}
                    className="project"
                  >
                    <td className="portfolio-cell">
                      <Link
                        href={`/${p.slug}/`}
                        className="portfolio-link"
                        style={
                          {
                            ["--project-border" as string]: `#${p.border}`,
                          } as React.CSSProperties
                        }
                      >
                        <div className="portfolio-content">
                          <div className="image-column">
                            <img
                              src={p.logo}
                              className="portfolio-image"
                              alt={p.title || p.customer}
                            />
                          </div>
                          <div className="content-right">
                            <div className="header">
                              <div className="title-group">
                                <div className="role">{p.role}</div>
                                <div className="subtitle-project">
                                  {p.customer} / {p.title}
                                </div>
                                <div className="body-text">{p.body}</div>
                              </div>
                            </div>
                            <div className="tags-cell">
                              {p.tags.map((t) => (
                                <span
                                  key={t}
                                  className="tag-bubble"
                                  data-tag={t}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleTag(t);
                                  }}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}

      {view === "chart" && (
        <ChartView
          projects={projects}
          activeTag={activeTag}
          activeRole={activeRole}
          onFilter={onChartFilter}
        />
      )}
    </>
  );
}

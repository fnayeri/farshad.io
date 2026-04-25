"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/portfolio";

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

export default function FilterableProjects({
  projects,
}: {
  projects: Project[];
}) {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

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
    for (const p of projects) {
      for (const t of p.tags) set.add(t);
    }
    return Array.from(set);
  }, [projects]);

  const { industry, skills } = useMemo(() => groupTags(allTags), [allTags]);

  const matches = (p: Project) => {
    if (activeRole && p.role !== activeRole) return false;
    if (activeTag) {
      const lc = p.tags.map((t) => t.toLowerCase());
      if (!lc.includes(activeTag.toLowerCase())) return false;
    }
    return true;
  };

  const toggleRole = (r: string) =>
    setActiveRole((cur) => (cur === r ? null : r));
  const toggleTag = (t: string) =>
    setActiveTag((cur) => (cur === t ? null : t));

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
            onClick={() => {
              setActiveRole(null);
              setActiveTag(null);
            }}
            className="self-start text-xs text-[var(--secondary)] underline"
          >
            Clear filters
          </button>
        )}
      </div>

      <h3 className="section-heading">Projects</h3>
      <div className="bento-grid-main">
        {projects.map((p) => {
          const dim = !matches(p);
          return (
            <Link
              key={p.slug}
              href={`/${p.slug}/`}
              className="bento"
              data-dim={dim ? "true" : "false"}
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

      <h3 className="section-heading">Experience</h3>
      <table className="portfolio-table">
        <tbody>
          {projects.map((p) => {
            const dim = !matches(p);
            return (
              <tr
                key={p.slug}
                className="project"
                data-dim={dim ? "true" : "false"}
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
  );
}

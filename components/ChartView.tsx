"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/portfolio";

type Highlight =
  | { type: "role" | "industry" | "tag" | "capability"; value: string }
  | null;

type ProjectLite = { name: string; role: string; tags: string[] };

const ROLE_PALETTE = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#06b6d4",
  "#a855f7",
  "#f43f5e",
  "#ec4899",
  "#14b8a6",
];
const INDUSTRY_PALETTE = [
  "#0ea5e9",
  "#8b5cf6",
  "#10b981",
  "#f97316",
  "#e11d48",
  "#64748b",
  "#14b8a6",
  "#a855f7",
];

const ROLE_ORDER = ["Product Lead", "Platform Lead", "Lead Architect"];
const INDUSTRY_MAP: Record<string, string[]> = {
  "Financial Services": ["financial"],
  Healthcare: ["healthcare"],
  Innovation: ["management", "innovation research"],
  Telecom: ["telecom"],
  "Retail & Consumer": ["retail", "consumer"],
  Government: ["government"],
};
const INDUSTRY_TO_TAG: Record<string, string> = {
  "Financial Services": "financial",
  Healthcare: "healthcare",
  Innovation: "management,innovation research",
  Telecom: "telecom",
  "Retail & Consumer": "retail,consumer",
  Government: "government",
};
const CAP_TO_TAG: Record<string, string> = {
  Product: "product strategy",
  "Native Apps": "native apps",
  Web: "web apps",
  "Data & Analytics": "analytics",
  "Cloud & APIs": "cloud saas",
  Architecture: "architecture",
};
const CAP_GROUPS: Record<string, string[]> = {
  Product: ["product strategy", "product design"],
  "Native Apps": ["native apps"],
  Web: ["web apps"],
  "Cloud & APIs": ["cloud saas", "api design"],
  "Data & Analytics": ["analytics", "visualization", "artificial intelligence"],
  Architecture: ["architecture", "platform"],
};
const INDUSTRY_TAGS = [
  "financial",
  "healthcare",
  "telecom",
  "retail",
  "consumer",
  "government",
  "management",
  "innovation research",
];
const EXCLUDED_TECH_TAGS = [
  "blockchain",
  "cryptocurrency",
  "e-commerce",
  "community",
  "automation",
  "storytelling",
];

function dimColor(c: string, opacity: number): string {
  if (!c) return c;
  const hex = c.replace("#", "").slice(0, 6);
  return (
    "#" +
    hex +
    Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0")
  );
}

function industryColor(label: string): string {
  const idx = Object.keys(INDUSTRY_MAP).indexOf(label);
  const base = INDUSTRY_PALETTE[idx >= 0 ? idx : 0];
  return base + "99";
}

export default function ChartView({
  projects,
  activeTag,
  activeRole,
  onFilter,
}: {
  projects: Project[];
  activeTag: string | null;
  activeRole: string | null;
  onFilter: (kind: "tag" | "role", value: string) => void;
}) {
  const rolesRef = useRef<HTMLCanvasElement | null>(null);
  const industryRef = useRef<HTMLCanvasElement | null>(null);
  const techRef = useRef<HTMLCanvasElement | null>(null);
  const capabilityRef = useRef<HTMLCanvasElement | null>(null);
  const chartsRef = useRef<{
    roles?: import("chart.js").Chart;
    industry?: import("chart.js").Chart;
    tech?: import("chart.js").Chart;
    capability?: import("chart.js").Chart;
    highlight?: Highlight;
    baseTechLabels?: string[];
    baseTechStackData?: Array<{
      label: string;
      role: string;
      data: number[];
      backgroundColor: string | string[];
      borderWidth: number;
    }>;
  }>({});

  useEffect(() => {
    let cancelled = false;
    let onClickOutside: ((e: MouseEvent) => void) | null = null;

    (async () => {
      const ChartMod = await import("chart.js/auto");
      if (cancelled) return;
      const Chart = ChartMod.default;

      Chart.defaults.color = "#333";
      Chart.defaults.borderColor = "rgba(0,0,0,0.08)";
      Chart.defaults.font.family =
        '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif';
      Chart.defaults.font.size = 11;

      const ttCfg = {
        backgroundColor: "rgba(255,255,255,0.95)",
        titleColor: "#222",
        bodyColor: "#333",
        borderColor: "rgba(0,0,0,0.1)",
        titleFont: { size: 13, weight: 600 },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 4,
      } as const;

      let data: ProjectLite[] = projects.map((p) => ({
        name: p.name,
        role: p.role,
        tags: p.tags,
      }));
      if (activeTag) {
        const tagList = activeTag
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .filter(Boolean);
        data = data.filter((p) => {
          const ptags = p.tags.map((t) => t.toLowerCase());
          return tagList.some((st) => ptags.includes(st));
        });
      } else if (activeRole) {
        data = data.filter(
          (p) => p.role && p.role.trim() === activeRole.trim()
        );
      }

      const roleCounts: Record<string, number> = {};
      data.forEach((p) => {
        if (!p.role) return;
        roleCounts[p.role] = (roleCounts[p.role] || 0) + 1;
      });
      const roleLabels = Object.keys(roleCounts).sort((a, b) => {
        const ia = ROLE_ORDER.indexOf(a);
        const ib = ROLE_ORDER.indexOf(b);
        if (ia !== -1 && ib !== -1) return ia - ib;
        if (ia !== -1) return -1;
        if (ib !== -1) return 1;
        return roleCounts[b] - roleCounts[a];
      });
      const roleValues = roleLabels.map((r) => roleCounts[r]);

      const industryCounts: Record<string, number> = {};
      Object.keys(INDUSTRY_MAP).forEach((k) => (industryCounts[k] = 0));
      data.forEach((p) => {
        const tags = p.tags.map((t) => t.toLowerCase());
        Object.keys(INDUSTRY_MAP).forEach((ind) => {
          if (INDUSTRY_MAP[ind].some((kw) => tags.includes(kw)))
            industryCounts[ind]++;
        });
      });
      let indLabels = Object.keys(industryCounts)
        .filter((k) => industryCounts[k] > 0)
        .sort((a, b) => industryCounts[b] - industryCounts[a]);
      const others = indLabels.filter((l) => l !== "Innovation");
      if (indLabels.includes("Innovation"))
        indLabels = others.concat(["Innovation"]);
      const indValues = indLabels.map((k) => industryCounts[k]);

      const techCounts: Record<string, number> = {};
      data.forEach((p) => {
        p.tags.forEach((t) => {
          const tl = t.toLowerCase();
          if (
            !INDUSTRY_TAGS.includes(tl) &&
            !EXCLUDED_TECH_TAGS.includes(tl)
          ) {
            const key = tl === "platform" ? "architecture" : tl;
            techCounts[key] = (techCounts[key] || 0) + 1;
          }
        });
      });
      const techOrder = ["product design", "architecture", "native apps"];
      const techLabels = Object.keys(techCounts).sort((a, b) => {
        const ia = techOrder.indexOf(a);
        const ib = techOrder.indexOf(b);
        if (ia !== -1 && ib !== -1) return ia - ib;
        if (ia !== -1) return -1;
        if (ib !== -1) return 1;
        return techCounts[b] - techCounts[a];
      });
      const techStackData = roleLabels.map((role, roleIdx) => ({
        label: role,
        role,
        data: techLabels.map((tag) => {
          const tagsToMatch =
            tag === "architecture" ? ["architecture", "platform"] : [tag];
          let c = 0;
          data.forEach((p) => {
            if (p.role !== role) return;
            const ptags = p.tags.map((t) => t.toLowerCase());
            if (tagsToMatch.some((t) => ptags.includes(t))) c++;
          });
          return c;
        }),
        backgroundColor: ROLE_PALETTE[roleIdx % ROLE_PALETTE.length] as
          | string
          | string[],
        borderWidth: 0,
      }));
      techLabels.forEach((_, techIdx) => {
        const total = techStackData.reduce(
          (s, ds) => s + (ds.data[techIdx] || 0),
          0
        );
        if (total > 0) {
          techStackData.forEach((ds) => {
            ds.data[techIdx] = Math.round(
              ((ds.data[techIdx] || 0) / total) * 100
            );
          });
        }
      });
      const baseTechLabels = techLabels.slice();
      const baseTechStackData = techStackData.map((d) => ({
        ...d,
        data: d.data.slice(),
      }));
      chartsRef.current.baseTechLabels = baseTechLabels;
      chartsRef.current.baseTechStackData = baseTechStackData;

      const capLabels = Object.keys(CAP_GROUPS);
      const capValues = capLabels.map((cap) => {
        const kws = CAP_GROUPS[cap];
        let c = 0;
        data.forEach((p) => {
          const ptags = p.tags.map((t) => t.toLowerCase());
          if (kws.some((kw) => ptags.includes(kw))) c++;
        });
        return c;
      });

      function applyHighlight(h: Highlight) {
        chartsRef.current.highlight = h;
        const dim = 0.25;
        const fadeOpacity = 0.45;
        const rolesChart = chartsRef.current.roles;
        const industryChart = chartsRef.current.industry;
        const techChart = chartsRef.current.tech;
        const capabilityChart = chartsRef.current.capability;

        if (rolesChart) {
          const rl = rolesChart.data.labels as string[];
          const roleColors = rl.map((lbl, i) => {
            const base = ROLE_PALETTE[i % ROLE_PALETTE.length];
            if (!h) return base;
            if (h.type === "role")
              return h.value === lbl ? base : dimColor(base, dim);
            return dimColor(base, dim);
          });
          (rolesChart.data.datasets[0] as unknown as { backgroundColor: string[] }).backgroundColor =
            roleColors;
          rolesChart.update("none");
        }

        if (industryChart) {
          const il = industryChart.data.labels as string[];
          const indColors = il.map((lbl) => {
            const idx = Object.keys(INDUSTRY_MAP).indexOf(lbl);
            const base = INDUSTRY_PALETTE[idx >= 0 ? idx : 0];
            const full = base + "99";
            if (!h) return full;
            if (h.type === "industry")
              return h.value === lbl ? full : dimColor(base, fadeOpacity);
            return dimColor(base, fadeOpacity);
          });
          (industryChart.data.datasets[0] as unknown as { backgroundColor: string[] }).backgroundColor =
            indColors;
          industryChart.update("none");
        }

        if (techChart) {
          let labelsToShow = baseTechLabels;
          let datasetsToShow = baseTechStackData;
          if (h && h.type === "role") {
            const roleDs = baseTechStackData.find((d) => d.role === h.value);
            if (roleDs) {
              const order = baseTechLabels
                .map((_, i) => i)
                .sort((a, b) => (roleDs.data[b] || 0) - (roleDs.data[a] || 0));
              labelsToShow = order.map((i) => baseTechLabels[i]);
              datasetsToShow = baseTechStackData.map((d) => ({
                ...d,
                data: order.map((i) => d.data[i]),
              }));
            }
          }
          datasetsToShow.forEach((ds, roleIdx) => {
            const base = ROLE_PALETTE[roleIdx % ROLE_PALETTE.length];
            ds.backgroundColor = labelsToShow.map((tag) => {
              if (!h) return base;
              if (h.type === "role")
                return h.value === ds.role ? base : dimColor(base, dim);
              if (h.type === "tag")
                return (h.value || "").toLowerCase() ===
                  (tag || "").toLowerCase()
                  ? base
                  : dimColor(base, dim);
              if (h.type === "capability") {
                const capTag = CAP_TO_TAG[h.value];
                if (!capTag) return dimColor(base, dim);
                return capTag.toLowerCase() === (tag || "").toLowerCase()
                  ? base
                  : dimColor(base, dim);
              }
              return dimColor(base, dim);
            });
          });
          techChart.data.labels = labelsToShow;
          techChart.data.datasets = datasetsToShow as typeof techChart.data.datasets;
          techChart.update("none");
        }

        if (capabilityChart) {
          const cl = capabilityChart.data.labels as string[];
          const capPointBg = cl.map((lbl) => {
            const base = ROLE_PALETTE[4];
            if (!h) return base;
            if (h.type === "capability")
              return h.value === lbl ? base : dimColor(base, dim);
            if (h.type === "tag") {
              const cap = Object.keys(CAP_TO_TAG).find(
                (k) => CAP_TO_TAG[k].toLowerCase() === (h.value || "").toLowerCase()
              );
              return cap && cap === lbl ? base : dimColor(base, dim);
            }
            return dimColor(base, dim);
          });
          const ds = capabilityChart.data.datasets[0] as unknown as {
            pointBackgroundColor: string[];
            pointBorderColor: string;
          };
          ds.pointBackgroundColor = capPointBg;
          ds.pointBorderColor = "#fff";
          capabilityChart.update("none");
        }
      }

      function chartOnClick(
        els: { index: number; datasetIndex: number }[],
        handler: (el: { index: number; datasetIndex: number }) => void
      ) {
        if (!els.length) {
          applyHighlight(null);
          return;
        }
        const prev = chartsRef.current.highlight;
        const prevKey = prev ? prev.type + ":" + prev.value : "";
        handler(els[0]);
        const cur = chartsRef.current.highlight;
        const nextKey = cur ? cur.type + ":" + cur.value : "";
        if (prevKey && prevKey === nextKey && cur) {
          if (cur.type === "role") onFilter("role", cur.value);
          else if (cur.type === "industry" && INDUSTRY_TO_TAG[cur.value])
            onFilter("tag", INDUSTRY_TO_TAG[cur.value]);
          else onFilter("tag", cur.value);
        }
      }

      // Roles doughnut
      if (rolesRef.current) {
        chartsRef.current.roles = new Chart(rolesRef.current, {
          type: "doughnut",
          data: {
            labels: roleLabels,
            datasets: [
              {
                data: roleValues,
                backgroundColor: ROLE_PALETTE.slice(0, roleLabels.length),
                borderWidth: 2,
                borderColor: "#fff",
                hoverOffset: 12,
                hoverBorderWidth: 2,
              },
            ],
          },
          options: {
            cutout: "55%",
            responsive: true,
            maintainAspectRatio: false,
            onClick: (_evt, els) =>
              chartOnClick(els as { index: number; datasetIndex: number }[], (el) => {
                const v = (chartsRef.current.roles!.data.labels as string[])[el.index];
                if (v) applyHighlight({ type: "role", value: v });
              }),
            plugins: {
              legend: {
                position: "bottom",
                align: "center",
                labels: {
                  usePointStyle: true,
                  pointStyle: "circle",
                  font: { size: 11 },
                  padding: 14,
                  boxWidth: 8,
                  color: "#333",
                },
                onClick: (_e, item) => {
                  const v = (chartsRef.current.roles!.data.labels as string[])[
                    item.index!
                  ];
                  if (v) applyHighlight({ type: "role", value: v });
                },
              },
              tooltip: ttCfg,
            },
          },
        });
      }

      // Industry polar
      if (industryRef.current) {
        chartsRef.current.industry = new Chart(industryRef.current, {
          type: "polarArea",
          data: {
            labels: indLabels,
            datasets: [
              {
                data: indValues,
                backgroundColor: indLabels.map(industryColor),
                borderWidth: 0,
                hoverBorderWidth: 2,
              },
            ],
          },
          options: {
            startAngle: 90,
            responsive: true,
            maintainAspectRatio: false,
            onClick: (_evt, els) =>
              chartOnClick(els as { index: number; datasetIndex: number }[], (el) => {
                const v = (chartsRef.current.industry!.data.labels as string[])[
                  el.index
                ];
                if (v) applyHighlight({ type: "industry", value: v });
              }),
            scales: {
              r: {
                grid: { color: "rgba(0,0,0,0.06)" },
                ticks: { display: false },
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                position: "bottom",
                align: "center",
                labels: {
                  usePointStyle: true,
                  pointStyle: "circle",
                  font: { size: 10 },
                  padding: 10,
                  boxWidth: 8,
                  color: "#333",
                },
                onClick: (_e, item) => {
                  const v = (
                    chartsRef.current.industry!.data.labels as string[]
                  )[item.index!];
                  if (v) applyHighlight({ type: "industry", value: v });
                },
              },
              tooltip: ttCfg,
            },
          },
        });
      }

      // Core Skills stacked bar
      if (techRef.current) {
        chartsRef.current.tech = new Chart(techRef.current, {
          type: "bar",
          data: {
            labels: baseTechLabels,
            datasets: baseTechStackData as never,
          },
          options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
                min: 0,
                max: 100,
                grid: { color: "rgba(0,0,0,0.06)" },
                ticks: { display: false },
              },
              y: {
                stacked: true,
                grid: { display: false },
                ticks: { color: "#333" },
              },
            },
            onClick: (_evt, els) =>
              chartOnClick(els as { index: number; datasetIndex: number }[], (el) => {
                const tag = (chartsRef.current.tech!.data.labels as string[])[
                  el.index
                ];
                if (tag) applyHighlight({ type: "tag", value: tag });
              }),
            plugins: {
              legend: {
                position: "bottom",
                align: "center",
                labels: {
                  usePointStyle: true,
                  pointStyle: "rect",
                  font: { size: 11 },
                  padding: 12,
                  boxWidth: 10,
                  color: "#333",
                },
                onClick: (_e, item) => {
                  const ds = chartsRef.current.tech!.data.datasets[
                    item.datasetIndex!
                  ] as { role?: string; label?: string };
                  const v = ds ? ds.role || ds.label : null;
                  if (v) applyHighlight({ type: "role", value: v });
                },
              },
              tooltip: {
                ...ttCfg,
                callbacks: {
                  label: (ctx) => {
                    const ds = ctx.chart.data.datasets[ctx.datasetIndex] as {
                      role?: string;
                      label?: string;
                    };
                    const role = ds.role || ds.label || "";
                    return role + ": " + ctx.raw + "%";
                  },
                },
              },
            },
          },
        });
      }

      // Capability radar
      if (capabilityRef.current) {
        chartsRef.current.capability = new Chart(capabilityRef.current, {
          type: "radar",
          data: {
            labels: capLabels,
            datasets: [
              {
                data: capValues,
                backgroundColor: ROLE_PALETTE[4] + "44",
                borderColor: ROLE_PALETTE[4],
                borderWidth: 2,
                pointBackgroundColor: ROLE_PALETTE[4],
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            onClick: (_evt, els) =>
              chartOnClick(els as { index: number; datasetIndex: number }[], (el) => {
                const v = (
                  chartsRef.current.capability!.data.labels as string[]
                )[el.index];
                if (v) applyHighlight({ type: "capability", value: v });
              }),
            scales: {
              r: {
                grid: { color: "rgba(0,0,0,0.06)" },
                angleLines: { color: "rgba(0,0,0,0.06)" },
                ticks: { display: false },
                beginAtZero: true,
              },
            },
            plugins: { legend: { display: false }, tooltip: ttCfg },
          },
        });
      }

      onClickOutside = (e: MouseEvent) => {
        const target = e.target as Element | null;
        if (!target) return;
        if (target.closest(".chart-card")) return;
        if (chartsRef.current.highlight) applyHighlight(null);
      };
      document.addEventListener("click", onClickOutside);
    })();

    return () => {
      cancelled = true;
      if (onClickOutside) document.removeEventListener("click", onClickOutside);
      const c = chartsRef.current;
      c.roles?.destroy();
      c.industry?.destroy();
      c.tech?.destroy();
      c.capability?.destroy();
      chartsRef.current = {};
    };
  }, [projects, activeTag, activeRole, onFilter]);

  return (
    <div className="format-chart-view">
      <div className="analytics-grid">
        <div className="chart-card">
          <h4>Roles</h4>
          <div className="chart-area">
            <canvas ref={rolesRef} />
          </div>
        </div>
        <div className="chart-card">
          <h4>Industry</h4>
          <div className="chart-area">
            <canvas ref={industryRef} />
          </div>
        </div>
        <div className="chart-card">
          <h4>Core Skills</h4>
          <div className="chart-area chart-area--tall">
            <canvas ref={techRef} />
          </div>
        </div>
        <div className="chart-card">
          <h4>Experience</h4>
          <div className="chart-area">
            <canvas ref={capabilityRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

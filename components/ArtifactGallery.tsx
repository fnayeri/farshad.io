"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Artifact, Project } from "@/lib/portfolio";

type Slide =
  | { kind: "intro" }
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster?: string };

const ICONS = {
  problem: "/assets/icons/problem.png",
  stakes: "/assets/icons/stakes.png",
  discovery: "/assets/icons/discovery.png",
  outcome: "/assets/icons/outcome.png",
} as const;

const LABELS = {
  problem: "Problem",
  stakes: "Stakes",
  discovery: "Discovery",
  outcome: "Outcome",
} as const;

function Section({
  kind,
  text,
}: {
  kind: keyof typeof LABELS;
  text: string;
}) {
  if (!text) return null;
  return (
    <div className={`aspect-card ${kind}`}>
      <img
        src={ICONS[kind]}
        alt=""
        aria-hidden="true"
        style={{ width: 28, height: 28, marginBottom: 6 }}
      />
      <h2>{LABELS[kind]}</h2>
      <p>{text}</p>
    </div>
  );
}

export default function ArtifactGallery({ project }: { project: Project }) {
  const { artifacts, title, role, customer, logo, link } = project;
  const hasLink = link.length > 0;
  const hasArtifacts = artifacts.length > 0;

  const slides = useMemo<Slide[]>(
    () => [
      { kind: "intro" },
      ...artifacts.map<Slide>((a: Artifact, i) =>
        a.kind === "video"
          ? { kind: "video", src: a.src, poster: a.poster }
          : { kind: "image", src: a.src, alt: `${title} — artifact ${i + 1}` }
      ),
    ],
    [artifacts, title]
  );

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const logoBtnRef = useRef<HTMLButtonElement | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    const idx = openIndex;
    setOpenIndex(null);
    requestAnimationFrame(() => {
      const target =
        idx !== null && idx > 0
          ? triggerRefs.current[idx - 1]
          : logoBtnRef.current;
      target?.focus();
    });
  }, [openIndex]);

  const next = useCallback(() => {
    setOpenIndex((i) =>
      i === null || slides.length < 2 ? i : (i + 1) % slides.length
    );
  }, [slides.length]);

  const prev = useCallback(() => {
    setOpenIndex((i) =>
      i === null || slides.length < 2
        ? i
        : (i - 1 + slides.length) % slides.length
    );
  }, [slides.length]);

  useEffect(() => {
    if (openIndex === null) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, next, prev]);

  const open = openIndex !== null;
  const current = open ? slides[openIndex] : null;
  const multi = slides.length > 1;

  const logoImg = <img className="logo" src={logo} alt={title} />;

  return (
    <article className="portfolio-item">
      <div className="portfolio-title">
        {hasArtifacts ? (
          <button
            ref={logoBtnRef}
            type="button"
            className="portfolio-logo-link portfolio-logo-artifact-trigger"
            aria-label="View project artifacts (starts with title slide)"
            onClick={() => setOpenIndex(0)}
          >
            {logoImg}
          </button>
        ) : hasLink ? (
          <a
            className="portfolio-logo-link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {logoImg}
          </a>
        ) : (
          logoImg
        )}

        <h1 className="synopsis">
          <span style={{ color: `#${project.color}` }}>{role}</span>
          <br />
          {title}
          <br />
          {hasLink ? (
            <span className="portfolio-customer-row">
              <a
                className="portfolio-customer-link"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {customer}
              </a>
              <a
                className="portfolio-customer-external"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Project website"
              >
                →
              </a>
            </span>
          ) : (
            customer
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
        <Section kind="problem" text={project.problem} />
        <Section kind="stakes" text={project.stakes} />
        <Section kind="discovery" text={project.discovery} />
        <Section kind="outcome" text={project.outcome} />
      </div>

      {hasArtifacts && (
        <>
          <div className="portfolio-break" />
          <div className="artifacts">
            {artifacts.map((a, i) => (
              <button
                key={a.src}
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                type="button"
                className={`artifact artifact-trigger${
                  a.kind === "video" ? " artifact-trigger--video" : ""
                }`}
                aria-label={`View ${a.kind} full screen — ${title} (${i + 1})`}
                onClick={() => setOpenIndex(i + 1)}
              >
                {a.kind === "video" ? (
                  <video
                    className="artifact-thumb"
                    src={a.src}
                    poster={a.poster}
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img src={a.src} alt={`${title} — artifact ${i + 1}`} />
                )}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="portfolio-break" />

      {open && current && (
        <div
          className="artifact-lightbox artifact-view"
          role="dialog"
          aria-modal="true"
          aria-label="Artifacts"
        >
          <div
            className="artifact-lightbox-backdrop"
            tabIndex={-1}
            onClick={close}
          />
          {multi && (
            <button
              type="button"
              className="artifact-lightbox-nav artifact-lightbox-prev"
              aria-label="Previous artifact"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              ◀
            </button>
          )}
          {multi && (
            <button
              type="button"
              className="artifact-lightbox-nav artifact-lightbox-next"
              aria-label="Next artifact"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              ▶
            </button>
          )}
          <div className="artifact-lightbox-frame">
            <button
              ref={closeBtnRef}
              type="button"
              className="artifact-lightbox-close"
              aria-label="Close"
              onClick={close}
            >
              ×
            </button>
            {current.kind === "intro" && (
              <div className="artifact-lightbox-intro">
                <img
                  className="artifact-lightbox-intro-logo"
                  src={logo}
                  alt={title}
                  decoding="async"
                />
                <div className="artifact-lightbox-intro-lines">
                  {hasLink ? (
                    <a
                      className="artifact-lightbox-intro-link"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open project website"
                    >
                      <p className="artifact-lightbox-intro-line">{role}</p>
                      <p className="artifact-lightbox-intro-line">{title}</p>
                      <p className="artifact-lightbox-intro-line">{customer}</p>
                    </a>
                  ) : (
                    <>
                      <p className="artifact-lightbox-intro-line">{role}</p>
                      <p className="artifact-lightbox-intro-line">{title}</p>
                      <p className="artifact-lightbox-intro-line">{customer}</p>
                    </>
                  )}
                </div>
                <p className="artifact-lightbox-intro-hint">
                  Use ← → to browse project artifacts.
                </p>
              </div>
            )}
            {current.kind === "image" && (
              <img
                className="artifact-lightbox-img"
                src={current.src}
                alt={current.alt}
              />
            )}
            {current.kind === "video" && (
              <video
                className="artifact-lightbox-video"
                src={current.src}
                poster={current.poster}
                controls
                playsInline
                preload="metadata"
                autoPlay
              />
            )}
          </div>
        </div>
      )}
    </article>
  );
}

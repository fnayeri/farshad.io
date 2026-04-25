"use client";

import { useEffect, useState } from "react";
import type { ShowcaseContent } from "@/lib/types";

export default function Showcase({ content }: { content: ShowcaseContent }) {
  const items = content.items;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openIndex === null) return;
      if (e.key === "Escape") setOpenIndex(null);
      else if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? null : (i + 1) % items.length));
      else if (e.key === "ArrowLeft")
        setOpenIndex((i) =>
          i === null ? null : (i - 1 + items.length) % items.length
        );
    };
    if (openIndex !== null) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex, items.length]);

  const active = openIndex === null ? null : items[openIndex];

  return (
    <section className="showcase-carousel" aria-label="Showcase">
      <div className="showcase-bento-tiles">
        {items.slice(0, 3).map((item, i) => (
          <div
            key={item.id}
            className="showcase-bento-tile"
            onClick={() => setOpenIndex(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpenIndex(i);
              }
            }}
          >
            <div className="showcase-bento-tile-img-wrap">
              <img src={item.tile.image} alt={item.title} />
            </div>
            <div className="showcase-bento-tile-label">
              <span>{item.title}</span>
              <a
                href={item.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.siteLabel}
                onClick={(e) => e.stopPropagation()}
                className="text-[var(--secondary)]"
              >
                →
              </a>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div
          className="carousel-modal"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenIndex(null);
          }}
        >
          <div className="carousel-modal-dialog">
            <button
              type="button"
              className="carousel-close"
              aria-label="Close"
              onClick={() => setOpenIndex(null)}
            >
              ×
            </button>
            <div>
              <a
                href={active.graphic.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={active.graphic.image}
                  alt={active.graphic.alt}
                  className="w-full rounded-lg"
                />
              </a>
              <h3 className="text-xl font-semibold mt-4">{active.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-[var(--ink)]">
                {active.body}
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {active.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--link)] text-sm underline"
                  >
                    {l.label} →
                  </a>
                ))}
              </div>
            </div>
            <div className="carousel-nav">
              <button
                type="button"
                onClick={() =>
                  setOpenIndex((i) =>
                    i === null ? null : (i - 1 + items.length) % items.length
                  )
                }
                aria-label="Previous slide"
              >
                ◀ Prev
              </button>
              <button
                type="button"
                onClick={() =>
                  setOpenIndex((i) =>
                    i === null ? null : (i + 1) % items.length
                  )
                }
                aria-label="Next slide"
              >
                Next ▶
              </button>
            </div>
            <div className="carousel-dots" role="group" aria-label="Showcase slides">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`carousel-dot ${i === openIndex ? "active" : ""}`}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setOpenIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

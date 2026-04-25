"use client";

import { useEffect, useState } from "react";
import type { About } from "@/lib/types";

export default function AboutModal({ about }: { about: About }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("about:open", onOpen);
    return () => window.removeEventListener("about:open", onOpen);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={`About ${about.name}`}>
      <div className="about-popover-backdrop" onClick={() => setOpen(false)} />
      <div className="about-popover-panel">
        <div className="about-popover-panel-inner">
          <button
            type="button"
            className="about-popover-close"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <img
            className="about-popover-photo"
            src={about.headshot}
            alt={about.name}
          />
          <p className="text-[15px] leading-7">
            <b>{about.name}</b>
            <br />
            <b>Email:</b>{" "}
            <a href={`mailto:${about.email}`} className="underline">
              {about.email}
            </a>
            <br />
            <b>Phone:</b>{" "}
            <a href={about.phoneHref} className="underline">
              {about.phone}
            </a>
            <br />
            <a
              href={about.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              <b>Resumé</b>
            </a>{" "}
            |{" "}
            <a
              href={about.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              <b>LinkedIn</b>
            </a>
          </p>
          <div style={{ clear: "both", paddingTop: 12 }}>
            <p>
              <b>{about.headline}</b>
            </p>
            <ul className="star-list">
              {about.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

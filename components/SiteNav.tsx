"use client";

import Link from "next/link";
import type { About } from "@/lib/types";

export default function SiteNav({ about }: { about: About }) {
  const openAbout = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("about:open"));
    }
  };

  return (
    <nav className="site-nav">
      <ul>
        <li>
          <h2>
            <button
              type="button"
              className="nav-avatar-btn"
              aria-label="About"
              onClick={openAbout}
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <img className="nav-avatar" src="/assets/about/fn.png" alt="" />
            </button>
            <Link href="/">Farshad Nayeri</Link>
          </h2>
        </li>
        <li>
          <a href={`mailto:${about.email}`}>
            <img className="icon" src="/assets/icons/email.svg" alt="" />
            <span>Email</span>
          </a>
        </li>
        <li>
          <a href={about.smsHref}>
            <img className="icon" src="/assets/icons/call.svg" alt="" />
            <span>Message</span>
          </a>
        </li>
        <li>
          <a href={about.resume} target="_blank" rel="noopener noreferrer">
            <img className="icon" src="/assets/icons/resume.svg" alt="" />
            <span>Resumé</span>
          </a>
        </li>
        <li>
          <a href={about.linkedin} target="_blank" rel="noopener noreferrer">
            <img className="icon" src="/assets/icons/linkedin.svg" alt="" />
            <span>LinkedIn</span>
          </a>
        </li>
        <li>
          <a href={about.blog} target="_blank" rel="noopener noreferrer">
            <img className="icon" src="/assets/icons/blog.svg" alt="" />
            <span>Blog</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

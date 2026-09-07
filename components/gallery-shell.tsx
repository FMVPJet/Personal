"use client";

import { useEffect, useState } from "react";

import MagicCursor from "./magic-cursor";
import SourceMotion from "./source-motion";

export default function GalleryShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="gallery-root">
      <MagicCursor />
      <div id="main" className="g-main">
        {children}
      </div>
      <SourceMotion />

      <div aria-hidden={!showScrollTop} inert={!showScrollTop} className={`g-page-action-right${showScrollTop ? " is-visible" : ""}`}>
        <div className="g-page-action-wrap parallax-wrap">
          <button
            aria-label="Back to top"
            className="g-scroll-top parallax-element"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}
          >
            <span className="g-arrow-left" />
            <span className="g-arrow-right" />
            <span className="g-arrow-top-line" />
          </button>
        </div>
      </div>

    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

import { getFilterOptions } from "@/lib/gallery-model.mjs";
import type { PhotoItem } from "@/config/photos";

interface PhotoGridProps {
  items: PhotoItem[];
  showFilters?: boolean;
}

export default function PhotoGrid({
  items,
  showFilters = true,
}: PhotoGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const filterOptions = getFilterOptions(items) as Array<{
    slug: string;
    label: string;
    count: number;
  }>;
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    grid.querySelectorAll<HTMLElement>(".g-item").forEach((item) => {
      const matches =
        activeFilter === "all" || item.dataset.category === activeFilter;
      gsap.killTweensOf(item);

      if (matches) {
        item.style.display = "block";
        item.setAttribute("aria-hidden", "false");
        gsap.to(item, {
          duration: 0.35,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        item.setAttribute("aria-hidden", "true");
        gsap.to(item, {
          duration: 0.25,
          opacity: 0,
          scale: 0.92,
          ease: "power2.in",
          overwrite: "auto",
          onComplete: () => {
            if (
              activeFilter !== "all" &&
              item.dataset.category !== activeFilter
            ) {
              item.style.display = "none";
            }
          },
        });
      }
    });
  }, [activeFilter]);

  useEffect(() => {
    if (!filterOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFilterOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [filterOpen]);

  const selectFilter = (slug: string) => {
    setActiveFilter(slug);
    setFilterOpen(false);
  };

  return (
    <>
      {showFilters && (
        <>
          <div className="g-page-action-left" data-tooltip="Categories">
            <div className="g-page-action-wrap parallax-wrap">
              <button
                aria-controls="gallery-sidebar-overlay"
                aria-expanded={filterOpen}
                aria-label="Open categories"
                className="g-open-filters parallax-element"
                type="button"
                onClick={() => setFilterOpen((open) => !open)}
              >
                <svg
                  aria-hidden="true"
                  className="g-sort-icon"
                  viewBox="0 0 1024 1792"
                >
                  <path d="M1024 448q0-26-19-45L557-45q-19-19-45-19t-45 19L19 403q-19 19-19 45t19 45 45 19h896q26 0 45-19t19-45zM1024 832q0-26-19-45t-45-19H64q-26 0-45 19t-19 45 19 45l448 448q19 19 45 19t45-19l448-448q19-19 19-45z" />
                </svg>
              </button>
            </div>
          </div>

          <div
            aria-hidden={!filterOpen}
            className={`g-sidebar-overlay${filterOpen ? " is-active" : ""}`}
            id="gallery-sidebar-overlay"
            inert={!filterOpen ? true : undefined}
            role="dialog"
            aria-label="Portfolio categories"
          >
            <button
              aria-label="Close categories"
              className="g-sidebar-close"
              type="button"
              onClick={() => setFilterOpen(false)}
            />
            <div className="g-sidebar-outer">
              <div className="g-sidebar-inner">
                <ul className="g-filter-menu">
                  {filterOptions.map((category) => (
                    <li key={category.slug}>
                      <button
                        aria-pressed={activeFilter === category.slug}
                        className={
                          activeFilter === category.slug ? "is-active" : ""
                        }
                        type="button"
                        onClick={() => selectFilter(category.slug)}
                      >
                        {category.label}
                      </button>
                      <span>{String(category.count).padStart(2, "0")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="g-grid-wrap">
        <div className="g-grid title-big" id="portfolio" ref={gridRef}>
          {items.map((item) => (
            <div
              key={item.id}
              aria-hidden="false"
              className={`g-item item${item.wide ? " is-wide" : ""}`}
              data-category={item.category}
            >
              <Link
                aria-label={item.title.replace(/\n/g, " ")}
                className="g-item-wrap item-wrap"
                data-category-label={item.hoverText}
                data-title={item.title}
                href={`/projects/${item.slug}`}
              >
                <div className="g-item-content item-content">
                  <div
                    aria-hidden="true"
                    className="g-item-image item-image"
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                  />
                  <div aria-hidden="true" className="g-source-caption item-caption">
                    <h2 className="item-title">{item.title}</h2>
                    <div className="item-title-hover">View Project</div>
                    <h4 className="item-cat">{item.hoverText}</h4>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="g-big-title-caption">
        <div className="g-caption-outer">
          <div className="g-caption-inner">
            <div className="g-hover-caption">
              <h2 className="g-caption-title" />
              <p className="g-caption-cat" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

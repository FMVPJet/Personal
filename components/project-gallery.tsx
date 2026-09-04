"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import PhotoSwipeLightbox from "photoswipe/lightbox";

export interface ProjectSlide {
  src: string;
  width: number;
  height: number;
  alt: string;
}

function SourceFadeCarousel({
  projectSlug,
  slides,
}: {
  projectSlug: string;
  slides: ProjectSlide[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesRef = useRef<Array<HTMLDivElement | null>>([]);
  const firstRender = useRef(true);

  useEffect(() => {
    const active = slidesRef.current[activeIndex];
    if (!active) return;

    const previousIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    const previous = slidesRef.current[previousIndex];

    if (firstRender.current) {
      gsap.set(active, { opacity: 1 });
      firstRender.current = false;
      return;
    }

    if (previous) {
      gsap.to(previous, {
        duration: 0.4,
        opacity: 0,
        ease: "power2.inOut",
      });
    }

    gsap.fromTo(
      active,
      { opacity: 0 },
      { duration: 0.4, opacity: 1, ease: "power2.inOut" },
    );
  }, [activeIndex, slides.length]);

  const move = (delta: number) => {
    setActiveIndex((current) => (current + delta + slides.length) % slides.length);
  };

  return (
    <div
      aria-label={`${projectSlug} process carousel`}
      className="g-carousel ns-fade has-animation"
      data-delay="10"
      role="region"
    >
      {slides.map((slide, index) => (
        <div
          aria-hidden={index !== activeIndex}
          className={`g-carousel-slide slide${index === activeIndex ? " ns-active" : ""}`}
          key={slide.src}
          ref={(element) => {
            slidesRef.current[index] = element;
          }}
        >
          <Image
            alt={slide.alt}
            height={slide.height}
            src={slide.src}
            width={slide.width}
            sizes="(max-width: 478px) 100vw, 80vw"
            unoptimized
          />
        </div>
      ))}
      <button
        aria-label="Previous carousel slide"
        className="g-carousel-zone g-carousel-prev ns-zone ns-prev"
        type="button"
        onClick={() => move(-1)}
      />
      <button
        aria-label="Next carousel slide"
        className="g-carousel-zone g-carousel-next ns-zone ns-next"
        type="button"
        onClick={() => move(1)}
      />
      <div className="g-carousel-dots ns-dots">
        {slides.map((slide, index) => (
          <button
            aria-label={`Show carousel slide ${index + 1}`}
            aria-pressed={index === activeIndex}
            className={`g-carousel-dot ns-dot${index === activeIndex ? " active" : ""}`}
            key={slide.src}
            type="button"
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectGallery({
  galleryId,
  slides,
  carousel,
}: {
  galleryId: string;
  slides: ProjectSlide[];
  carousel?: { type: "fade"; slides: ProjectSlide[] };
}) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const lightbox = new PhotoSwipeLightbox({
      gallery,
      children: "a.image-link",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();
    return () => lightbox.destroy();
  }, []);

  return (
    <>
      {carousel && (
        <section className="g-project-row g-project-carousel-row">
          <SourceFadeCarousel
            projectSlug={galleryId}
            slides={carousel.slides}
          />
        </section>
      )}

      <section
        aria-label="Project images"
        className="g-project-gallery"
        id={galleryId}
        ref={galleryRef}
      >
        {slides.map((slide, index) => (
          <figure className="g-project-figure has-animation" data-delay="10" key={slide.src}>
            <a
              className="image-link"
              data-pswp-height={slide.height}
              data-pswp-width={slide.width}
              href={slide.src}
            >
              <Image
                alt={slide.alt}
                height={slide.height}
                loading={index === 0 ? "eager" : "lazy"}
                src={slide.src}
                width={slide.width}
                sizes="(max-width: 767px) calc(100vw - 60px), 80vw"
                unoptimized
              />
            </a>
            {slide.alt && <figcaption>{slide.alt}</figcaption>}
          </figure>
        ))}
      </section>
    </>
  );
}

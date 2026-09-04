"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function isReducedMotion() {
  return window.matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false;
}

function bindRevealAnimations(cleanups: Array<() => void>) {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".has-animation"));
  if (!elements.length || !("IntersectionObserver" in window)) return;

  const timers = new Set<number>();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target as HTMLElement;
      const delay = Number.parseInt(element.dataset.delay ?? "0", 10) || 0;
      if (delay > 0 && !isReducedMotion()) {
        const timer = window.setTimeout(() => {
          element.classList.add("animate-in");
          timers.delete(timer);
        }, delay);
        timers.add(timer);
      } else {
        element.classList.add("animate-in");
      }
      observer.unobserve(element);
    }
  });

  elements.forEach((element) => observer.observe(element));
  cleanups.push(() => {
    observer.disconnect();
    timers.forEach((timer) => window.clearTimeout(timer));
  });
}

function bindHeroParallax(cleanups: Array<() => void>) {
  const heroStyles = document.querySelector<HTMLElement>("#hero-styles.parallax-onscroll");
  const heroCaption = document.querySelector<HTMLElement>("#hero-caption");
  const heroImage = document.querySelector<HTMLElement>("#hero-image-parallax");
  const heroBackground = document.querySelector<HTMLElement>("#hero-bg-image");
  const heroWrapper = document.querySelector<HTMLElement>("#hero-bg-wrapper");
  if (!heroStyles) return;

  const onScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (!isReducedMotion()) {
      if (heroCaption) gsap.to(heroCaption, { duration: 0.1, y: scrollTop / 4, overwrite: "auto" });
      if (heroImage) gsap.to(heroImage, { duration: 0.1, y: scrollTop / 5, overwrite: "auto" });
    }
    if (heroStyles.classList.contains("opacity-onscroll") && heroCaption) {
      heroCaption.style.opacity = String(Math.max(0, 1 - scrollTop / 600));
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!heroWrapper || !heroBackground || isReducedMotion()) return;
    const bounds = heroWrapper.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    gsap.to(heroBackground, {
      duration: 1,
      x: ((x - bounds.width / 2) / bounds.width) * -30,
      y: ((y - bounds.height / 2) / bounds.height) * -30,
      overwrite: "auto",
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  heroWrapper?.addEventListener("mousemove", onMouseMove);
  onScroll();
  cleanups.push(() => {
    window.removeEventListener("scroll", onScroll);
    heroWrapper?.removeEventListener("mousemove", onMouseMove);
    gsap.killTweensOf([heroCaption, heroImage, heroBackground].filter(Boolean));
  });
}

function bindPortfolioHover(cleanups: Array<() => void>) {
  const portfolio = document.querySelector<HTMLElement>("#portfolio.title-big");
  const title = document.querySelector<HTMLElement>(".g-caption-title");
  const category = document.querySelector<HTMLElement>(".g-caption-cat");
  const overlay = document.querySelector<HTMLElement>(".g-big-title-caption");
  if (!portfolio || !title || !category || !overlay) return;

  const titleNodes = [title];
  const categoryNodes = [category];
  const cleanupsForItems: Array<() => void> = [];
  const items = Array.from(portfolio.querySelectorAll<HTMLElement>(".g-item-wrap"));
  let activeItem: HTMLElement | null = null;

  const positionCaption = (immediate = false) => {
    if (!activeItem) return;
    const bounds = activeItem.getBoundingClientRect();
    const position = {
      left: bounds.left + bounds.width / 2,
      top: bounds.top + bounds.height / 2,
    };

    if (immediate) {
      gsap.set(overlay, position);
    } else {
      gsap.to(overlay, {
        ...position,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };
  const repositionCaption = () => positionCaption();

  items.forEach((item) => {
    const show = () => {
      activeItem = item;
      title.textContent = item.dataset.title ?? "";
      category.textContent = item.dataset.categoryLabel ?? "";
      positionCaption(true);
      overlay.classList.add("is-active");
      gsap.killTweensOf([...titleNodes, ...categoryNodes]);
      gsap.set(titleNodes, { y: 50, opacity: 0 });
      gsap.set(categoryNodes, { y: 30, opacity: 0 });
      gsap.to(title, { duration: 0.2, opacity: 1, y: 0, delay: 0.15, ease: "power2.out" });
      gsap.to(category, { duration: 0.2, opacity: 1, y: 0, delay: 0.25, ease: "power2.out" });
    };
    const hide = () => {
      if (activeItem !== item) return;
      activeItem = null;
      gsap.killTweensOf([title, category]);
      gsap.to(title, { duration: 0.2, opacity: 0, y: -50, ease: "power2.in" });
      gsap.to(category, { duration: 0.2, opacity: 0, y: -30, delay: 0.05, ease: "power2.in" });
      gsap.set(title, { y: 50, opacity: 0, delay: 0.2 });
      gsap.set(category, { y: 30, opacity: 0, delay: 0.25 });
      overlay.classList.remove("is-active");
    };

    item.addEventListener("mouseenter", show);
    item.addEventListener("focus", show);
    item.addEventListener("mouseleave", hide);
    item.addEventListener("blur", hide);
    cleanupsForItems.push(() => {
      item.removeEventListener("mouseenter", show);
      item.removeEventListener("focus", show);
      item.removeEventListener("mouseleave", hide);
      item.removeEventListener("blur", hide);
    });
  });

  window.addEventListener("scroll", repositionCaption, { passive: true });
  window.addEventListener("resize", repositionCaption);

  cleanups.push(() => {
    cleanupsForItems.forEach((cleanup) => cleanup());
    window.removeEventListener("scroll", repositionCaption);
    window.removeEventListener("resize", repositionCaption);
    gsap.killTweensOf(overlay);
    gsap.killTweensOf([...titleNodes, ...categoryNodes]);
  });
}

function bindPageEntrance(cleanups: Array<() => void>) {
  const main = document.querySelector<HTMLElement>("#main");
  if (!main) return;

  const heroTitles = Array.from(document.querySelectorAll<HTMLElement>(".hero-title"));
  const heroSubtitles = Array.from(document.querySelectorAll<HTMLElement>(".hero-subtitle"));
  const heroBackground = document.querySelector<HTMLElement>("#hero-bg-image");
  const itemWraps = Array.from(document.querySelectorAll<HTMLElement>("#portfolio .g-item-wrap"));
  const timeline = gsap.timeline();

  gsap.set(main, { opacity: 0 });
  if (heroTitles.length) gsap.set(heroTitles, { y: "10vh", opacity: 0 });
  if (heroSubtitles.length) gsap.set(heroSubtitles, { y: "15vh", opacity: 0 });
  if (heroBackground && !isReducedMotion()) gsap.set(heroBackground, { opacity: 0, scale: 1.2 });

  timeline.to(main, { duration: 0.2, opacity: 1, delay: 0.1, ease: "power2.out" });
  if (heroBackground && !isReducedMotion()) {
    timeline.to(heroBackground, { duration: 0.7, scale: 1.05, opacity: 1, delay: 0.4, ease: "power2.out" }, 0);
  }
  if (heroTitles.length) {
    timeline.to(heroTitles, { duration: 0.4, y: 0, opacity: 1, delay: 0.6, ease: "power2.out" }, 0);
  }
  if (heroSubtitles.length) {
    timeline.to(heroSubtitles, { duration: 0.4, y: 0, opacity: 1, delay: 0.65, ease: "power2.out" }, 0);
  }
  itemWraps.forEach((item, index) => {
    gsap.set(item, { y: 200, opacity: 0 });
    timeline.to(item, { duration: 0.5, y: 0, opacity: 1, delay: 0.1, ease: "power2.out" }, 0.2 + index * 0.1);
  });

  cleanups.push(() => timeline.kill());
}

export default function SourceMotion() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    if (isReducedMotion()) {
      gsap.defaults({ duration: 0 });
    }

    bindPageEntrance(cleanups);
    bindRevealAnimations(cleanups);
    bindHeroParallax(cleanups);
    bindPortfolioHover(cleanups);

    return () => {
      cleanups.reverse().forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}

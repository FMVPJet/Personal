"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

function internalPath(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href");
  if (
    !href ||
    !href.startsWith("/") ||
    href.startsWith("//") ||
    href.startsWith("/assets/")
  ) {
    return null;
  }
  return href;
}

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const firstPath = useRef(pathname);

  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href^='/']"));
    const prefetch = (event: Event) => {
      const anchor = event.currentTarget as HTMLAnchorElement;
      const href = internalPath(anchor);
      if (href) router.prefetch(href);
    };
    const markNavigation = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (internalPath(event.currentTarget as HTMLAnchorElement)) {
        document.documentElement.classList.add("is-navigating");
      }
    };

    anchors.forEach((anchor) => {
      anchor.addEventListener("mouseenter", prefetch, { passive: true });
      anchor.addEventListener("focus", prefetch, { passive: true });
      anchor.addEventListener("click", markNavigation);
    });

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) prefetch({ currentTarget: entry.target } as unknown as Event);
          });
        }, { rootMargin: "400px" })
      : null;
    anchors.forEach((anchor) => observer?.observe(anchor));

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("mouseenter", prefetch);
        anchor.removeEventListener("focus", prefetch);
        anchor.removeEventListener("click", markNavigation);
      });
      observer?.disconnect();
    };
  }, [router, pathname]);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("#main");
    if (!main) return;

    const timeline = gsap.timeline({
      onComplete: () => document.documentElement.classList.remove("is-navigating"),
    });
    if (firstPath.current !== pathname) {
      gsap.set(main, { opacity: 0, y: 18 });
      timeline.to(main, { duration: 0.2, opacity: 1, y: 0, ease: "power2.out" });
      firstPath.current = pathname;
    } else {
      timeline.to(main, { duration: 0.2, opacity: 1, ease: "power2.out" });
    }

    return () => {
      timeline.kill();
    };
  }, [pathname]);

  return <div className="g-transition-frame">{children}</div>;
}

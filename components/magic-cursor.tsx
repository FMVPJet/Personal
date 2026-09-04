"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function MagicCursor() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches;
    if (coarsePointer || "ontouchstart" in window) {
      setIsHidden(true);
      return;
    }

    const ball = document.getElementById("ball");
    const loader = document.getElementById("ball-loader");
    if (!ball || !loader) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let enlarged = false;
    const cleanups: Array<() => void> = [];

    gsap.set(ball, {
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      opacity: 0,
      borderWidth: "2px",
      backgroundColor: "rgba(0, 0, 0, 0)",
    });
    gsap.set(loader, { scale: 1, borderWidth: "2px", top: 0, left: 0 });

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      gsap.to(ball, { duration: 0.15, opacity: 1, overwrite: "auto" });
    };
    const tick = () => {
      currentX += (targetX - currentX) * 0.25;
      currentY += (targetY - currentY) * 0.25;
      gsap.set(ball, { x: currentX, y: currentY });
    };

    document.addEventListener("mousemove", onMove);
    gsap.ticker.add(tick);
    cleanups.push(() => {
      document.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tick);
    });

    const setEnlarged = (next: boolean) => {
      if (next === enlarged) return;
      enlarged = next;
      gsap.to(ball, {
        duration: 0.3,
        scale: next ? 2 : 1,
        borderWidth: next ? "1px" : "2px",
        opacity: next ? 0.2 : 1,
        overwrite: "auto",
      });
      gsap.to(loader, {
        duration: 0.3,
        scale: next ? 2 : 1,
        borderWidth: next ? "1px" : "2px",
        top: next ? 1 : 0,
        left: next ? 1 : 0,
        overwrite: "auto",
      });
    };

    document.querySelectorAll<HTMLElement>(".parallax-wrap").forEach((element) => {
      const onEnter = () => {
        gsap.to(element, { duration: 0.3, scale: 2, overwrite: "auto" });
        gsap.to(element.children, { duration: 0.3, scale: 0.5, overwrite: "auto" });
        setEnlarged(true);
      };
      const onLeave = () => {
        gsap.to(element, { duration: 0.3, scale: 1, overwrite: "auto" });
        gsap.to(element.children, { duration: 0.3, scale: 1, x: 0, y: 0, overwrite: "auto" });
        setEnlarged(false);
      };
      const onElementMove = (event: MouseEvent) => {
        const bounds = element.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        const cursorX = bounds.left + bounds.width / 2 + (x - bounds.width / 2) / 2;
        const cursorY = bounds.top + bounds.height / 2 + (y - bounds.height / 2) / 2;
        currentX = cursorX;
        currentY = cursorY;
        gsap.to(ball, { duration: 0.3, x: cursorX, y: cursorY, overwrite: "auto" });
        const elementChild = element.querySelector<HTMLElement>(".parallax-element");
        if (elementChild) {
          gsap.to(elementChild, {
            duration: 0.3,
            x: ((x - bounds.width / 2) / bounds.width) * 20,
            y: ((y - bounds.height / 2) / bounds.height) * 20,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };
      element.addEventListener("mouseenter", onEnter);
      element.addEventListener("mouseleave", onLeave);
      element.addEventListener("mousemove", onElementMove);
      cleanups.push(() => {
        element.removeEventListener("mouseenter", onEnter);
        element.removeEventListener("mouseleave", onLeave);
        element.removeEventListener("mousemove", onElementMove);
      });
    });

    document.querySelectorAll<HTMLElement>(".hide-ball").forEach((element) => {
      const onEnter = () => gsap.to(ball, { duration: 0.2, borderWidth: "1px", scale: 2, opacity: 0, overwrite: "auto" });
      const onLeave = () => gsap.to(ball, { duration: 0.3, borderWidth: "2px", scale: 1, opacity: 1, overwrite: "auto" });
      element.addEventListener("mouseenter", onEnter);
      element.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        element.removeEventListener("mouseenter", onEnter);
        element.removeEventListener("mouseleave", onLeave);
      });
    });

    document.querySelectorAll<HTMLElement>(".item-content").forEach((element) => {
      const onEnter = () => gsap.to(ball, { duration: 0.2, scale: 1.8, borderWidth: "1px", backgroundColor: "rgba(0, 0, 0, 1)", overwrite: "auto" });
      const onLeave = () => gsap.to(ball, { duration: 0.2, scale: 1, borderWidth: "2px", backgroundColor: "rgba(0, 0, 0, 0)", overwrite: "auto" });
      element.addEventListener("mouseenter", onEnter);
      element.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        element.removeEventListener("mouseenter", onEnter);
        element.removeEventListener("mouseleave", onLeave);
      });
    });

    document.querySelectorAll<HTMLElement>(".link").forEach((element) => {
      const onEnter = () => gsap.to(ball, { duration: 0.2, borderWidth: "0px", scale: 3, backgroundColor: "rgba(0, 0, 0, 1)", opacity: 0.05, overwrite: "auto" });
      const onLeave = () => gsap.to(ball, { duration: 0.3, borderWidth: "2px", scale: 1, backgroundColor: "rgba(0, 0, 0, 0)", opacity: 1, overwrite: "auto" });
      element.addEventListener("mouseenter", onEnter);
      element.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        element.removeEventListener("mouseenter", onEnter);
        element.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      cleanups.reverse().forEach((cleanup) => cleanup());
      gsap.killTweensOf([ball, loader]);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div aria-hidden="true" className="g-magic-cursor" id="magic-cursor">
      <div className="g-ball" id="ball">
        <div className="g-ball-loader" id="ball-loader" />
      </div>
    </div>
  );
}

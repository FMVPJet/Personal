"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import MagicCursor from "./magic-cursor";
import SourceMotion from "./source-motion";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "/#about", label: "About", hash: "#about" },
  { href: "/#devices", label: "Device", hash: "#devices" },
];

export default function GalleryShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerHidden, setHeaderHidden] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [wechatOpen, setWechatOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const syncHash = () => setCurrentHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    let lastScroll = 0;

    const onScroll = () => {
      const currentScroll = window.scrollY;
      setShowScrollTop(currentScroll > 300);
      // Hide header when scrolling down past 80px
      if (currentScroll > 80 && currentScroll > lastScroll) {
        setHeaderHidden(true);
      } else if (currentScroll < lastScroll) {
        setHeaderHidden(false);
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="gallery-root">
      <MagicCursor />
      <header className={`g-header${headerHidden ? " scroll-hide" : ""}`}>
        <nav aria-label="Primary navigation" className="g-top-nav">
          <ul>
            {navLinks.map((link) => {
              const isActive = pathname === "/" &&
                (currentHash === link.hash || (!currentHash && link.hash === "#about"));

              return (
                <li key={link.href}>
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    className={`g-top-nav-link${isActive ? " is-active" : ""}`}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <div id="main" className="g-main">
        {children}
      </div>
      <SourceMotion />

      <div className="g-footer-container">
        <footer className="g-footer">
          Follow me on{" "}
          <a className="g-link link" href={siteConfig.links.github} rel="noopener" target="_blank">
            GitHub
          </a>
          ,{" "}
          <a className="g-link link" href={siteConfig.links.linkedin} rel="noopener" target="_blank">
            LinkedIn
          </a>
          ,{" "}
          <a className="g-link link" href={siteConfig.links.instagram} rel="noopener" target="_blank">
            Instagram
          </a>
          <br />
          Say hello at{" "}
          <a className="g-link link" href={siteConfig.links.email}>
            {siteConfig.links.email.replace("mailto:", "")}
          </a>
          <span className="g-wechat">
            {" "}or{" "}
            <button
              aria-expanded={wechatOpen}
              className="g-link g-wechat-link link parallax-element"
              type="button"
              onClick={() => setWechatOpen((open) => !open)}
            >
              add me on WeChat
            </button>
            {wechatOpen && (
              <span className="g-wechat-popover" role="tooltip">
                <Image
                  alt="WeChat QR code"
                  height="100"
                  src="/assets/wechat-qr.svg"
                  width="100"
                />
              </span>
            )}
          </span>
        </footer>
      </div>

      <div className={`g-page-action-right${showScrollTop ? " is-visible" : ""}`}>
        <div className="g-page-action-wrap parallax-wrap">
          <button
            aria-label="Back to top"
            className="g-scroll-top parallax-element"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

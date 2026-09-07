"use client";

import Image from "next/image";
import type { RefObject } from "react";

import { siteConfig } from "@/config/site";

interface AboutSectionProps {
  devicesButtonRef: RefObject<HTMLButtonElement | null>;
  isDevicesActive: boolean;
  isHidden: boolean;
  onDevicesClick: () => void;
}

export default function AboutSection({
  devicesButtonRef,
  isDevicesActive,
  isHidden,
  onDevicesClick,
}: AboutSectionProps) {
  return (
    <section
      aria-hidden={isHidden}
      aria-labelledby="profile-name"
      className="g-about-long-page"
      id="about"
      inert={isHidden}
    >
      <div className="g-about-content" id="main-content">
        <section className="g-about-row g-about-bio">
          <div className="g-about-bio-copy has-animation" data-delay="150">
            <p className="g-about-greeting">Hi, I&apos;m</p>
            <h1 id="profile-name">
              {siteConfig.name}
              <span aria-hidden="true" className="g-about-name-emoji">
                👋
              </span>
            </h1>
            <p className="g-about-role">{siteConfig.role}</p>
            <p className="g-about-summary">{siteConfig.heroSummary}</p>
            <nav aria-label="Profile links" className="g-about-links">
              <a
                className="g-about-button g-about-button-primary"
                href={siteConfig.links.resume}
                rel="noreferrer"
                target="_blank"
              >
                View CV
              </a>
              <a
                className="g-about-button"
                href={siteConfig.links.github}
                rel="noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              <button
                ref={devicesButtonRef}
                aria-pressed={isDevicesActive}
                aria-controls="device-view"
                className="g-about-button"
                type="button"
                onClick={onDevicesClick}
              >
                Devices
              </button>
              <a className="g-about-button" href={siteConfig.links.email}>
                Email
              </a>
            </nav>
          </div>
          <div className="g-about-photo has-animation" data-delay="100">
            <Image
              alt={`${siteConfig.name} avatar`}
              height={1080}
              priority
              sizes="(max-width: 479px) 136px, (max-width: 767px) 152px, 264px"
              src="/assets/images/profile/me.jpg"
              width={1080}
            />
          </div>
        </section>
      </div>
    </section>
  );
}

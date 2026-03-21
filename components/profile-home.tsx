"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { BadgeProfile } from "@/components/band";

const getAvatarInitials = (name: string) => {
  const trimmed = name.trim();
  if (!trimmed) return "JK";
  return trimmed
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};

type HomeContent = {
  name: string;
  title: string;
  heroSummary: string;
  labels: {
    openCard: string;
    openResume: string;
  };
};

const handleHeroButtonPointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
};

const handleHeroButtonPointerLeave = (event: React.PointerEvent<HTMLAnchorElement>) => {
  event.currentTarget.style.removeProperty("--glow-x");
  event.currentTarget.style.removeProperty("--glow-y");
};

function HeroAvatar({
  content,
  profile,
  avatarFailed,
  onAvatarError,
  avatarInitials,
  onOpenCard,
}: {
  content: HomeContent;
  profile: BadgeProfile;
  avatarFailed: boolean;
  onAvatarError: () => void;
  avatarInitials: string;
  onOpenCard: () => void;
}) {
  const avatarNode =
    profile.avatarUrl && !avatarFailed ? (
      <Image
        data-testid="home-profile-avatar"
        src={profile.avatarUrl}
        alt={`${content.name} avatar`}
        width={264}
        height={264}
        className="home-avatar-media"
        unoptimized
        onError={onAvatarError}
      />
    ) : (
      <span
        data-testid="home-avatar-placeholder"
        className="home-avatar-media home-avatar-placeholder"
      >
        {avatarInitials}
      </span>
    );

  return (
    <button
      type="button"
      data-testid="open-card"
      onClick={onOpenCard}
      className="home-avatar-button"
      aria-label={content.labels.openCard}
    >
      {avatarNode}
    </button>
  );
}

function HomeHero({
  content,
  profile,
  onOpenCard,
  avatarFailed,
  onAvatarError,
  avatarInitials,
}: {
  content: HomeContent;
  profile: BadgeProfile;
  onOpenCard: () => void;
  avatarFailed: boolean;
  onAvatarError: () => void;
  avatarInitials: string;
}) {
  return (
    <section className="home-section home-hero-section" data-testid="home-page-home">
      <div className="home-hero-shell">
        <div className="home-hero-content">
          <div className="home-hero-copy">
            <p className="home-hero-greeting">Hi, I&apos;m</p>
            <h1 className="home-hero-name">
              {content.name}
              <span className="home-hero-emoji" aria-hidden="true">
                👋
              </span>
            </h1>
            <p className="home-hero-title">{content.title}</p>
            <p className="home-hero-summary">{content.heroSummary}</p>
          </div>

          <div className="home-hero-actions">
            <div className="home-hero-buttons">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="home-hero-button home-hero-button-primary"
                onPointerMove={handleHeroButtonPointerMove}
                onPointerLeave={handleHeroButtonPointerLeave}
              >
                <span>{content.labels.openResume}</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="home-hero-button home-hero-button-secondary"
                onPointerMove={handleHeroButtonPointerMove}
                onPointerLeave={handleHeroButtonPointerLeave}
              >
                <span>GitHub</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="home-hero-button home-hero-button-secondary"
                onPointerMove={handleHeroButtonPointerMove}
                onPointerLeave={handleHeroButtonPointerLeave}
              >
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="home-hero-visual">
          <HeroAvatar
            content={content}
            profile={profile}
            avatarFailed={avatarFailed}
            onAvatarError={onAvatarError}
            avatarInitials={avatarInitials}
            onOpenCard={onOpenCard}
          />
        </div>
      </div>
    </section>
  );
}

export default function ProfileHome({
  profile,
  theme,
  onOpenCard,
}: {
  profile: BadgeProfile;
  theme: "light" | "dark";
  onOpenCard: () => void;
}) {
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    setAvatarFailed(false);
  }, [profile.avatarUrl]);

  const content: HomeContent = {
    name: profile.name,
    title: profile.title,
    heroSummary: profile.heroSummary,
    labels: {
      openCard: "View card",
      openResume: "View CV",
    },
  };

  const avatarInitials = getAvatarInitials(content.name);
  return (
    <div data-testid="profile-home" data-theme-mode={theme} className="relative z-10 h-full">
      <div className="home-inline-scroll h-full">
        <div className="mx-auto flex h-full w-full max-w-[1160px] items-center px-6 py-0 sm:px-8 lg:px-10">
          <HomeHero
            content={content}
            profile={profile}
            onOpenCard={onOpenCard}
            avatarFailed={avatarFailed}
            onAvatarError={() => setAvatarFailed(true)}
            avatarInitials={avatarInitials}
          />
        </div>
      </div>
    </div>
  );
}

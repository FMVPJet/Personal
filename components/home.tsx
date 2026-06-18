"use client";

import { Responsive } from "react-grid-layout";
import { useState } from "react";
import { Tabs, Tab } from "@heroui/react";

import { cn } from "@/lib/utils";
import { layouts, selectedCard } from "@/config/layout";
import useWindowWidth from "@/hooks/useWindowWidth";
import AvatarCard from "./avatar-card";
import ThemeSwitchCard from "./theme-switch-card";
import TechStackCard from "./tech-stack-card";
import LocationCard from "./location-card";
import LinkCard from "./link-card";
import ExperienceCard from "./experience-card";

const Home = () => {
  const { width } = useWindowWidth();
  const [tabSelected, setTabSelected] = useState("all");

  if (!width) {
    return null;
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <Tabs
        aria-label="Navigation tabs"
        selectedKey={tabSelected}
        onSelectionChange={(key) => setTabSelected(key as string)}
        className="mb-6"
        color="primary"
        variant="underlined"
      >
        <Tab key="all" title="All" />
        <Tab key="about" title="About" />
        <Tab key="projects" title="Projects" />
      </Tabs>

      <Responsive
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        className="layout w-full h-full"
        cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 }}
        draggableCancel=".no-drag"
        layouts={layouts[tabSelected]}
        margin={[15, 15]}
        width={width}
      >
        {/* Avatar Card */}
        <div
          key="avatar"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex flex-col justify-between p-5 overflow-hidden z-[1]",
            selectedCard[tabSelected]["avatar"] ? "opacity-100" : "opacity-50",
          )}
        >
          <AvatarCard />
        </div>

        {/* Theme Switch Card */}
        <div
          key="themeSwitch"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1]",
            selectedCard[tabSelected]["themeSwitch"]
              ? "opacity-100"
              : "opacity-50",
          )}
        >
          <ThemeSwitchCard />
        </div>

        {/* Card Stack - Photos */}
        <div
          key="cardStack"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center p-5 z-[1]",
            selectedCard[tabSelected]["cardStack"] ? "opacity-100" : "opacity-50",
          )}
        >
          <div className="text-4xl">📸</div>
        </div>

        {/* Animated Emoji */}
        <div
          key="animatedEmoji"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center p-5 z-[1]",
            selectedCard[tabSelected]["animatedEmoji"]
              ? "opacity-100"
              : "opacity-50",
          )}
        >
          <div className="text-6xl">👋</div>
        </div>

        {/* Map Component - Location */}
        <div
          key="mapComponent"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center p-5 z-[1]",
            selectedCard[tabSelected]["mapComponent"]
              ? "opacity-100"
              : "opacity-50",
          )}
        >
          <LocationCard />
        </div>

        {/* Icon Cloud - Tech Stack */}
        <div
          key="iconCloud"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center p-5 overflow-hidden z-[1]",
            selectedCard[tabSelected]["iconCloud"] ? "opacity-100" : "opacity-50",
          )}
        >
          <TechStackCard />
        </div>

        {/* Web Agent */}
        <div
          key="webAgent"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex flex-col justify-start items-start p-5 z-[1]",
            selectedCard[tabSelected]["webAgent"] ? "opacity-100" : "opacity-50",
          )}
        >
          <div className="text-2xl mb-2">🤖</div>
          <h3 className="font-semibold">Web Agent</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            AI-powered automation
          </p>
        </div>

        {/* Chat Bot */}
        <div
          key="chatBot"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex flex-col justify-center items-center p-5 z-[1]",
            selectedCard[tabSelected]["chatBot"] ? "opacity-100" : "opacity-50",
          )}
        >
          <div className="text-4xl mb-2">💬</div>
          <h3 className="font-semibold">Chat Bot</h3>
        </div>

        {/* Mini Model */}
        <div
          key="miniModel"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex flex-col justify-center items-center p-5 z-[1]",
            selectedCard[tabSelected]["miniModel"] ? "opacity-100" : "opacity-50",
          )}
        >
          <div className="text-4xl">🧠</div>
          <span className="text-xs mt-2">AI Model</span>
        </div>

        {/* Actions - Links */}
        <div
          key="actions"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1]",
            selectedCard[tabSelected]["actions"] ? "opacity-100" : "opacity-50",
          )}
        >
          <div className="flex flex-col gap-3 p-5 w-full">
            <LinkCard
              href="/assets/resume/resume.pdf"
              icon="📄"
              label="Resume"
            />
            <LinkCard
              href="https://github.com/FMVPJet"
              icon="🐙"
              label="GitHub"
              external
            />
            <LinkCard
              href="mailto:JetKwok827@gmail.com"
              icon="✉️"
              label="Email"
            />
          </div>
        </div>

        {/* Paper/Experience */}
        <div
          key="paper"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex flex-col justify-center items-start p-5 z-[1]",
            selectedCard[tabSelected]["paper"] ? "opacity-100" : "opacity-50",
          )}
        >
          <ExperienceCard />
        </div>
      </Responsive>
    </div>
  );
};

export default Home;

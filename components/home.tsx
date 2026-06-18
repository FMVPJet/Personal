"use client";

import { Responsive } from "react-grid-layout";
import { useEffect, useState } from "react";

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
  const [tabSelected] = useState("all");

  if (!width) {
    return null;
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <Responsive
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        className="layout w-full h-full"
        cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 }}
        draggableCancel=".no-drag"
        layouts={layouts[tabSelected]}
        margin={[15, 15]}
        width={width}
      >
        <div
          key="avatar"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex flex-col justify-between p-5 overflow-hidden z-[1]",
            selectedCard[tabSelected]["avatar"] ? "opacity-100" : "opacity-50",
          )}
        >
          <AvatarCard />
        </div>

        <div
          key="themeSwitch"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1]",
            selectedCard[tabSelected]["themeSwitch"] ? "opacity-100" : "opacity-50",
          )}
        >
          <ThemeSwitchCard />
        </div>

        <div
          key="techStack"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center p-5 overflow-hidden z-[1]",
            selectedCard[tabSelected]["techStack"] ? "opacity-100" : "opacity-50",
          )}
        >
          <TechStackCard />
        </div>

        <div
          key="location"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center p-5 z-[1]",
            selectedCard[tabSelected]["location"] ? "opacity-100" : "opacity-50",
          )}
        >
          <LocationCard />
        </div>

        <div
          key="resume"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1]",
            selectedCard[tabSelected]["resume"] ? "opacity-100" : "opacity-50",
          )}
        >
          <LinkCard
            href="/assets/resume/resume.pdf"
            icon="📄"
            label="Resume"
          />
        </div>

        <div
          key="github"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1]",
            selectedCard[tabSelected]["github"] ? "opacity-100" : "opacity-50",
          )}
        >
          <LinkCard
            href="https://github.com/FMVPJet"
            icon="🐙"
            label="GitHub"
            external
          />
        </div>

        <div
          key="email"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1]",
            selectedCard[tabSelected]["email"] ? "opacity-100" : "opacity-50",
          )}
        >
          <LinkCard
            href="mailto:JetKwok827@gmail.com"
            icon="✉️"
            label="Email"
          />
        </div>

        <div
          key="experience"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex flex-col justify-center items-start p-5 z-[1]",
            selectedCard[tabSelected]["experience"] ? "opacity-100" : "opacity-50",
          )}
        >
          <ExperienceCard />
        </div>
      </Responsive>
    </div>
  );
};

export default Home;


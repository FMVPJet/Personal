"use client";

import { Tab, Tabs } from "@heroui/react";
import { Responsive } from "react-grid-layout";
import { useState } from "react";
import dynamic from "next/dynamic";
import { HashLoader } from "react-spinners";

import Paper from "./paper";

import { cn } from "@/lib/utils";
import AvatarTransition from "@/components/avatar";
import { DockDemo } from "@/components/dock-demo";
import { ThemeSwitch } from "@/components/theme-switch";
import MiniPic from "@/components/mini-pic";
import Actions from "@/components/actions";
import { layouts, tabCards } from "@/config/layout";
import { icons } from "@/config/icons";
import useWindowWidth from "@/hooks/useWindowWidth";

const LoadingPlaceholder = () => (
  <div className="w-full h-full flex justify-center items-center">
    <HashLoader color="#eef0f7" size={50} />
  </div>
);

const IconCloud = dynamic(() => import("@/components/icon-cloud"), {
  ssr: false,
  loading: LoadingPlaceholder,
});

const MapComponent = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: LoadingPlaceholder,
});

const MiniModel = dynamic(
  () => import("@/components/mini").then((mod) => mod.MiniModel),
  {
    ssr: false,
    loading: LoadingPlaceholder,
  },
);

const AnimatedEmoji = dynamic(() => import("@/components/animated-emoji"), {
  loading: LoadingPlaceholder,
});

const CardStack = dynamic(() => import("@/components/card-stack"), {
  loading: LoadingPlaceholder,
});

const WebAgent = dynamic(() => import("@/components/webagent"), {
  loading: LoadingPlaceholder,
});

const Chatbot = dynamic(() => import("@/components/chatbot"), {
  loading: LoadingPlaceholder,
});

const CARD_BASE =
  "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight rounded-[2rem] flex justify-center items-center overflow-hidden z-[1]";

interface HomeClientProps {
  photos: string[];
  avatarUrl: string;
  dogUrl: string;
  actionImageUrl: string;
  webagentUrl: string;
  chatbotUrl: string;
  paperUrl: string;
}

export default function HomeClient({
  photos,
  avatarUrl,
  dogUrl,
  actionImageUrl,
  webagentUrl,
  chatbotUrl,
  paperUrl,
}: HomeClientProps) {
  const { width, settled } = useWindowWidth();
  const [tabSelected, setTabSelected] = useState("home");
  const [show3D, setShow3D] = useState(false);

  if (!width) {
    return null;
  }

  // All card nodes keyed by id; only those in the active tab are rendered.
  const cards: Record<string, React.ReactNode> = {
    avatar: (
      <div
        key="avatar"
        className={cn(CARD_BASE, "flex-col justify-between items-stretch p-5")}
      >
        <AvatarTransition avatarUrl={avatarUrl} dogUrl={dogUrl} />
        <p className="text-sm md:text-medium">
          Hey! I&apos;m <span className="font-oleo text-2xl"> Jet</span>, a
          Computer Vision Engineer at iFLYTEK working on deep learning and
          MLOps. Passionate about building AI systems that bridge research and
          production. Outside work, I enjoy exploring new ML papers and
          contributing to open source!
        </p>
        <DockDemo />
      </div>
    ),
    cardStack: (
      <div key="cardStack" className={cn(CARD_BASE, "z-[2]")}>
        <CardStack photos={photos} />
      </div>
    ),
    animatedEmoji: (
      <div key="animatedEmoji" className={CARD_BASE}>
        <AnimatedEmoji />
      </div>
    ),
    mapComponent: (
      <div key="mapComponent" className={CARD_BASE}>
        <MapComponent />
      </div>
    ),
    iconCloud: (
      <div key="iconCloud" className={cn(CARD_BASE, "relative p-10 md:p-8")}>
        <IconCloud iconSlugs={icons} />
      </div>
    ),
    webAgent: (
      <div key="webAgent" className={CARD_BASE}>
        <WebAgent webAgentUrl={webagentUrl} />
      </div>
    ),
    chatBot: (
      <div key="chatBot" className={CARD_BASE}>
        <Chatbot chatbotUrl={chatbotUrl} />
      </div>
    ),
    miniModel: (
      <div key="miniModel" className={CARD_BASE}>
        {show3D ? (
          <MiniModel />
        ) : (
          <MiniPic onClick={() => setShow3D(true)} showOverlay />
        )}
      </div>
    ),
    actions: (
      <div key="actions" className={CARD_BASE}>
        <Actions photoUrl={actionImageUrl} />
      </div>
    ),
    paper: (
      <div key="paper" className={CARD_BASE}>
        <Paper paperUrl={paperUrl} />
      </div>
    ),
  };

  const visibleKeys = tabCards[tabSelected] ?? [];

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="mb-2 md:mb-6 flex items-center gap-1 rounded-full bg-[#ece7e7] dark:bg-darkBg border-2 border-transparent dark:border-knight p-1 pr-2">
        <Tabs
          aria-label="Tabs"
          className="rounded-full"
          classNames={{
            cursor: "shadow-none",
            tabList: "bg-transparent rounded-full",
          }}
          radius={"full"}
          selectedKey={tabSelected}
          onSelectionChange={(selected) => {
            setTabSelected(selected as string);
          }}
        >
          <Tab key="home" title="Home" />
          <Tab key="project" title="Project" />
        </Tabs>
        <ThemeSwitch />
      </div>

      <Responsive
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        className={cn(
          "layout w-full h-full",
          settled ? "layout-settled" : "layout-initializing",
        )}
        cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 }}
        isDraggable={false}
        isResizable={false}
        layouts={layouts[tabSelected]}
        margin={[15, 15]}
        width={width}
      >
        {visibleKeys.map((key) => cards[key])}
      </Responsive>
    </div>
  );
}

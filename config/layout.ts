import type { Layout, Layouts } from "react-grid-layout";

export const layouts: Record<string, Layouts> = {
  all: {
    lg: [
      { i: "avatar", x: 0, y: 0, w: 2, h: 2 },
      { i: "themeSwitch", x: 2, y: 0, w: 1, h: 1 },
      { i: "techStack", x: 2, y: 1, w: 1, h: 1 },
      { i: "location", x: 3, y: 0, w: 1, h: 2 },
      { i: "resume", x: 0, y: 2, w: 1, h: 1 },
      { i: "github", x: 1, y: 2, w: 1, h: 1 },
      { i: "email", x: 2, y: 2, w: 1, h: 1 },
      { i: "experience", x: 3, y: 2, w: 1, h: 1 },
    ],
    md: [
      { i: "avatar", x: 0, y: 0, w: 2, h: 2 },
      { i: "themeSwitch", x: 2, y: 0, w: 1, h: 1 },
      { i: "techStack", x: 2, y: 1, w: 1, h: 1 },
      { i: "location", x: 3, y: 0, w: 1, h: 2 },
      { i: "resume", x: 0, y: 2, w: 1, h: 1 },
      { i: "github", x: 1, y: 2, w: 1, h: 1 },
      { i: "email", x: 2, y: 2, w: 1, h: 1 },
      { i: "experience", x: 3, y: 2, w: 1, h: 1 },
    ],
    sm: [
      { i: "avatar", x: 0, y: 0, w: 2, h: 2 },
      { i: "themeSwitch", x: 0, y: 2, w: 1, h: 1 },
      { i: "techStack", x: 1, y: 2, w: 1, h: 1 },
      { i: "location", x: 0, y: 3, w: 2, h: 1 },
      { i: "resume", x: 0, y: 4, w: 1, h: 1 },
      { i: "github", x: 1, y: 4, w: 1, h: 1 },
      { i: "email", x: 0, y: 5, w: 2, h: 1 },
      { i: "experience", x: 0, y: 6, w: 2, h: 1 },
    ],
    xs: [
      { i: "avatar", x: 0, y: 0, w: 2, h: 2 },
      { i: "themeSwitch", x: 0, y: 2, w: 1, h: 1 },
      { i: "techStack", x: 1, y: 2, w: 1, h: 1 },
      { i: "location", x: 0, y: 3, w: 2, h: 1 },
      { i: "resume", x: 0, y: 4, w: 1, h: 1 },
      { i: "github", x: 1, y: 4, w: 1, h: 1 },
      { i: "email", x: 0, y: 5, w: 2, h: 1 },
      { i: "experience", x: 0, y: 6, w: 2, h: 1 },
    ],
    xxs: [
      { i: "avatar", x: 0, y: 0, w: 2, h: 2 },
      { i: "themeSwitch", x: 0, y: 2, w: 1, h: 1 },
      { i: "techStack", x: 1, y: 2, w: 1, h: 1 },
      { i: "location", x: 0, y: 3, w: 2, h: 1 },
      { i: "resume", x: 0, y: 4, w: 1, h: 1 },
      { i: "github", x: 1, y: 4, w: 1, h: 1 },
      { i: "email", x: 0, y: 5, w: 2, h: 1 },
      { i: "experience", x: 0, y: 6, w: 2, h: 1 },
    ],
  },
};

export const selectedCard: Record<string, Record<string, boolean>> = {
  all: {
    avatar: true,
    themeSwitch: true,
    techStack: true,
    location: true,
    resume: true,
    github: true,
    email: true,
    experience: true,
  },
};

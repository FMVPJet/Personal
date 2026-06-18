import type { Layouts } from "react-grid-layout";

// Which cards appear in each tab. themeSwitch is a global tool shown in both.
export const tabCards: Record<string, string[]> = {
  home: ["avatar", "cardStack", "iconCloud", "miniModel", "mapComponent", "themeSwitch"],
  project: ["webAgent", "chatBot", "animatedEmoji", "actions", "paper", "themeSwitch"],
};

export const layouts: Record<string, Layouts> = {
  home: {
    lg: [
      { i: "avatar", x: 0, y: 0, w: 2, h: 2 },
      { i: "cardStack", x: 2, y: 0, w: 2, h: 2 },
      { i: "iconCloud", x: 0, y: 2, w: 1, h: 2 },
      { i: "miniModel", x: 1, y: 2, w: 1, h: 2 },
      { i: "mapComponent", x: 2, y: 2, w: 1, h: 2 },
      { i: "themeSwitch", x: 3, y: 2, w: 1, h: 1 },
    ],
    md: [
      { i: "avatar", x: 0, y: 0, w: 2, h: 2 },
      { i: "cardStack", x: 2, y: 0, w: 2, h: 2 },
      { i: "iconCloud", x: 0, y: 2, w: 1, h: 2 },
      { i: "miniModel", x: 1, y: 2, w: 1, h: 2 },
      { i: "mapComponent", x: 2, y: 2, w: 1, h: 2 },
      { i: "themeSwitch", x: 3, y: 2, w: 1, h: 1 },
    ],
    sm: [
      { i: "avatar", x: 0, y: 0, w: 2, h: 2 },
      { i: "cardStack", x: 0, y: 2, w: 2, h: 2 },
      { i: "iconCloud", x: 0, y: 4, w: 1, h: 2 },
      { i: "miniModel", x: 1, y: 4, w: 1, h: 2 },
      { i: "mapComponent", x: 0, y: 6, w: 2, h: 2 },
      { i: "themeSwitch", x: 0, y: 8, w: 2, h: 1 },
    ],
    xs: [
      { i: "avatar", x: 0, y: 0, w: 2, h: 2 },
      { i: "cardStack", x: 0, y: 2, w: 2, h: 2 },
      { i: "iconCloud", x: 0, y: 4, w: 1, h: 2 },
      { i: "miniModel", x: 1, y: 4, w: 1, h: 2 },
      { i: "mapComponent", x: 0, y: 6, w: 2, h: 2 },
      { i: "themeSwitch", x: 0, y: 8, w: 2, h: 1 },
    ],
    xxs: [
      { i: "avatar", x: 0, y: 0, w: 2, h: 2 },
      { i: "cardStack", x: 0, y: 2, w: 2, h: 2 },
      { i: "iconCloud", x: 0, y: 4, w: 1, h: 2 },
      { i: "miniModel", x: 1, y: 4, w: 1, h: 2 },
      { i: "mapComponent", x: 0, y: 6, w: 2, h: 2 },
      { i: "themeSwitch", x: 0, y: 8, w: 2, h: 1 },
    ],
  },

  project: {
    lg: [
      { i: "webAgent", x: 0, y: 0, w: 1, h: 2 },
      { i: "chatBot", x: 1, y: 0, w: 2, h: 2 },
      { i: "animatedEmoji", x: 3, y: 0, w: 1, h: 2 },
      { i: "actions", x: 0, y: 2, w: 2, h: 2 },
      { i: "paper", x: 2, y: 2, w: 1, h: 2 },
      { i: "themeSwitch", x: 3, y: 2, w: 1, h: 2 },
    ],
    md: [
      { i: "webAgent", x: 0, y: 0, w: 1, h: 2 },
      { i: "chatBot", x: 1, y: 0, w: 2, h: 2 },
      { i: "animatedEmoji", x: 3, y: 0, w: 1, h: 2 },
      { i: "actions", x: 0, y: 2, w: 2, h: 2 },
      { i: "paper", x: 2, y: 2, w: 1, h: 2 },
      { i: "themeSwitch", x: 3, y: 2, w: 1, h: 2 },
    ],
    sm: [
      { i: "chatBot", x: 0, y: 0, w: 2, h: 2 },
      { i: "animatedEmoji", x: 0, y: 2, w: 2, h: 2 },
      { i: "webAgent", x: 0, y: 4, w: 1, h: 2 },
      { i: "paper", x: 1, y: 4, w: 1, h: 2 },
      { i: "actions", x: 0, y: 6, w: 2, h: 2 },
      { i: "themeSwitch", x: 0, y: 8, w: 2, h: 1 },
    ],
    xs: [
      { i: "chatBot", x: 0, y: 0, w: 2, h: 2 },
      { i: "animatedEmoji", x: 0, y: 2, w: 2, h: 2 },
      { i: "webAgent", x: 0, y: 4, w: 1, h: 2 },
      { i: "paper", x: 1, y: 4, w: 1, h: 2 },
      { i: "actions", x: 0, y: 6, w: 2, h: 2 },
      { i: "themeSwitch", x: 0, y: 8, w: 2, h: 1 },
    ],
    xxs: [
      { i: "chatBot", x: 0, y: 0, w: 2, h: 2 },
      { i: "animatedEmoji", x: 0, y: 2, w: 2, h: 2 },
      { i: "webAgent", x: 0, y: 4, w: 1, h: 2 },
      { i: "paper", x: 1, y: 4, w: 1, h: 2 },
      { i: "actions", x: 0, y: 6, w: 2, h: 2 },
      { i: "themeSwitch", x: 0, y: 8, w: 2, h: 1 },
    ],
  },
};

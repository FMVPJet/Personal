export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Jet Kwok",
  description:
    "Jet Kwok — Computer Vision Engineer and MLOps engineer based in Zhengzhou, China.",
  url: "https://fmvp-jet-github-io.vercel.app",
  keywords: [
    "Jet Kwok",
    "Jiangtao Guo",
    "Computer Vision",
    "MLOps",
    "Deep Learning",
    "Portfolio",
    "Blog",
  ],
  author: "Jet Kwok",
  role: "Computer Vision Engineer · MLOps",
  location: "Zhengzhou, China",
  affiliation: "iFLYTEK",
  links: {
    github: "https://github.com/FMVPJet",
    linkedin: "https://www.linkedin.com/in/guojiangtao/",
    instagram: "https://www.instagram.com/jetkwok_/",
    scholar: "https://scholar.google.com/citations?user=87stumIAAAAJ&hl=en",
    email: "mailto:JetKwok827@gmail.com",
  },
};

export const pageConfig = {
  home: {
    kicker: "04 DEVICES",
    title: "Everyday devices",
    interactionHint: "Hover a card and drag to explore the models.",
  },
  about: {
    titlePrefix: "Hi, I’m",
    subtitle: "Computer Vision Engineer · MLOps",
  },
  blog: {
    title: "Blog",
    subtitle: "Thinking & Writing",
  },
} as const;

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  dateTime: string;
  excerpt: string;
  paragraphs: string[];
  sections: Array<{
    title: string;
    paragraphs?: string[];
    items?: string[];
  }>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "env-cmd-next",
    title: "Run Node with a specific env file",
    date: "April 12, 2014",
    dateTime: "2014-04-12",
    excerpt:
      "A small, repeatable way to run Next.js scripts against separate development, test, and production environment files.",
    paragraphs: [
      "As an application grows, using one environment file for every workflow makes local testing and deployment harder to reason about. I prefer keeping the environment-specific values separate and selecting the file at the command line.",
      "env-cmd provides that small layer of glue: it loads a named .env file before starting a Node process, so the application code can read the same environment variables in each environment.",
    ],
    sections: [
      {
        title: "The setup",
        paragraphs: [
          "Keep files such as .env.test, .env.development, and .env.prod at the project root. Install env-cmd as a development dependency, then make the environment choice explicit in package scripts.",
        ],
        items: [
          "test-deploy: env-cmd -f .env.test npm run build && npm run start",
          "dev-start: env-cmd -f .env.development npm run dev",
          "dev-deploy: env-cmd -f .env.development npm run build && npm run start",
        ],
      },
      {
        title: "Why this is useful",
        paragraphs: [
          "The command tells the next person on the project exactly which configuration a workflow expects. It also avoids changing source code or manually exporting a long list of variables before every run.",
          "Keep secrets out of version control, document the required variable names in an example file, and let the deployment platform provide production values where possible.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

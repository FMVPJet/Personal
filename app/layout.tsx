import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontUbuntu, fontOleoScript } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          fontUbuntu.className,
          "tracking-wide",
          fontOleoScript.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class" }}>
          <div className="relative flex flex-col bg-[#f6f2f2] dark:bg-[#0b0f11] overflow-y-auto scrollbar-hide min-h-screen">
            <main className="container mx-auto max-w-7xl pt-10 pb-[25px] md:pt-16 flex flex-col">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

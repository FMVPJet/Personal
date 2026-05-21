import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Jet Kwok - CV Engineer",
  description: "Computer Vision Engineer · MLOps - Interactive 3D Profile",
  openGraph: {
    title: "Jet Kwok - CV Engineer",
    description: "Computer Vision Engineer · MLOps · Zhengzhou, China",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Jet Kwok - CV Engineer",
    description: "Computer Vision Engineer · MLOps · Zhengzhou, China",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const savedTheme = localStorage.getItem("theme-mode");
                  const theme =
                    savedTheme === "light" || savedTheme === "dark"
                      ? savedTheme
                      : window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? "dark"
                        : "light";
                  document.documentElement.setAttribute("data-theme", theme);
                } catch {
                  document.documentElement.setAttribute("data-theme", "dark");
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

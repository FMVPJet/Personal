import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import GalleryShell from "@/components/gallery-shell";
import ProjectGallery from "@/components/project-gallery";
import { getProjectPage, getProjectSlugs } from "@/lib/project-pages.mjs";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const project = getProjectPage((await params).slug);
    return {
      title: project.title.replace(/\n/g, " "),
      description: project.intro,
    };
  } catch {
    return { title: "Project" };
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let project;
  try {
    project = getProjectPage(slug);
  } catch {
    notFound();
  }

  const carousel = project.carousel?.type === "fade"
    ? { type: "fade" as const, slides: project.carousel.slides }
    : undefined;

  return (
    <GalleryShell>
      <main className="g-subpage g-project-page">
        <section className="g-project-hero" id="hero">
          <div className="g-project-hero-styles parallax-onscroll opacity-onscroll" id="hero-styles">
            <div id="hero-caption">
              <div className="inner">
                <h1 className="hero-title">{project.title}</h1>
                <h2 className="hero-subtitle">{project.category}</h2>
              </div>
            </div>
          </div>
        </section>

        <div id="hero-bg-wrapper">
          <div id="hero-image-parallax">
            <div
              aria-label={`${project.title.replace(/\n/g, " ")} hero image`}
              id="hero-bg-image"
              role="img"
              style={{ backgroundImage: `url(${project.heroImage})` }}
            />
          </div>
        </div>

        <section className="g-project-intro g-project-row has-animation" data-delay="10">
          <div className="g-project-intro-label">{project.category}</div>
          <div>
            <h3>{project.intro}</h3>
            <p>
              Explore the process images below — click any image to open the full-resolution lightbox.
            </p>
          </div>
        </section>

        <ProjectGallery
          carousel={carousel}
          galleryId={`${project.slug}-gallery`}
          slides={project.gallery}
        />

        <nav aria-label="Project navigation" className="g-project-nav" id="project-nav">
          <Link className="g-project-next hide-ball link" href={`/projects/${project.next.slug}`}>
            <span className="g-project-next-label">Next</span>
            <strong>{project.next.title}</strong>
          </Link>
        </nav>

        <p className="g-project-back">
          <Link className="g-link link" href="/">
            ← Back to devices
          </Link>
        </p>
      </main>
    </GalleryShell>
  );
}

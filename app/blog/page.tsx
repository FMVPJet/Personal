import Link from "next/link";
import type { Metadata } from "next";

import GalleryShell from "@/components/gallery-shell";
import { blogPosts } from "@/config/blog";
import { pageConfig, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Notes from ${siteConfig.name} — computer vision, MLOps, and engineering.`,
};

export default function BlogPage() {
  return (
    <GalleryShell>
      <main className="g-subpage g-blog-page">
        <section className="g-hero-copy g-page-heading">
          <p className="g-page-heading-kicker">{siteConfig.name} / BLOG</p>
          <h1 className="hero-title g-page-heading-title">{pageConfig.blog.title}</h1>
          <p className="g-page-heading-subtitle">{pageConfig.blog.subtitle}</p>
        </section>

        <section className="g-blog-list" aria-label="Blog posts">
          {blogPosts.map((post) => (
            <article className="g-blog-card" key={post.slug}>
              <hr />
              <time dateTime={post.dateTime}>{post.date}</time>
              <h2>
                <Link className="g-link" href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p>{post.excerpt}</p>
              <Link className="g-link" href={`/blog/${post.slug}`}>
                Read more →
              </Link>
            </article>
          ))}
          <hr />
        </section>
      </main>
    </GalleryShell>
  );
}

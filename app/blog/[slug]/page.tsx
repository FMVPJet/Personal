import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import GalleryShell from "@/components/gallery-shell";
import { blogPosts, getBlogPost } from "@/config/blog";

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  return post
    ? { title: post.title, description: post.excerpt }
    : { title: "Blog post" };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();

  return (
    <GalleryShell>
      <main className="g-subpage g-blog-post-page">
        <section className="g-hero-copy g-page-heading">
          <p className="g-page-heading-kicker">{post.date} / BLOG</p>
          <h1 className="hero-title g-page-heading-title">{post.title}</h1>
        </section>

        <article className="g-blog-post">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {post.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <hr />
          <Link className="g-link" href="/blog">
            ← All posts
          </Link>
        </article>
      </main>
    </GalleryShell>
  );
}

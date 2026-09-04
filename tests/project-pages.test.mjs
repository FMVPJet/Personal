import test from "node:test";
import assert from "node:assert/strict";

import {
  getProjectPage,
  getProjectSlugs,
} from "../lib/project-pages.mjs";

test("Edu Chair exposes the source fade carousel and lightbox slides", () => {
  const project = getProjectPage("edu-chair");

  assert.equal(project.carousel?.type, "fade");
  assert.equal(project.carousel?.slides.length, 3);
  assert.ok(project.gallery.length >= 7);
  assert.ok(project.gallery.every((slide) => slide.width > 0 && slide.height > 0));
});

test("every source project has a gallery and next-project relationship", () => {
  const slugs = getProjectSlugs();

  assert.equal(slugs.length, 8);
  for (const slug of slugs) {
    const project = getProjectPage(slug);
    assert.ok(project.gallery.length >= 6, slug);
    assert.ok(project.next.slug, slug);
    assert.notEqual(project.next.slug, slug, slug);
  }
});

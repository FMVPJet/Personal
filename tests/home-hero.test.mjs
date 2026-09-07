import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const aboutSource = readFileSync("components/about-section.tsx", "utf8");
const pageSource = readFileSync("app/page.tsx", "utf8");
const siteSource = readFileSync("config/site.ts", "utf8");
const stylesSource = readFileSync("styles/gallery.css", "utf8");

test("homepage profile hero follows the main branch content order", () => {
  assert.match(aboutSource, /Hi,?\s+I(?:&apos;|')m/);
  assert.match(aboutSource, /<h1[^>]*>.*siteConfig\.name/s);
  assert.match(aboutSource, /siteConfig\.role/);
  assert.match(aboutSource, /siteConfig\.heroSummary/);
  assert.match(aboutSource, /siteConfig\.links\.resume/);
  assert.ok(
    aboutSource.indexOf("g-about-bio-copy") < aboutSource.indexOf("g-about-photo"),
    "profile copy should appear before the avatar on desktop",
  );
  assert.match(siteSource, /heroSummary:/);
});

test("profile avatar has no card easter egg interaction", () => {
  assert.doesNotMatch(aboutSource, /g-about-photo[\s\S]*onClick|open-card|BadgeCanvas|cardOpen/);
  assert.doesNotMatch(pageSource, /BadgeCanvas|cardOpen|open-card/);
});

test("profile greeting emoji has a restrained motion and reduced-motion fallback", () => {
  assert.match(aboutSource, /className="g-about-name-emoji"/);
  assert.match(stylesSource, /\.g-about-name-emoji[\s\S]*animation:\s*g-name-wave/);
  assert.match(stylesSource, /@keyframes g-name-wave/);
  assert.match(
    stylesSource,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.g-about-name-emoji[\s\S]*animation:\s*none/,
  );
});

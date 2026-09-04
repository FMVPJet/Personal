import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const aboutSource = readFileSync("components/about-section.tsx", "utf8");
const pageSource = readFileSync("app/page.tsx", "utf8");
const siteSource = readFileSync("config/site.ts", "utf8");

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

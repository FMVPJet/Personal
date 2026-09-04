import test from "node:test";
import assert from "node:assert/strict";

import { filterPhotos, getFilterOptions } from "../lib/gallery-model.mjs";

const fixture = [
  { id: "ft", category: "product-design" },
  { id: "ch", category: "industrial-design" },
  { id: "fx", category: "product-design" },
  { id: "lt", category: "industrial-design" },
  { id: "transporter", category: "product-design" },
  { id: "hermes", category: "concept-design" },
  { id: "chair", category: "product-design" },
  { id: "atem", category: "concept-design" },
];

test("filter options expose source categories and live counts", () => {
  assert.deepEqual(getFilterOptions(fixture), [
    { slug: "all", label: "All", count: 8 },
    { slug: "product-design", label: "Product Design", count: 4 },
    { slug: "industrial-design", label: "Industrial Design", count: 2 },
    { slug: "concept-design", label: "Concept Design", count: 2 },
  ]);
});

test("filtering keeps the source portfolio order", () => {
  assert.deepEqual(
    filterPhotos(fixture, "product-design").map((item) => item.id),
    ["ft", "fx", "transporter", "chair"],
  );
  assert.deepEqual(filterPhotos(fixture, "all"), fixture);
});

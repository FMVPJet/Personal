export const GALLERY_CATEGORIES = [
  { slug: "all", label: "All" },
  { slug: "product-design", label: "Product Design" },
  { slug: "industrial-design", label: "Industrial Design" },
  { slug: "concept-design", label: "Concept Design" },
];

export function filterPhotos(items, filter) {
  if (filter === "all") return items;
  return items.filter((item) => item.category === filter);
}

export function getFilterOptions(items) {
  return GALLERY_CATEGORIES.map((category) => ({
    ...category,
    count:
      category.slug === "all"
        ? items.length
        : items.filter((item) => item.category === category.slug).length,
  }));
}

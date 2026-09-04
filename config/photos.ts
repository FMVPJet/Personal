export interface PhotoItem {
  id: string;
  slug: string;
  imageUrl: string;
  /** Supports "\n" for line breaks (rendered via white-space: pre-line) */
  title: string;
  hoverText: string;
  category: "product-design" | "industrial-design" | "concept-design";
  /** Half-height, vertically centred variant from the source portfolio. */
  wide?: boolean;
}

export const photos: PhotoItem[] = [
  {
    id: "ft-series",
    slug: "ft-series",
    imageUrl: "/assets/photos/boyang/ft-series.webp",
    title: "DeepCool\nFT Series",
    hoverText: "Product Design",
    category: "product-design",
    wide: true,
  },
  {
    id: "ch370",
    slug: "ch370",
    imageUrl: "/assets/photos/boyang/ch370.webp",
    title: "DeepCool\nCH370",
    hoverText: "Industrial Design",
    category: "industrial-design",
  },
  {
    id: "fx-alpha",
    slug: "fx-alpha",
    imageUrl: "/assets/photos/boyang/fx-alpha.webp",
    title: "DeepCool\nFX Alpha",
    hoverText: "Product Design",
    category: "product-design",
  },
  {
    id: "lt720",
    slug: "lt720",
    imageUrl: "/assets/photos/boyang/lt720.webp",
    title: "DeepCool\nLT720",
    hoverText: "Industrial Design",
    category: "industrial-design",
    wide: true,
  },
  {
    id: "transporter",
    slug: "transporter",
    imageUrl: "/assets/photos/boyang/transporter.webp",
    title: "The Transporter",
    hoverText: "Product Design",
    category: "product-design",
    wide: true,
  },
  {
    id: "hermes",
    slug: "hermes",
    imageUrl: "/assets/photos/boyang/hermes.webp",
    title: "HERMES",
    hoverText: "Concept Design",
    category: "concept-design",
  },
  {
    id: "edu-chair",
    slug: "edu-chair",
    imageUrl: "/assets/photos/boyang/edu-chair.webp",
    title: "BCU Edu Chair",
    hoverText: "Product Design",
    category: "product-design",
  },
  {
    id: "atem",
    slug: "atem",
    imageUrl: "/assets/photos/boyang/atem.webp",
    title: "ATEM Modular Kit",
    hoverText: "Concept Design",
    category: "concept-design",
    wide: true,
  },
];

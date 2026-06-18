export interface Skill {
  name: string;
  level: number; // 0 - 100
}

// Adjust these to your real proficiency — placeholders for now.
export const skills: Skill[] = [
  { name: "Deep Learning", level: 92 },
  { name: "Computer Vision", level: 90 },
  { name: "Python", level: 95 },
  { name: "MLOps", level: 85 },
];

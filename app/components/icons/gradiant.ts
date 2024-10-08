export const gradiant = {
  orange: { start: "#FFB800", end: "#FF7F0A" },
  blue: { start: "#4A9FFF", end: "#2A67F7" },
  green: { start: "#00D68F", end: "#00B887" },
  purple: { start: "#A855F7", end: "#9333EA" },
  pink: { start: "#FF5C93", end: "#FF1E68" },
  red: { start: "#FF5C5C", end: "#FF1E1E" },
  yellow: { start: "#FFD500", end: "#FFB800" },
  teal: { start: "#00D68F", end: "#00B887" },
  cyan: { start: "#4A9FFF", end: "#2A67F7" },
  indigo: { start: "#A855F7", end: "#9333EA" },
  gray: { start: "#CBD5E0", end: "#9CA3AF" },
  white: { start: "#FFFFFF", end: "#F9FAFB" },
  black: { start: "#1F2937", end: "#111827" },
};

export type Gradiant = keyof typeof gradiant;

export type IconProps = {
  className?: string;
  color?: Gradiant;
};

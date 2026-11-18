import type { ReactNode } from "react";

export type Article = {
  category: string;
  title: string;
  time: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  content: ReactNode;
};

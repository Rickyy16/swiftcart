import type { Category } from "./category";

export interface Product {
  id: number;
  title: string;
  description: string;
  slug: string;
  price: number;
  images: string[];
  category: Category;
}
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, locale: string = "en"): string {
  if (locale === "km") {
    // In Cambodia USD is standard for Internet packages, or show $ symbol
    return `$${amount}`;
  }
  return `$${amount}`;
}


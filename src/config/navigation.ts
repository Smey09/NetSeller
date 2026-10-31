export interface NavItem {
  key: string;
  href: string;
}

export const navigationItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "packages", href: "/packages" },
  { key: "promotions", href: "/#promotions" },
  { key: "whyMe", href: "/#why-choose-me" },
  { key: "howItWorks", href: "/#how-it-works" },
  { key: "about", href: "/#about" },
  { key: "contact", href: "/contact" },
];


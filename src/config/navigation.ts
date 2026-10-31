export interface NavItem {
  key: string;
  href: string;
}

export const navigationItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "packages", href: "/#packages" },
  { key: "promotions", href: "/#promotions" },
  { key: "contact", href: "/#contact" },
];


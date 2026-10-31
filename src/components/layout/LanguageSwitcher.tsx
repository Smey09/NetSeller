"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const currentLocale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full bg-slate-100 p-0.5 sm:p-1 border border-slate-200 text-xs font-semibold select-none",
        className
      )}
      role="group"
      aria-label="Language Switcher"
    >
      <Link
        href={pathname}
        locale="en"
        className={cn(
          "flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full transition-all text-[11px] sm:text-xs font-medium",
          currentLocale === "en"
            ? "bg-white text-primary-700 shadow-xs font-bold"
            : "text-slate-600 hover:text-slate-900"
        )}
        aria-pressed={currentLocale === "en"}
      >
        <span className="text-xs">🇬🇧</span>
        <span>EN</span>
      </Link>

      <Link
        href={pathname}
        locale="km"
        className={cn(
          "flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full transition-all text-[11px] sm:text-xs font-medium font-khmer",
          currentLocale === "km"
            ? "bg-white text-primary-700 shadow-xs font-bold"
            : "text-slate-600 hover:text-slate-900"
        )}
        aria-pressed={currentLocale === "km"}
      >
        <span className="text-xs">🇰🇭</span>
        <span>ខ្មែរ</span>
      </Link>
    </div>
  );
}

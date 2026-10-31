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
        "inline-flex items-center rounded-full bg-white/65 backdrop-blur-xl p-0.5 sm:p-1 border border-white/85 text-xs font-semibold select-none shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_2px_8px_rgba(15,23,42,0.03)]",
        className
      )}
      role="group"
      aria-label="Language Switcher"
    >
      <Link
        href={pathname}
        locale="en"
        scroll={false}
        className={cn(
          "flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full transition-all duration-200 text-[11px] sm:text-xs select-none active:scale-95",
          currentLocale === "en"
            ? "bg-slate-900 text-white shadow-xs font-bold"
            : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium"
        )}
        aria-pressed={currentLocale === "en"}
      >
        <span className="text-xs">🇬🇧</span>
        <span>EN</span>
      </Link>

      <Link
        href={pathname}
        locale="km"
        scroll={false}
        className={cn(
          "flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full transition-all duration-200 text-[11px] sm:text-xs font-khmer select-none active:scale-95",
          currentLocale === "km"
            ? "bg-slate-900 text-white shadow-xs font-bold"
            : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium"
        )}
        aria-pressed={currentLocale === "km"}
      >
        <span className="text-xs">🇰🇭</span>
        <span>ខ្មែរ</span>
      </Link>
    </div>
  );
}

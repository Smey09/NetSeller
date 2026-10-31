import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "accent";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-primary-50 text-primary-700 border-primary-200",
    secondary: "bg-sky-50 text-sky-700 border-sky-200",
    outline: "text-slate-700 border-slate-200 bg-white",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accent: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };


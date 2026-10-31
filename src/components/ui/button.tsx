import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "telegram";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const variantStyles = {
      default: "bg-primary-600 text-white hover:bg-primary-700 shadow-sm shadow-primary-600/20 active:scale-[0.98]",
      destructive: "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]",
      outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 active:scale-[0.98]",
      secondary: "bg-secondary-500 text-white hover:bg-secondary-600 shadow-sm active:scale-[0.98]",
      ghost: "hover:bg-slate-100 text-slate-700",
      link: "text-primary-600 underline-offset-4 hover:underline",
      telegram: "bg-[#229ED9] text-white hover:bg-[#1E88C7] shadow-sm shadow-[#229ED9]/30 active:scale-[0.98]",
    };

    const sizeStyles = {
      default: "h-11 px-5 py-2.5 text-sm",
      sm: "h-9 rounded-md px-3 text-xs",
      lg: "h-12 rounded-xl px-7 text-base font-medium",
      icon: "h-10 w-10",
    };

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };


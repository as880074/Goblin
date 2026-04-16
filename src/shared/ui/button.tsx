import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primaryForeground shadow-sm transition hover:opacity-90",
        className,
      )}
    />
  );
}

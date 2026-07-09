import * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        `
        h-10 w-full min-w-0
        rounded-xl
        border border-border
        bg-input
        px-4 py-2
        text-sm text-foreground
        placeholder:text-muted-foreground

        shadow-sm
        transition-all duration-200

        hover:border-primary/50
        focus:border-ring
        focus:ring-4 focus:ring-ring/20
        focus:outline-none

        disabled:cursor-not-allowed
        disabled:bg-muted
        disabled:text-muted-foreground
        `,
        className
      )}
      {...props}
    />
  );
}

export { Input };
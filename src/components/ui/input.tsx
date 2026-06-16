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
        border border-slate-200
        bg-white
        px-4 py-2
        text-sm text-slate-900
        placeholder:text-slate-400

        shadow-sm
        transition-all duration-200

        hover:border-blue-300
        focus:border-blue-500
        focus:ring-4 focus:ring-blue-100
        focus:outline-none

        disabled:cursor-not-allowed
        disabled:bg-slate-50
        disabled:text-slate-400
        `,
        className
      )}
      {...props}
    />
  );
}

export { Input };
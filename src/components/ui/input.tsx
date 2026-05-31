import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-5 w-full min-w-0 m-0 rounded-lg px-2 border border-primary",
        className
      )}
      {...props}
    />
  )
}

export { Input }

"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectContextValue = {
    value: string;
    onValueChange: (val: string) => void;
};

const SelectContext = React.createContext<SelectContextValue | null>(null);

const Select = ({
    value,
    onValueChange,
    children,
}: {
    value: string;
    onValueChange: (val: string) => void;
    children: React.ReactNode;
}) => {
    const ctx = React.useMemo(() => ({ value, onValueChange }), [value, onValueChange]);
    return (
        <SelectContext.Provider value={ctx}>
            <div className="relative w-full">{children}</div>
        </SelectContext.Provider>
    );
};

const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, children, ...props }, ref) => (
        <button
            type="button"
            ref={ref}
            className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            onClick={(e) => {
                const content = e.currentTarget.parentElement?.querySelector(".select-content");
                content?.classList.toggle("hidden");
            }}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
    )
);
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({ placeholder, className, ...rest }: { placeholder?: string; className?: string } & React.HTMLAttributes<HTMLSpanElement>) => {
    const ctx = React.useContext(SelectContext);
    const v = ctx?.value ?? "";
    const usePlaceholder = placeholder && (v === "" || v === "all");
    return (
        <span className={className} {...rest}>
            {usePlaceholder ? placeholder : v || placeholder}
        </span>
    );
};

const SelectContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "select-content hidden absolute top-full left-0 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 mt-1",
            className
        )}
        {...props}
    >
        <div className="p-1">{children}</div>
    </div>
);

const SelectItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, children, value, onClick, ...props }, ref) => {
    const ctx = React.useContext(SelectContext);
    const isSelected = ctx?.value === value;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        ctx?.onValueChange(value);
        e.currentTarget.closest(".select-content")?.classList.add("hidden");
    };

    return (
        <div
            ref={ref}
            role="option"
            aria-selected={isSelected}
            className={cn(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                className
            )}
            onClick={handleClick}
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {isSelected && <Check className="h-4 w-4" />}
            </span>
            {children}
        </div>
    );
});
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };

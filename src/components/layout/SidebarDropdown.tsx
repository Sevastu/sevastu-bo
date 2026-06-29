import React from 'react';
import NextLink from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItem } from '@/utils/navigation';

interface SidebarDropdownProps {
    item: NavItem;
    isOpen: boolean;
    isChildActive: boolean;
    isCollapsed: boolean;
    onToggle: (e: React.MouseEvent) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    pathname: string | null;
}

export function SidebarDropdown({
    item,
    isOpen,
    isChildActive,
    isCollapsed,
    onToggle,
    onMouseEnter,
    onMouseLeave,
    pathname
}: SidebarDropdownProps) {
    const Icon = item.icon;

    return (
        <div
            className="relative"
            data-dropdown
            onClick={onToggle}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div
                className={cn(
                    "flex font-medium items-center w-full py-2.5 rounded-sm transition-all group relative cursor-pointer",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    isCollapsed ? "justify-center px-0" : "px-3",
                    isChildActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                )}
                title={isCollapsed ? item.name : undefined}
            >
                <Icon className="w-5 h-5 shrink-0" />

                {!isCollapsed && (
                    <>
                        <span className="ml-3 flex-1 text-left whitespace-nowrap">
                            {item.name}
                        </span>

                        <button
                            type="button"
                            onClick={onToggle}
                            className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5"
                            aria-label={`Toggle ${item.name} menu`}
                            aria-expanded={isOpen}
                        >
                            <ChevronRight
                                className={cn(
                                    "w-4 h-4 transition-transform duration-300",
                                    isOpen && "rotate-90"
                                )}
                            />
                        </button>
                    </>
                )}
            </div>

            {/* Floating Dropdown (Desktop) or Inline (if not collapsed) */}
            {isOpen && (
                <div
                    className={cn(
                        "space-y-1 overflow-hidden animate-in fade-in origin-left transition-all duration-200",
                        isCollapsed
                            ? "absolute left-full top-0 ml-2 w-48 bg-card border-1 border-primary/50 rounded-md shadow-xl p-2 z-40"
                            : "ml-12 mt-2"
                    )}
                >
                    {item.children?.map((child) => {
                        const ChildIcon = child.icon;
                        const childActive = child.href && pathname?.startsWith(child.href);
                        return (
                            <NextLink
                                key={child.href}
                                href={child.href || ""}
                                onClick={(e) => e.stopPropagation()}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-all",
                                    childActive
                                        ? "bg-primary/10 text-primary shadow-sm font-semibold"
                                        : "text-muted-foreground hover:bg-primary/10 hover:text-foreground hover:shadow-sm"
                                )}
                            >
                                <ChildIcon className="w-4 h-4 shrink-0" />
                                <span className="whitespace-nowrap">{child.name}</span>
                            </NextLink>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

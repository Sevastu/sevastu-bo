import React from 'react';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';
import { NavItem } from '@/utils/navigation';

interface SidebarNavItemProps {
    item: NavItem;
    isActive: boolean;
    isCollapsed: boolean;
}

export function SidebarNavItem({ item, isActive, isCollapsed }: SidebarNavItemProps) {
    const Icon = item.icon;

    return (
        <NextLink
            href={item.href || ''}
            className={cn(
                "flex items-center px-3 py-2.5 rounded-sm font-medium transition-all group relative",
                "hover:scale-[1.02] active:scale-[0.98]",
                isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 rounded-sm"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                isCollapsed && "justify-center px-0"
            )}
            title={isCollapsed ? item.name : undefined}
        >
            <Icon
                className={cn(
                    "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                    isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                )}
            />
            
            {!isCollapsed && (
                <span className="ml-3 flex-1 whitespace-nowrap animate-in fade-in duration-300">
                    {item.name}
                </span>
            )}
            
            {isActive && !isCollapsed && (
                <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" />
            )}
        </NextLink>
    );
}

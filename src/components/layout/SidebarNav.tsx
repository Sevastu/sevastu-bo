import React, { memo } from 'react';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/utils/navigation';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarDropdown } from './SidebarDropdown';

interface SidebarNavProps {
    items: NavItem[];
    isCollapsed: boolean;
    openDropdown: string | null;
    onToggleDropdown: (name: string, e: React.MouseEvent) => void;
    onMouseEnterDropdown: (name: string) => void;
    onMouseLeaveDropdown: () => void;
}

export const SidebarNav = memo(function SidebarNav({
    items,
    isCollapsed,
    openDropdown,
    onToggleDropdown,
    onMouseEnterDropdown,
    onMouseLeaveDropdown
}: SidebarNavProps) {
    const pathname = usePathname();

    return (
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-muted/50">
            {items.map((item) => {
                if (item.isDropdown) {
                    const isChildActive = item.children?.some(child => child.href && pathname?.startsWith(child.href)) || false;
                    const isOpen = openDropdown === item.name;

                    return (
                        <SidebarDropdown
                            key={item.name}
                            item={item}
                            isOpen={isOpen}
                            isChildActive={isChildActive}
                            isCollapsed={isCollapsed}
                            pathname={pathname}
                            onToggle={(e) => onToggleDropdown(item.name, e)}
                            onMouseEnter={() => onMouseEnterDropdown(item.name)}
                            onMouseLeave={onMouseLeaveDropdown}
                        />
                    );
                }

                const isActive = (item.href && pathname?.startsWith(item.href)) || false;
                
                return (
                    <SidebarNavItem
                        key={item.href || item.name}
                        item={item}
                        isActive={isActive}
                        isCollapsed={isCollapsed}
                    />
                );
            })}
        </nav>
    );
});

import React from 'react';
import { cn } from '@/lib/utils';
import { User } from '@/lib/auth';
import { NavItem } from '@/utils/navigation';
import { LAYOUT } from '@/utils/layoutConstants';
import { SidebarLogo } from './SidebarLogo';
import { SidebarNav } from './SidebarNav';
// import { SidebarFooter } from './SidebarFooter';

interface AppSidebarProps {
    user: User | null;
    navItems: NavItem[];
    isSidebarOpen: boolean;
    desktopSidebarCollapsed: boolean;
    isMobile: boolean;
    openDropdown: string | null;
    onToggleSidebar: () => void;
    onToggleDesktopSidebar: () => void;
    onToggleDropdown: (name: string, e: React.MouseEvent) => void;
    onMouseEnterDropdown: (name: string) => void;
    onMouseLeaveDropdown: () => void;
    onLogout: () => void;
}

export function AppSidebar({
    user,
    navItems,
    isSidebarOpen,
    desktopSidebarCollapsed,
    isMobile,
    openDropdown,
    onToggleSidebar,
    onToggleDesktopSidebar,
    onToggleDropdown,
    onMouseEnterDropdown,
    onMouseLeaveDropdown,
    onLogout
}: AppSidebarProps) {
    // Filter nav items based on user role
    const visibleNavItems = user && user.role
        ? navItems.filter((item) => item.roles.includes(user.role))
        : navItems.filter((item) => item.roles.includes('admin'));

    const isCollapsed = desktopSidebarCollapsed && !isMobile;

    return (
        <>
            {/* Mobile Overlay */}
            {isSidebarOpen && isMobile && (
                <div
                    className={cn("fixed inset-0 bg-black/50 lg:hidden", LAYOUT.Z_INDEX.OVERLAY)}
                    onClick={onToggleSidebar}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Component */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-screen flex flex-col bg-card border-r-2 border-primary/50",
                    "transition-all", LAYOUT.ANIMATION_DURATION, LAYOUT.Z_INDEX.SIDEBAR,
                    isCollapsed ? LAYOUT.SIDEBAR_WIDTH_COLLAPSED : LAYOUT.SIDEBAR_WIDTH,
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                    "lg:translate-x-0"
                )}
            >
                <SidebarLogo 
                    isSidebarOpen={isSidebarOpen}
                    desktopSidebarCollapsed={desktopSidebarCollapsed}
                    isMobile={isMobile}
                    onCloseMobile={onToggleSidebar}
                    onToggleCollapse={onToggleDesktopSidebar}
                />

                <SidebarNav 
                    items={visibleNavItems}
                    isCollapsed={isCollapsed}
                    openDropdown={openDropdown}
                    onToggleDropdown={onToggleDropdown}
                    onMouseEnterDropdown={onMouseEnterDropdown}
                    onMouseLeaveDropdown={onMouseLeaveDropdown}
                />

                {/* <SidebarFooter 
                    user={user}
                    isCollapsed={isCollapsed}
                    isMobile={isMobile}
                    onLogout={onLogout}
                    onToggleCollapse={onToggleDesktopSidebar}
                /> */}
            </aside>
        </>
    );
}

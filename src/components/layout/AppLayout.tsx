"use client";

import React from 'react';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useSidebar } from '@/hooks/useSidebar';
import { useResponsive } from '@/hooks/useResponsive';
import { useDropdown } from '@/hooks/useDropdown';
import { NAV_ITEMS } from '@/utils/navigation';
import { LAYOUT } from '@/utils/layoutConstants';
import { LoadingScreen } from './LoadingScreen';
import { AuthFallback } from './AuthFallback';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    const { user, loading, authenticated, logout } = useAuthGuard();
    const { isMobile } = useResponsive();
    const { 
        isSidebarOpen, 
        toggleSidebar, 
        desktopSidebarCollapsed, 
        toggleDesktopSidebar 
    } = useSidebar();
    
    const {
        openDropdown,
        handleMouseEnter,
        handleMouseLeave,
        toggleDropdown
    } = useDropdown(isMobile);

    const pathname = usePathname();

    if (loading) {
        return <LoadingScreen />;
    }

    if (!authenticated || !user) {
        return <AuthFallback pathname={pathname} />;
    }

    const isCollapsed = desktopSidebarCollapsed && !isMobile;

    return (
        <div className="min-h-screen bg-background flex overflow-hidden relative">
            <AppSidebar 
                user={user}
                navItems={NAV_ITEMS}
                isSidebarOpen={isSidebarOpen}
                desktopSidebarCollapsed={desktopSidebarCollapsed}
                isMobile={isMobile}
                openDropdown={openDropdown}
                onToggleSidebar={toggleSidebar}
                onToggleDesktopSidebar={toggleDesktopSidebar}
                onToggleDropdown={toggleDropdown}
                onMouseEnterDropdown={handleMouseEnter}
                onMouseLeaveDropdown={handleMouseLeave}
                onLogout={logout}
            />

            <main 
                className={cn(
                    "flex-1 flex flex-col min-w-0 h-screen overflow-hidden transition-all",
                    LAYOUT.ANIMATION_DURATION,
                    isCollapsed ? "lg:ml-20" : "lg:ml-64"
                )}
            >
                <AppHeader 
                    user={user}
                    onToggleSidebar={toggleSidebar}
                    onLogout={logout}
                />

                <div className="flex-1 p-0 overflow-y-auto bg-gradient-to-br from-background via-background to-muted/10 dark:from-background dark:via-background dark:to-muted/5 scrollbar-thin scrollbar-thumb-muted/50 dark:scrollbar-thumb-muted/30">
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 px-4 md:px-8 py-6">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}


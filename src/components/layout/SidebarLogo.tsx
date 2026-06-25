import React from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LAYOUT } from '@/utils/layoutConstants';

interface SidebarLogoProps {
    isSidebarOpen: boolean;
    desktopSidebarCollapsed: boolean;
    isMobile: boolean;
    onCloseMobile: () => void;
    onToggleCollapse?: () => void;
}

export function SidebarLogo({ desktopSidebarCollapsed, isMobile, onCloseMobile, onToggleCollapse }: SidebarLogoProps) {
    const isCollapsed = desktopSidebarCollapsed && !isMobile;
    const Icon = (!isMobile && isCollapsed) ? PanelLeftOpen : PanelLeftClose;

    return (
        <div className={cn(LAYOUT.HEADER_HEIGHT, "flex items-center transition-all duration-300", isCollapsed ? "justify-center" : "justify-between px-6")}>
            {!isCollapsed && (
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                        S
                    </div>

                    <div className="animate-in fade-in duration-300 whitespace-nowrap">
                        <h2 className="font-bold leading-none">Sevastu</h2>
                        <p className="text-xs text-muted-foreground">Back Office</p>
                    </div>
                </div>
            )}

            <button
                className={cn(
                    "rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer shrink-0 text-muted-foreground transition-colors",
                    (!isCollapsed || isMobile) && "border border-border/50"
                )}
                onClick={isMobile ? onCloseMobile : onToggleCollapse}
                aria-label={isMobile ? "Close Sidebar" : (isCollapsed ? "Expand Sidebar" : "Collapse Sidebar")}
                title={isMobile ? "Close Sidebar" : (isCollapsed ? "Expand Sidebar" : "Collapse Sidebar")}
            >
                <Icon className="w-5 h-5" />
            </button>
        </div>
    );
}

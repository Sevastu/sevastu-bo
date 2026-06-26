import React from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LAYOUT } from '@/utils/layoutConstants';
import logo from "@/assets/chat.png";

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
                    <div className="h-10 w-10 shrink-0 rounded-xl text-white flex items-center justify-center font-bold">
                        <img src={logo.src} alt="Sevastu" className="w-10 h-10" />
                    </div>

                    <div className="animate-in fade-in duration-300 whitespace-nowrap mt-2">
                        <h2 className="font-bold leading-none text-primary text-lg">Sevastu</h2>
                        <p className="text-xs text-muted-foreground">Back Office</p>
                    </div>
                </div>
            )}

            <button
                className={cn(
                    "rounded-lg p-2 hover:bg-primary/10 cursor-pointer shrink-0 text-primary transition-colors shadow-md",
                    (!isCollapsed || isMobile) && "border-1 border-primary"
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

import { useState, useEffect } from 'react';

export function useSidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);

    useEffect(() => {
        // Hydrate from localStorage for desktop collapse state
        const storedState = localStorage.getItem('sevastu_sidebar_collapsed');
        if (storedState === 'true') {
            setDesktopSidebarCollapsed(true);
        }
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const toggleDesktopSidebar = () => {
        setDesktopSidebarCollapsed(prev => {
            const newState = !prev;
            localStorage.setItem('sevastu_sidebar_collapsed', String(newState));
            return newState;
        });
    };

    return {
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        desktopSidebarCollapsed,
        toggleDesktopSidebar,
    };
}

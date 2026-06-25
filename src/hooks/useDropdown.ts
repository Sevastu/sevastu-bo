import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useDropdown(isMobile: boolean) {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [manuallyClosed, setManuallyClosed] = useState<string | null>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Auto open active dropdown
    useEffect(() => {
        if (
            pathname?.startsWith("/catalog") ||
            pathname?.startsWith("/categories") ||
            pathname?.startsWith("/services") ||
            pathname?.startsWith("/sub-services")
        ) {
            setOpenDropdown("Services");
            return;
        }

        if (
            pathname?.startsWith("/customers") ||
            pathname?.startsWith("/workers") ||
            pathname?.startsWith("/worker-verification")
        ) {
            setOpenDropdown("Users");
            return;
        }
    }, [pathname]);

    // Outside click and escape handling for layout dropdowns
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (!target.closest('[data-dropdown]')) {
                setOpenDropdown(null);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpenDropdown(null);
            }
        };

        if (openDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [openDropdown]);

    const handleMouseEnter = (name: string) => {
        if (isMobile) return;
        if (manuallyClosed === name) return;

        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }

        hoverTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(name);
        }, 200);
    };

    const handleMouseLeave = () => {
        if (isMobile) return;
        setManuallyClosed(null);

        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }

        hoverTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 300);
    };

    const toggleDropdown = (name: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (openDropdown === name) {
            setOpenDropdown(null);
            setManuallyClosed(name);
        } else {
            setOpenDropdown(name);
            setManuallyClosed(null);
        }
    };

    return {
        openDropdown,
        handleMouseEnter,
        handleMouseLeave,
        toggleDropdown,
        setOpenDropdown
    };
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUser, clearAuth, User } from "@/lib/auth";
import {
    LayoutDashboard,
    Users,
    Briefcase,
    FileText,
    Settings,
    LogOut,
    Menu,
    Loader2,
    UserCheck,
    Hammer,
    Layers,
    Trophy,
    // PieChartIcon,
    ActivityIcon,
    User2Icon,
    ChevronRight,
    // ChevronDown,
} from "lucide-react";
import NextLink from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";
// import { GraphHelpers } from "next/dist/compiled/webpack/webpack";
// import { LanguageSwitch } from "@/components/auth/LanguageSwitch";
import { DarkModeToggle } from "@/components/auth/DarkModeToggle";
import { Notification } from "@/components/ui/notification";

interface NavItem {
    name: string;
    href?: string;
    icon: any;
    roles: string[];
    isDropdown?: boolean;
    children?: NavItem[];
}

interface AppLayoutProps {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [manuallyClosed, setManuallyClosed] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);

        const checkAuth = () => {
            try {
                const currentUser = getUser();
                // In Next.js, we also want to check the token presence on the client
                const hasToken = typeof window !== 'undefined' && localStorage.getItem('sevastu_access_token');

                if (!currentUser || !hasToken) {
                    // Not authenticated, redirect to login unless already there
                    if (pathname !== '/login') {
                        clearAuth();
                        router.replace("/login");
                    }
                } else {
                    setUser(currentUser);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [pathname, router]);

    // Mobile detection
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Auto open active dropdown
    useEffect(() => {
        if (
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

    // Outside click detection
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (!target.closest('[data-dropdown]')) {
                setOpenDropdown(null);
            }
        };

        // Keyboard accessibility
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

    const handleLogout = () => {
        clearAuth();
        router.push("/login");
    };

    // Prevent hydration mismatch and show loading during active auth check
    if (!mounted || isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full animate-pulse" />
                    <Loader2 className="w-8 h-8 text-primary animate-spin absolute inset-0 m-auto" />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        Sevastu
                    </h2>
                    <p className="text-xs text-muted-foreground font-medium animate-pulse">
                        Authenticating access...
                    </p>
                </div>
            </div>
        );
    }

    // Show fallback UI when user is not available instead of returning null
    if (!user) {
        // Auto-redirect to login if not already there
        if (pathname !== '/login') {
            setTimeout(() => {
                router.replace('/login');
            }, 2000);
        }

        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full animate-pulse bg-muted" />
                    <Loader2 className="w-8 h-8 text-primary animate-spin absolute inset-0 m-auto" />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        Sevastu
                    </h2>
                    <p className="text-xs text-muted-foreground font-medium animate-pulse">
                        {pathname === '/login'
                            ? 'Please sign in to continue...'
                            : 'Session expired. Redirecting to login...'}
                    </p>
                    {pathname !== '/login' && (
                        <button
                            onClick={() => router.replace('/login')}
                            className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                        >
                            Go to Login
                        </button>
                    )}
                </div>
            </div>
        );
    }

    const navItems: NavItem[] = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["admin", "staff"] },
        { name: "Analytics", href: "/analytics", icon: ActivityIcon, roles: ["admin", "staff"] },
        {
            name: "Services",
            icon: Layers,
            roles: ["admin", "staff"],
            isDropdown: true,
            children: [
                { name: "Categories", href: "/categories", icon: User2Icon, roles: ["admin", "staff"] },
                { name: "Services", href: "/services", icon: Hammer, roles: ["admin", "staff"] },
                { name: "Sub-Services", href: "/sub-services", icon: Layers, roles: ["admin", "staff"] }
            ]
        },
        {
            name: "Users",
            icon: Users,
            roles: ["admin", "staff"],
            isDropdown: true,
            children: [
                { name: "Customers", href: "/customers", icon: UserCheck, roles: ["admin", "staff"] },
                { name: "Workers", href: "/workers", icon: Hammer, roles: ["admin", "staff"] },
                { name: "Worker-Verification", href: "/worker-verification", icon: UserCheck, roles: ["admin", "staff"] }
            ]
        },
        { name: "Jobs", href: "/jobs", icon: Briefcase, roles: ["admin", "staff"] },
        { name: "Performance", href: "/performance", icon: Trophy, roles: ["admin"] },
        { name: "Leads", href: "/leads", icon: FileText, roles: ["admin", "staff"] },
        { name: "Settings", href: "/settings", icon: Settings, roles: ["admin"] },
    ];

    // Ensure user and user.role exist before filtering nav items
    const visibleNavItems = user && user.role
        ? navItems.filter((item) => item.roles.includes(user.role))
        : navItems.filter((item) => item.roles.includes('admin')); // Default to admin items if no user

    const getPageTitle = () => {
        if (pathname?.startsWith("/workers/profile/")) {
            return "Worker Profile";
        }

        if (pathname?.startsWith("/worker-verification/")) {
            return "Worker Verification";
        }

        const title = pathname?.split("/")[1]?.replace(/-/g, " ");

        return title
            ? title.charAt(0).toUpperCase() + title.slice(1)
            : "Dashboard";
    };
    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <>
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
                <aside
                    className={cn(
                        "fixed top-0 left-0 z-50 h-screen overflow-y-auto",
                        "w-62 bg-card",
                        "transition-transform duration-300",
                        isSidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full",
                        "lg:translate-x-0"
                    )}
                >
                    <div className="h-16 flex items-center justify-between px-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                                S
                            </div>

                            <div>
                                <h2 className="font-bold leading-none">
                                    Sevastu
                                </h2>
                                <p className="text-xs text-muted-foreground">
                                    Back Office
                                </p>
                            </div>
                        </div>

                        <button
                            className="lg:hidden"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="flex-1 py-6 px-3 space-y-2">
                        {visibleNavItems.map((item) => {
                            const Icon = item.icon;

                            if (item.isDropdown) {
                                const isDropdownActive = item.children?.some(child => child.href && pathname?.startsWith(child.href)) || false;
                                const isOpen = openDropdown === item.name;

                                return (
                                    <div key={item.name}
                                        className="relative"
                                        data-dropdown
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            if (isOpen) {
                                                setOpenDropdown(null);
                                                setManuallyClosed(item.name);
                                            } else {
                                                setOpenDropdown(item.name);
                                                setManuallyClosed(null);
                                            }
                                        }}
                                        onMouseEnter={() => {
                                            if (isMobile) return;

                                            if (manuallyClosed === item.name) return;

                                            if (hoverTimeoutRef.current) {
                                                clearTimeout(hoverTimeoutRef.current);
                                            }

                                            hoverTimeoutRef.current = setTimeout(() => {
                                                setOpenDropdown(item.name);
                                            }, 200);
                                        }}
                                        onMouseLeave={() => {
                                            if (isMobile) return;

                                            setManuallyClosed(null);
                                            
                                            if (hoverTimeoutRef.current) {
                                                clearTimeout(hoverTimeoutRef.current);
                                            }

                                            hoverTimeoutRef.current = setTimeout(() => {
                                                setOpenDropdown(null);
                                            }, 300);
                                        }}
                                    >
                                        <div className={cn("flex font-medium text-muted-foreground items-center w-full px-3 py-2.5 rounded-sm transition-all group relative",
                                        "hover:scale-[1.02] active:scale-[0.98]",
                                        isDropdownActive
                                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                                : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                            )}>
                                            <Icon className="w-5 h-5 shrink-0" />

                                            <span className="ml-3 flex-1 text-left">
                                                {item.name}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    if (isOpen) {
                                                        setOpenDropdown(null);
                                                    } else {
                                                        setOpenDropdown(item.name);
                                                    }
                                                }}
                                                className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5"
                                            >
                                                <ChevronRight
                                                    className={cn(
                                                        "w-4 h-4 transition-transform duration-300",
                                                        isOpen && "rotate-90"
                                                    )}
                                                />
                                            </button>
                                        </div>

                                        {/* Floating Dropdown (Desktop) */}
                                        {isOpen && (
                                            <div className="ml-8 mt-2 space-y-1">
                                                {item.children?.map((child) => {
                                                    const ChildIcon = child.icon;
                                                    const isChildActive =
                                                        child.href && pathname?.startsWith(child.href);
                                                    return (
                                                        <NextLink
                                                            key={child.href}
                                                            href={child.href || ""}
                                                            className={cn(
                                                                "flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-all",
                                                                isChildActive
                                                                    ? "bg-primary/10 text-primary"
                                                                    : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                                                            )}
                                                        >
                                                            <ChildIcon className="w-4 h-4" />
                                                            <span>{child.name}</span>
                                                        </NextLink>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            const isActive = item.href && pathname?.startsWith(item.href) || false;
                            return (
                                <NextLink
                                    key={item.href || item.name}
                                    href={item.href || ''}
                                    className={cn(
                                        "flex items-center px-3 py-2.5 rounded-sm font-medium transition-all group relative",
                                        "hover:scale-[1.01] active:scale-[0.70]",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-blue-500/30 rounded-sm"
                                            : "text-muted-foreground hover:bg-primary/10 hover:text-forground",
                                        // !isSidebarOpen && "justify-center"
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            "w-5 h-5 transition-transform group-hover:scale-110",
                                            isActive
                                                ? "text-primary-foreground"
                                                : "text-muted-foreground group-hover:text-forground"
                                        )}
                                    />
                                    <span className="ml-3 flex-1">
                                        {item.name}
                                    </span>
                                    {isActive && <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" />}
                                </NextLink>
                            );
                        })}
                    </nav>

                    <div className="p-4">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                                    text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0 lg:ml-62">
                    <header className="sticky top-0 z-40 h-16 bg-card px-4 lg:px-4 mx-4 rounded-[50px] mt-4 shadow-lg border border-primary">
                        <div className="flex h-full items-center justify-between gap-2">

                            {/* Left Side */}
                            <div className="flex items-center gap-3 min-w-0">
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="lg:hidden p-2 rounded-lg hover:bg-muted shrink-0"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>

                                <h1 className="text-lg lg:text-xl font-semibold truncate text-primary">
                                    {`${getPageTitle()}`}
                                </h1>
                            </div>

                            {/* Right Side */}
                            <div className="flex items-center gap-2 lg:gap-4 shrink-0">
                                {/* <LanguageSwitch /> */}
                                <Notification />
                                <DarkModeToggle />

                                <div className="flex items-center gap-2 border-l pl-2 lg:pl-4">
                                    <div className="hidden md:block text-right">
                                        <p className="font-medium text-sm">{user?.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {user?.role}
                                        </p>
                                    </div>

                                    <div className="h-9 w-9 lg:h-10 lg:w-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold shrink-0">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </header>

                    <div className="flex-1 p-0 overflow-y-auto bg-gradient-to-br from-background via-background to-muted/10 dark:from-background dark:via-background dark:to-muted/5 scrollbar-thin scrollbar-thumb-muted/50 dark:scrollbar-thumb-muted/30">
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 px-8 py-4">
                            {children}
                        </div>
                    </div>
                </main>
            </>
        </div>
    );
}


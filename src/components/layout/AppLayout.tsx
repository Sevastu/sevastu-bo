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
  PieChartIcon,
  ActivityIcon,
  User2Icon,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { GraphHelpers } from "next/dist/compiled/webpack/webpack";
import { LanguageSwitch } from "@/components/auth/LanguageSwitch";
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

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
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    return (
        <div className="min-h-screen bg-background text-foreground flex transition-colors duration-300">
            {/* Sidebar */}
            <aside className={cn(
                "fixed transition-all duration-300 flex flex-col h-screen top-0 left-0 bottom-0 z-50",
                "bg-card/95 backdrop-blur-sm border-r border-border/30",
                isSidebarOpen ? 'w-60' : 'w-20'
            )}> 
                <div className=" ">
                    <div className="bg-card flex items-center justify-between px-4 py-3.5">
                        <div className={cn(
                            "font-bold text-3xl tracking-tight text-primary transition-all",
                            isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                        )}>
                            Sevastu
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-all hover:text-primary active:scale-95"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-2">
                    {visibleNavItems.map((item) => {
                        const Icon = item.icon;
                        
                        if (item.isDropdown) {
                            const isDropdownActive = item.children?.some(child => child.href && pathname?.startsWith(child.href)) || false;
                            const isOpen = openDropdown === item.name;
                            
                            return (
                                <div key={item.name} className="relative" data-dropdown>
                                    <button
                                        onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                                        className={cn(
                                            "w-full flex items-center px-3 py-2.5 rounded-xl font-medium transition-all group relative",
                                            "hover:scale-[1.02] active:scale-[0.98]",
                                            isDropdownActive
                                                ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20"
                                                : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                                            !isSidebarOpen && "justify-center"
                                        )}
                                    >
                                        <Icon className={cn(
                                            "w-5 h-5 transition-all duration-200",
                                            isDropdownActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                                            "group-hover:scale-110"
                                        )} />
                                        {isSidebarOpen && (
                                            <>
                                                <span className="ml-3 flex-1">{item.name}</span>
                                                {isOpen ? (
                                                    <ChevronDown className="w-4 h-4 transition-transform duration-200 text-primary" />
                                                ) : (
                                                    <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                                                )}
                                                {isDropdownActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-1 h-6 bg-primary rounded-r-full" />}
                                            </>
                                        )}
                                        {!isSidebarOpen && isDropdownActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />}
                                    </button>
                                    
                                    {/* Floating Dropdown (Desktop) */}
                                    {!isMobile && isOpen && (
                                        <div className={cn(
                                            "absolute top-0 z-50 bg-card/95 backdrop-blur-xl rounded-xl border border-border/30 animate-in fade-in zoom-in-95 duration-200",
                                            "min-w-[200px] max-w-[250px] overflow-hidden",
                                            "dark:shadow-black/20 dark:border-border/50",
                                            isSidebarOpen ? "left-full ml-2" : "left-full ml-1"
                                        )}>
                                            {/* Arrow indicator */}
                                            <div className={cn(
                                                "absolute top-3 w-0 h-0 border-solid",
                                                isSidebarOpen ? "-left-2" : "-left-1",
                                                "border-t-8 border-b-8 border-r-8 border-transparent border-r-card/98"
                                            )} />
                                            
                                            {/* Dropdown Header */}
                                            <div className="px-4 py-3 border-b border-border/20 bg-muted/50 dark:bg-muted/30">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <Icon className="w-3.5 h-3.5 text-primary" />
                                                    </div>
                                                    <span className="text-sm font-semibold text-foreground">{item.name}</span>
                                                </div>
                                            </div>
                                            
                                            {/* Dropdown Items */}
                                            <div className="py-2">
                                                {item.children?.map((child) => {
                                                    const ChildIcon = child.icon;
                                                    const isChildActive = child.href && pathname?.startsWith(child.href) || false;
                                                    return (
                                                        <NextLink
                                                            key={child.href || child.name}
                                                            href={child.href || ''}
                                                            onClick={() => setOpenDropdown(null)}
                                                            className={cn(
                                                                "group flex items-center px-4 py-2.5 transition-all duration-200",
                                                                "hover:scale-[1.01] active:scale-[0.99]",
                                                                isChildActive
                                                                    ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-l-2 border-primary/50 dark:border-primary/60"
                                                                    : "text-muted-foreground hover:bg-muted/30 hover:text-foreground dark:hover:bg-muted/20"
                                                            )}
                                                        >
                                                            <ChildIcon className={cn(
                                                                "w-4 h-4 transition-all duration-200",
                                                                isChildActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                                                                "group-hover:scale-110"
                                                            )} />
                                                            <span className="ml-3 text-sm font-medium">{child.name}</span>
                                                            {isChildActive && (
                                                                <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse" />
                                                            )}
                                                        </NextLink>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Mobile Accordion */}
                                    {isMobile && isOpen && (
                                        <div className="ml-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                            {item.children?.map((child) => {
                                                const ChildIcon = child.icon;
                                                const isChildActive = child.href && pathname?.startsWith(child.href) || false;
                                                return (
                                                    <NextLink
                                                        key={child.href || child.name}
                                                        href={child.href || ''}
                                                        onClick={() => setOpenDropdown(null)}
                                                        className={cn(
                                                            "group relative flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200",
                                                            "hover:scale-[1.01] active:scale-[0.99]",
                                                            isChildActive
                                                                ? "bg-gradient-to-r from-primary/10 to-transparent text-primary border-l-2 border-primary"
                                                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:border-l-2 hover:border-primary/30"
                                                        )}
                                                    >
                                                        <ChildIcon className={cn(
                                                            "w-4 h-4 transition-all duration-200",
                                                            isChildActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                                                            "group-hover:scale-110"
                                                        )} />
                                                        <span className="ml-2 text-sm">{child.name}</span>
                                                        {isChildActive && <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-r-full" />}
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
                                    "flex items-center px-3 py-2.5 rounded-xl font-medium transition-all group relative",
                                    "hover:scale-[1.02] active:scale-[0.98]",
                                    isActive
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                                    !isSidebarOpen && "justify-center"
                                )}
                            >
                                <Icon className={cn(
                                    "w-5 h-5 transition-transform group-hover:scale-110",
                                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                )} />
                                {isSidebarOpen && (
                                    <>
                                        <span className="ml-3 flex-1">{item.name}</span>
                                        {isActive && <div className="absolute left-[-12px] w-1 h-6 bg-primary rounded-r-full" />}
                                    </>
                                )}
                                {!isSidebarOpen && isActive && <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" />}
                            </NextLink>
                        );
                    })}
                </nav>

                <div className="p-4">
                    <button
                        onClick={handleLogout}
                        className={cn(
                            "flex items-center w-full px-3 py-3 rounded-xl font-medium text-destructive hover:bg-destructive/10 transition-all active:scale-[0.98]",
                            !isSidebarOpen && "justify-center"
                        )}
                    >
                        <LogOut className="w-5 h-5" />
                        {isSidebarOpen && <span className="ml-3">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={cn(
                "flex-1 flex flex-col min-w-0 transition-all duration-300",
                isSidebarOpen ? 'ml-60' : 'ml-20'
            )}>
                <header className="h-16 bg-card/95 backdrop-blur-sm border-b border-border/30 flex items-center justify-between px-8 z-10 sticky top-0 dark:bg-card/90 dark:border-border/20">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-semibold text-foreground/90 capitalize tracking-tight">
                            {pathname?.split('/')[1]?.replace(/-/g, ' ') || 'Dashboard'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <LanguageSwitch />
                        <Notification />
                        <DarkModeToggle />
                        <div className="flex items-center gap-3 pr-6 border-l border-border/20 pl-6">
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-semibold text-foreground leading-tight">{user?.name || "User"}</span>
                                <span className="text-[10px] text-muted-foreground/70 uppercase font-bold tracking-widest">{user?.role || "admin"}</span>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 flex items-center justify-center text-primary font-bold transition-all hover:scale-105 hover:rotate-3 border border-primary/20">
                                {(user?.name || "User").charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-background via-background to-muted/10 dark:from-background dark:via-background dark:to-muted/5 scrollbar-thin scrollbar-thumb-muted/50 dark:scrollbar-thumb-muted/30">
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}


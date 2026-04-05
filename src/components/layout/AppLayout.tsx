"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUser, clearAuth, User } from "@/lib/auth";
import { LayoutDashboard, Users, Briefcase, FileText, Settings, LogOut, Menu, Loader2 } from "lucide-react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

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

    const handleLogout = () => {
        clearAuth();
        router.push("/login");
    };

    // Prevent hydration mismatch and show loading during active auth check
    if (!mounted || isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-pulse" />
                    <Loader2 className="w-8 h-8 text-primary animate-spin absolute inset-0 m-auto" />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        sevastu
                    </h2>
                    <p className="text-xs text-muted-foreground font-medium animate-pulse">
                        Authenticating access...
                    </p>
                </div>
            </div>
        );
    }

    // Only render the layout content if we have a user, otherwise return null (redirection is handled in useEffect)
    if (!user) return null;

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["admin", "staff"] },
        { name: "Users", href: "/users", icon: Users, roles: ["admin", "staff"] },
        { name: "Jobs", href: "/jobs", icon: Briefcase, roles: ["admin", "staff"] },
        { name: "Leads", href: "/leads", icon: FileText, roles: ["admin", "staff"] },
        { name: "Settings", href: "/settings", icon: Settings, roles: ["admin"] },
    ];

    const visibleNavItems = navItems.filter((item) => item.roles.includes(user.role));

    return (
        <div className="min-h-screen bg-background text-foreground flex transition-colors duration-300">
            {/* Sidebar */}
            <aside className={cn(
                "bg-card border-r border-border transition-all duration-300 flex flex-col shadow-sm z-20",
                isSidebarOpen ? 'w-64' : 'w-20'
            )}>
                <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
                    <div className={cn(
                        "font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent transition-all",
                        isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                    )}>
                        sevastu
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-all hover:text-primary active:scale-95"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-2">
                    {visibleNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <NextLink
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center px-3 py-2.5 rounded-xl font-medium transition-all group relative",
                                    isActive
                                        ? "bg-primary/10 text-primary shadow-[0_0_0_1px_rgba(var(--primary-color),0.1)]"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
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

                <div className="p-4 border-t border-border/50">
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
            <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                <header className="h-16 bg-card border-b border-border/50 flex items-center justify-between px-8 shadow-sm z-10 sticky top-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-lg font-semibold text-foreground/90 capitalize tracking-tight">
                            {pathname.split('/')[1]?.replace(/-/g, ' ') || 'Dashboard'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 pr-6 border-r border-border/50">
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-semibold text-foreground leading-tight">{user.name || "User"}</span>
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{user.role}</span>
                            </div>
                            <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold shadow-inner transition-transform hover:rotate-3">
                                {(user.name || "User").charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-8 overflow-y-auto bg-background/50 scrollbar-thin scrollbar-thumb-muted">
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}


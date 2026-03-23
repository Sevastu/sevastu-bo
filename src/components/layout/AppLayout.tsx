"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUser, clearAuth, User } from "@/lib/auth";

import { LayoutDashboard, Users, Briefcase, FileText, Settings, LogOut, Menu } from "lucide-react";
// Since next/landing might not exist, using next/link, ah it should be next/link
import NextLink from "next/link";

interface AppLayoutProps {
    children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const currentUser = getUser();
        if (currentUser) {
            setUser(currentUser);
        } else {
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        clearAuth();
        router.push("/login");
    };

    if (!user) {
        return null; // or a loading spinner
    }

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["admin", "staff"] },
        { name: "Users", href: "/users", icon: Users, roles: ["admin", "staff"] },
        { name: "Jobs", href: "/jobs", icon: Briefcase, roles: ["admin", "staff"] },
        { name: "Leads", href: "/leads", icon: FileText, roles: ["admin", "staff"] },
        { name: "Settings", href: "/settings", icon: Settings, roles: ["admin"] },
    ];

    const visibleNavItems = navItems.filter((item) => item.roles.includes(user.role));

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
                    <div className={`font-bold text-xl text-blue-600 ${isSidebarOpen ? 'block' : 'hidden'}`}>
                        Kaamsetu
                    </div>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 py-4 px-3 space-y-1">
                    {visibleNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <NextLink
                                key={item.href}
                                href={item.href}
                                className={`flex items-center px-3 py-2.5 rounded-lg font-medium transition-colors ${isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                                    } ${!isSidebarOpen && "justify-center"}`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "text-blue-700" : "text-gray-400"}`} />
                                {isSidebarOpen && <span className="ml-3">{item.name}</span>}
                            </NextLink>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center w-full px-3 py-2.5 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors ${!isSidebarOpen && "justify-center"}`}
                    >
                        <LogOut className="w-5 h-5 text-red-500" />
                        {isSidebarOpen && <span className="ml-3">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
                    <h1 className="text-xl font-semibold text-gray-800 capitalize">
                        {pathname.split('/')[1] || 'Dashboard'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold shadow-sm">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-700 leading-tight">{user.name}</span>
                            <span className="text-xs text-gray-500 leading-tight capitalize">{user.role}</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-8 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

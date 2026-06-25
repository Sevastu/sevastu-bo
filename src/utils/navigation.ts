import {
    LayoutDashboard,
    Users,
    Briefcase,
    FileText,
    Settings,
    UserCheck,
    Hammer,
    Layers,
    Trophy,
    ActivityIcon,
    User2Icon,
    LucideIcon
} from 'lucide-react';

export interface NavItem {
    name: string;
    href?: string;
    icon: LucideIcon;
    roles: string[];
    isDropdown?: boolean;
    children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["admin", "staff"] },
    { name: "Analytics", href: "/analytics", icon: ActivityIcon, roles: ["admin", "staff"] },
    {
        name: "Services",
        icon: Layers,
        roles: ["admin", "staff"],
        isDropdown: true,
        children: [
            { name: "Catalog", href: "/catalog", icon: User2Icon, roles: ["admin", "staff"] },
            { name: "Categories", href: "/categories", icon: User2Icon, roles: ["admin", "staff"] },
            { name: "All Services", href: "/services", icon: Hammer, roles: ["admin", "staff"] },
            { name: "All Sub-Services", href: "/sub-services", icon: Layers, roles: ["admin", "staff"] }
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

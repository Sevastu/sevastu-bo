// import React from 'react';
// import { LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { User } from '@/lib/auth';

// interface SidebarFooterProps {
//     user: User | null;
//     isCollapsed: boolean;
//     isMobile: boolean;
//     onLogout: () => void;
//     onToggleCollapse: () => void;
// }

// export function SidebarFooter({ user, isCollapsed, isMobile, onLogout, onToggleCollapse }: SidebarFooterProps) {
//     return (
//         <div className="p-4 border-t border-primary/50 flex flex-col gap-2">
//             <button
//                 onClick={onLogout}
//                 className={cn(
//                     "w-full flex items-center px-4 py-3 rounded-xl transition-colors",
//                     "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30",
//                     isCollapsed ? "justify-center px-0" : "gap-3"
//                 )}
//                 title={isCollapsed ? "Logout" : undefined}
//             >
//                 <LogOut className="w-5 h-5 shrink-0" />
//                 {!isCollapsed && <span>Logout</span>}
//             </button>
//         </div>
//     );
// }

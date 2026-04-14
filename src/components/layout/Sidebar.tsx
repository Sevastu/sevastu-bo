// import React from 'react';
// import { 
//   LayoutDashboard, 
//   Briefcase, 
//   Users, 
//   UserCheck, 
//   Settings, 
//   BarChart3,
//   Package,
//   Menu
// } from 'lucide-react';

// interface SidebarItemProps {
//   icon: React.ReactNode;
//   label: string;
//   isActive?: boolean;
//   onClick?: () => void;
// }

// const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
//         isActive 
//           ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-l-4 border-[var(--color-primary)]' 
//           : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-text)]'
//       }`}
//     >
//       {icon}
//       <span className="font-medium">{label}</span>
//     </button>
//   );
// };

// export const Sidebar: React.FC = () => {
//   const [activeItem, setActiveItem] = React.useState('dashboard');

//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
//     { id: 'jobs', label: 'Jobs', icon: <Briefcase size={20} /> },
//     { id: 'workers', label: 'Workers', icon: <Users size={20} /> },
//     // { id: 'worker-verification', label: 'Worker-verification', icon: <Users size={20} /> },
//     { id: 'customers', label: 'Customers', icon: <UserCheck size={20} /> },
//     { id: 'services', label: 'Services', icon: <Package size={20} /> },
//     { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
//     { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
//   ];

//   return (
//     <div className="w-64 bg-[var(--color-card)] border-r border-[var(--color-border)] min-h-screen">
//       {/* Logo */}
//       <div className="p-6 border-b border-[var(--color-border)]">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-lg">S</span>
//           </div>
//           <span className="text-xl font-bold text-[var(--color-text)]">Sevastu</span>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="p-4">
//         <div className="space-y-1">
//           {menuItems.map((item) => (
//             <SidebarItem
//               key={item.id}
//               icon={item.icon}
//               label={item.label}
//               isActive={activeItem === item.id}
//               onClick={() => setActiveItem(item.id)}
//             />
//           ))}
//         </div>
//       </nav>
//     </div>
//   );
// };

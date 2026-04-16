// import React from 'react';
// import { Search, Bell, User, ChevronDown } from 'lucide-react';

// export const Header: React.FC = () => {
//   return (
//     <header className="bg-[var(--color-card)] border-b border-[var(--color-border)] px-6 py-4">
//       <div className="flex items-center justify-between">
//         {/* Search Bar */}
//         <div className="flex-1 max-w-2xl">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)] w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search jobs, workers, customers..."
//               className="w-full pl-10 pr-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Notifications */}
//           <button className="relative p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-muted)] rounded-lg transition-colors">
//             <Bell size={20} />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-error)] rounded-full"></span>
//           </button>

//           {/* Profile */}
//           <div className="flex items-center gap-3">
//             <div className="text-right">
//               <div className="text-sm font-medium text-[var(--color-text)]">Admin User</div>
//               <div className="text-xs text-[var(--color-text-secondary)]">admin@sevastu.com</div>
//             </div>
//             <div className="w-10 h-10 bg-[var(--color-muted)] rounded-full flex items-center justify-center">
//               <User size={20} className="text-[var(--color-text-secondary)]" />
//             </div>
//             <ChevronDown size={16} className="text-[var(--color-text-muted)]" />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

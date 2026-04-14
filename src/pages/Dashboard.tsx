// import React from 'react';
// import { 
//   Briefcase, 
//   CheckCircle, 
//   Clock, 
//   DollarSign,
//   TrendingUp,
//   Users,
//   AlertCircle
// } from 'lucide-react';
// import { DashboardLayout } from '../components/layout/DashboardLayout';
// import { KPICard } from '../components/ui/KPICard';
// import { JobsChart } from '../components/charts/JobsChart';
// import { SystemHealth } from '../components/ui/SystemHealth';

// export const Dashboard: React.FC = () => {
//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         {/* Page Header */}
//         <div>
//           <h1 className="text-2xl font-bold text-[var(--color-text)]">Dashboard</h1>
//           <p className="text-[var(--color-text-secondary)]">Overview of your service marketplace operations</p>
//         </div>

//         {/* KPI Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <KPICard
//             title="Total Jobs"
//             value="1,234"
//             change="+12%"
//             changeType="increase"
//             icon={<Briefcase size={20} />}
//             // color="blue"
//           />
//           <KPICard
//             title="Active Jobs"
//             value="89"
//             change="+5%"
//             changeType="increase"
//             icon={<Clock size={20}/>}
//             // color="orange"
//           />
//           <KPICard
//             title="Completed Jobs"
//             value="1,145"
//             change="+18%"
//             changeType="increase"
//             icon={<CheckCircle size={20} />}
//             // color="green"
//           />
//           <KPICard
//             title="Revenue"
//             value="$45,678"
//             change="+23%"
//             changeType="increase"
//             icon={<DollarSign size={20}/>}
//             // color="purple"
//           />
//         </div>

//         {/* Charts and System Health */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Jobs Over Time Chart */}
//           <div className="lg:col-span-2">
//             <JobsChart />
//           </div>

//           {/* System Health */}
//           <div>
//             <SystemHealth />
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-border)] p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-lg font-semibold text-[var(--color-text)]">Recent Activity</h2>
//             <button className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary)] font-medium">
//               View All
//             </button>
//           </div>
          
//           <div className="space-y-4">
//             {[1, 2, 3, 4].map((item) => (
//               <div key={item} className="flex items-center gap-4 p-4 bg-[var(--color-muted)] rounded-lg">
//                 <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
//                   <Briefcase className="w-5 h-5 text-[var(--color-primary)]" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="font-medium text-[var(--color-text)]">New job assigned</div>
//                   <div className="text-sm text-[var(--color-text-secondary)]">Home Cleaning - John Doe</div>
//                 </div>
//                 <div className="text-sm text-[var(--color-text-secondary)]">2 min ago</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };
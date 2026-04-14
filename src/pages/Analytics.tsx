// import React, { useState } from 'react';
// import { 
//   TrendingUp, 
//   TrendingDown, 
//   Users, 
//   Briefcase, 
//   DollarSign, 
//   Calendar,
//   Download,
//   Filter,
//   BarChart3,
//   PieChart,
//   Activity
// } from 'lucide-react';
// import { DashboardLayout } from '../components/layout/DashboardLayout';
// import { KPICard } from '../components/ui/KPICard';
// import { SimpleBarChart } from '../components/charts/SimpleBarChart';
// import { SimplePieChart } from '../components/charts/SimplePieChart';
// import { SimpleLineChart } from '../components/charts/SimpleLineChart';

// export const Analytics: React.FC = () => {
//   const [timeRange, setTimeRange] = useState('30d');
//   const [selectedMetric, setSelectedMetric] = useState('revenue');

//   const kpiData = [
//     {
//       title: 'Total Revenue',
//       value: '$125,430',
//       change: '+18%',
//       changeType: 'increase' as const,
//       icon: <DollarSign className="text-green-600" />,
//       color: 'green' as const
//     },
//     {
//       title: 'Active Users',
//       value: '8,234',
//       change: '+12%',
//       changeType: 'increase' as const,
//       icon: <Users className="text-blue-600" />,
//       color: 'blue' as const
//     },
//     {
//       title: 'Total Jobs',
//       value: '2,456',
//       change: '+8%',
//       changeType: 'increase' as const,
//       icon: <Briefcase className="text-purple-600" />,
//       color: 'purple' as const
//     },
//     {
//       title: 'Avg. Job Value',
//       value: '$51.20',
//       change: '-2%',
//       changeType: 'decrease' as const,
//       icon: <TrendingUp className="text-orange-600" />,
//       color: 'orange' as const
//     }
//   ];

//   const serviceData = [
//     { name: 'Home Cleaning', value: 45, color: 'var(--color-primary)' },
//     { name: 'Plumbing', value: 28, color: 'var(--color-success)' },
//     { name: 'Electrical', value: 22, color: 'var(--color-warning)' },
//     { name: 'Painting', value: 18, color: 'var(--color-primary)' },
//     { name: 'Gardening', value: 12, color: 'var(--color-success)' },
//     { name: 'Moving', value: 8, color: 'var(--color-muted)' }
//   ];

//   const revenueData = [
//     { month: 'Jan', revenue: 12000, jobs: 180 },
//     { month: 'Feb', revenue: 15000, jobs: 220 },
//     { month: 'Mar', revenue: 18000, jobs: 280 },
//     { month: 'Apr', revenue: 16000, jobs: 250 },
//     { month: 'May', revenue: 22000, jobs: 320 },
//     { month: 'Jun', revenue: 25000, jobs: 380 }
//   ];

//   const workerPerformanceData = [
//     { name: 'Mike Wilson', jobs: 45, rating: 4.8, revenue: 2340 },
//     { name: 'Sarah Davis', jobs: 38, rating: 4.9, revenue: 2100 },
//     { name: 'Tom Harris', jobs: 32, rating: 4.6, revenue: 1850 },
//     { name: 'Lisa Chen', jobs: 28, rating: 4.7, revenue: 1650 },
//     { name: 'John Smith', jobs: 25, rating: 4.5, revenue: 1420 }
//   ];

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-[var(--color-text)]">Analytics</h1>
//             <p className="text-[var(--color-text-secondary)]">Comprehensive insights into your marketplace performance</p>
//           </div>
//           <div className="flex items-center gap-3">
//             {/* Time Range Selector */}
//             <select
//               value={timeRange}
//               onChange={(e) => setTimeRange(e.target.value)}
//               className="px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-[var(--color-card)] text-[var(--color-text)]"
//             >
//               <option value="7d">Last 7 days</option>
//               <option value="30d">Last 30 days</option>
//               <option value="90d">Last 90 days</option>
//               <option value="1y">Last year</option>
//             </select>
            
//             {/* Export Button */}
//             <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary)] transition-colors">
//               <Download size={16} />
//               Export Report
//             </button>
//           </div>
//         </div>

//         {/* KPI Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {kpiData.map((kpi, index) => (
//             <KPICard key={index} {...kpi} />
//           ))}
//         </div>

//         {/* Charts Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Revenue Trend */}
//           <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-border)] p-6">
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-[var(--color-text)]">Revenue & Jobs Trend</h3>
//               <p className="text-sm text-[var(--color-text-secondary)]">Monthly performance overview</p>
//             </div>
//             <SimpleLineChart data={revenueData} />
//           </div>

//           {/* Service Distribution */}
//           <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-border)] p-6">
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-[var(--color-text)]">Service Distribution</h3>
//               <p className="text-sm text-[var(--color-text-secondary)]">Jobs by service category</p>
//             </div>
//             <SimplePieChart data={serviceData} />
//           </div>
//         </div>

//         {/* Worker Performance */}
//         <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-border)] p-6">
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-[var(--color-text)]">Top Worker Performance</h3>
//             <p className="text-sm text-[var(--color-text-secondary)]">Best performing workers this month</p>
//           </div>
//           <SimpleBarChart data={workerPerformanceData} />
//         </div>

//         {/* Additional Metrics */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Customer Acquisition */}
//           <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-border)] p-6">
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-[var(--color-text)]">Customer Acquisition</h3>
//               <p className="text-sm text-[var(--color-text-secondary)]">New customers over time</p>
//             </div>
//             <div className="space-y-4">
//               {[
//                 { period: 'This Week', customers: 45, growth: '+12%' },
//                 { period: 'Last Week', customers: 38, growth: '+8%' },
//                 { period: 'This Month', customers: 156, growth: '+23%' }
//               ].map((item, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 bg-[var(--color-muted)] rounded-lg">
//                   <div>
//                     <div className="font-medium text-[var(--color-text)]">{item.period}</div>
//                     <div className="text-sm text-[var(--color-text-secondary)]">{item.customers} customers</div>
//                   </div>
//                   <div className={`text-sm font-medium ${
//                     item.growth.startsWith('+') ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'
//                   }`}>
//                     {item.growth}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Job Success Rate */}
//           <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-border)] p-6">
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-[var(--color-text)]">Job Success Rate</h3>
//               <p className="text-sm text-[var(--color-text-secondary)]">Completion and cancellation metrics</p>
//             </div>
//             <div className="space-y-4">
//               {[
//                 { metric: 'Completed', value: '94%', color: 'bg-[var(--color-success)]/10 text-[var(--color-success)]' },
//                 { metric: 'In Progress', value: '4%', color: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' },
//                 { metric: 'Cancelled', value: '2%', color: 'bg-[var(--color-error)]/10 text-[var(--color-error)]' }
//               ].map((item, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <span className="text-sm text-[var(--color-text-secondary)]">{item.metric}</span>
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.color}`}>
//                     {item.value}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Revenue by Region */}
//           <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-border)] p-6">
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-[var(--color-text)]">Revenue by Region</h3>
//               <p className="text-sm text-[var(--color-text-secondary)]">Geographic distribution</p>
//             </div>
//             <div className="space-y-4">
//               {[
//                 { region: 'Mumbai', revenue: '$45,230', percentage: 36 },
//                 { region: 'Delhi', revenue: '$38,120', percentage: 30 },
//                 { region: 'Bangalore', revenue: '$28,450', percentage: 23 },
//                 { region: 'Others', revenue: '$13,630', percentage: 11 }
//               ].map((item, index) => (
//                 <div key={index} className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-medium text-[var(--color-text)]">{item.region}</span>
//                     <span className="text-sm text-[var(--color-text-secondary)]">{item.revenue}</span>
//                   </div>
//                   <div className="w-full bg-[var(--color-muted)] rounded-full h-2">
//                     <div
//                       className="bg-[var(--color-primary)] h-2 rounded-full"
//                       style={{ width: `${item.percentage}%` }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// "use client"
// import React, { useState, useEffect } from 'react';
// import { 
//   Search, 
//   Filter, 
//   Calendar,
//   MoreVertical,
//   Eye,
//   User,
//   Briefcase,
//   Clock,
//   CheckCircle,
//   XCircle,
//   AlertCircle
// } from 'lucide-react';
// // import { DashboardLayout } from '../components/layout/DashboardLayout';
// import { StatusBadge } from '../../components/ui/StatusBadge';
// import { JobDetailDrawer } from '../../components/jobs/JobDetailDrawer';
// import { AppLayout } from '@/components/layout/AppLayout';
// // import { Job } from '@/features/jobs/types';

// // import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { fetchJobs } from "@/features/jobs/api";
// import { Job, JobStatus, JobFilters } from "@/features/jobs/types";
// import { DataTable } from "@/components/DataTable";
// // import { AppLayout } from "@/components/layout/AppLayout";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// // import { Filter, Eye, Calendar, Search } from "lucide-react";
// import { getUser } from "@/lib/auth";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
// import { JobDetailsSheet } from "./components/JobDetailsSheet";
// import { cn } from "@/lib/utils";
// import { formatDate } from "@/lib/date-utils";
// import { Input } from "@/components/ui/input";


// // const mockJobs: Job[] = [
// //   {
// //     id: 'JOB-001',
// //     customer: 'John Doe',
// //     service: 'Home Cleaning',
// //     status: 'open',
// //     date: '2024-01-15',
// //     price: '$45'
// //   },
// //   {
// //     id: 'JOB-002',
// //     customer: 'Jane Smith',
// //     service: 'Plumbing',
// //     status: 'assigned',
// //     date: '2024-01-15',
// //     price: '$89',
// //     worker: 'Mike Wilson'
// //   },
// //   {
// //     id: 'JOB-003',
// //     customer: 'Bob Johnson',
// //     service: 'Electrical',
// //     status: 'in_progress',
// //     date: '2024-01-14',
// //     price: '$120',
// //     worker: 'Sarah Davis'
// //   },
// //   {
// //     id: 'JOB-004',
// //     customer: 'Alice Brown',
// //     service: 'Painting',
// //     status: 'completed',
// //     date: '2024-01-13',
// //     price: '$250',
// //     worker: 'Tom Harris'
// //   },
// //   {
// //     id: 'JOB-005',
// //     customer: 'Charlie Wilson',
// //     service: 'Gardening',
// //     status: 'cancelled',
// //     date: '2024-01-13',
// //     price: '$35'
// //   }
// // ];

// export default function JobsManagement() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('all');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadJobs = async () => {
//       try {
//         const result = await fetchJobs({});
//         console.log("API Response:", result);

//         setJobs(result.data);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadJobs();
//   }, []);

//   const filteredJobs = Array.isArray(jobs)
//   ? jobs.filter(job => {
//       const matchesSearch =
//         job.customerId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         job.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         job.id?.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesStatus =
//         selectedStatus === 'all' || job.status === selectedStatus;

//       const matchesDate =
//         !selectedDate || job.scheduledAt === selectedDate;

//       return matchesSearch && matchesStatus && matchesDate;
//     })
//   : [];

//   // console.log("API Response:", data);

//   const handleJobClick = (job: Job) => {
//     setSelectedJob(job);
//     setIsDrawerOpen(true);
//   };

//   return (
//     <AppLayout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div>
//           <h1 className="text-2xl font-bold text-[var(--color-text)]">Jobs Management</h1>
//           <p className="text-[var(--color-text-secondary)]">Monitor and manage all service jobs</p>
//         </div>

//         {/* Filters */}
//         <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-border)] p-6">
//           <div className="flex flex-col lg:flex-row gap-4">
//             {/* Search */}
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)] w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search jobs..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Status Filter */}
//             <div className="lg:w-48">
//               <select
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//                 className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
//               >
//                 <option value="all">All Status</option>
//                 <option value="open">Open</option>
//                 <option value="assigned">Assigned</option>
//                 <option value="in_progress">In Progress</option>
//                 <option value="completed">Completed</option>
//                 <option value="cancelled">Cancelled</option>
//               </select>
//             </div>

//             {/* Date Filter */}
//             <div className="lg:w-48">
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
//               />
//             </div>

//             {/* Filter Button */}
//             <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-muted)] text-[var(--color-text)] rounded-lg hover:bg-[var(--color-muted)] transition-colors">
//               <Filter size={16} />
//               More Filters
//             </button>
//           </div>
//         </div>

//         {/* Jobs Table */}
//         <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-border)] overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-[var(--color-muted)] border-b border-[var(--color-border)]">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
//                     Job ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
//                     Customer
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
//                     Service
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
//                     Price
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
//                     Worker
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-[var(--color-card)] divide-y divide-[var(--color-border)]">
//                 {filteredJobs.map((job) => (
//                   <tr 
//                     key={job.id} 
//                     className="hover:bg-[var(--color-muted)] cursor-pointer transition-colors"
//                     onClick={() => handleJobClick(job)}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-text)]">
//                       {job.id}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text)]">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 bg-[var(--color-muted)] rounded-full flex items-center justify-center">
//                           <User size={16} className="text-[var(--color-text-secondary)]" />
//                         </div>
//                         {job.customerId}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text)]">
//                       <div className="flex items-center gap-2">
//                         <Briefcase size={16} className="text-[var(--color-text-secondary)]" />
//                         {job.service}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <StatusBadge status={job.status} />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text)]">
//                       <div className="flex items-center gap-2">
//                         <Calendar size={16} className="text-[var(--color-text-secondary)]" />
//                         {job.scheduledAt}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-text)]">
//                       {job.price}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text)]">
//                       {job.workerId || '-'}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-[var(--color-text)]">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleJobClick(job);
//                         }}
//                         className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
//                       >
//                         <Eye size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Job Detail Drawer */}
//         <JobDetailDrawer
//           isOpen={isDrawerOpen}
//           onClose={() => setIsDrawerOpen(false)}
//           job={selectedJob}
//         />
//       </div>
//     </AppLayout>
//   );
// };

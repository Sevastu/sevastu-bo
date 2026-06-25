import React, { ReactNode } from "react";

interface WorkerStatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgClass: string;
  trend?: string;
}

export const WorkerStatCard = React.memo(function WorkerStatCard({
  title,
  value,
  icon,
  iconBgClass,
  trend,
}: WorkerStatCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <div className="flex items-end gap-2">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
            {trend && <span className="text-xs font-medium text-emerald-600 mb-1">{trend}</span>}
          </div>
        </div>
        <div className={`p-3 rounded-xl ${iconBgClass} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          {icon}
        </div>
      </div>
    </div>
  );
});

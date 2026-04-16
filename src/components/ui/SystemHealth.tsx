import React from 'react';
import { Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface HealthItemProps {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
  icon: React.ReactNode;
}

const HealthItem: React.FC<HealthItemProps> = ({ label, value, status, icon }) => {
  const statusColors = {
    good: 'text-[var(--color-success)] bg-[var(--color-success)]/10',
    warning: 'text-[var(--color-warning)] bg-[var(--color-warning)]/10',
    critical: 'text-[var(--color-error)] bg-[var(--color-error)]/10',
  };

  return (
    <div className="flex items-center justify-between p-3 bg-[var(--color-muted)] rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${statusColors[status]}`}>
          {icon}
        </div>
        <div>
          <div className="text-sm font-medium text-[var(--color-text)]">{label}</div>
          <div className="text-xs text-[var(--color-text-secondary)]">Status</div>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-lg font-semibold ${statusColors[status].split(' ')[0]}`}>
          {value}
        </div>
      </div>
    </div>
  );
};

export const SystemHealth: React.FC = () => {
  return (
    <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-border)] p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">System Health</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">Real-time operational metrics</p>
      </div>
      
      <div className="space-y-3">
        <HealthItem
          label="Worker Availability"
          value="87%"
          status="good"
          icon={<Users size={16} />}
        />
        <HealthItem
          label="Job Success Rate"
          value="94%"
          status="good"
          icon={<CheckCircle size={16} />}
        />
        <HealthItem
          label="Avg Response Time"
          value="2.3s"
          status="warning"
          icon={<Clock size={16} />}
        />
        <HealthItem
          label="Failed Jobs"
          value="3"
          status="critical"
          icon={<AlertCircle size={16} />}
        />
      </div>
    </div>
  );
};

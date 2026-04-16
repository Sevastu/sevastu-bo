import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  changeType,
  icon
}) => {
  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 transition-all hover:shadow-md">
      
      <div className="flex items-center justify-between">
        
        <div className="flex-1">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">
            {value}
          </h2>

          <div className={`flex items-center gap-1 text-sm font-medium ${
            changeType === 'increase'
              ? 'text-[var(--color-success)]'
              : 'text-[var(--color-error)]'
          }`}>
            {changeType === 'increase' ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            {change}
          </div>
        </div>

        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[var(--color-muted)] text-[var(--color-primary)]">
          {icon}
        </div>

      </div>
    </div>
  );
};
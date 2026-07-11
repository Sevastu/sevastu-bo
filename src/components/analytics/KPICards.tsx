"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { GlobalKPIs, KPIValue } from '@/features/analytics/types/analytics.types';
import { KPICard as UICard } from '@/components/ui/KPICard';
import { DollarSign, Briefcase, Users, UserCheck, Activity, TrendingUp, XCircle, CheckCircle, Star } from 'lucide-react';

interface KPICardsProps {
  data?: GlobalKPIs;
  isLoading: boolean;
}

export const KPICards: React.FC<KPICardsProps> = ({ data, isLoading }) => {
  const router = useRouter();

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="h-[120px] bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  const handleDrillDown = (route: string) => {
    router.push(route);
  };

  const mapKpi = (kpi: KPIValue, title: string, icon: React.ReactNode, route: string) => ({
    title,
    value: kpi.formatted,
    change: `${kpi.trend > 0 ? '+' : ''}${kpi.trend}%`,
    changeType: kpi.trendType,
    icon,
    onClick: () => handleDrillDown(route)
  });

  const cards = [
    mapKpi(data.revenue, 'Total Revenue', <DollarSign className="text-green-600" />, '/analytics/revenue'),
    mapKpi(data.jobs, 'Total Jobs', <Briefcase className="text-blue-600" />, '/jobs'),
    mapKpi(data.workers, 'Active Workers', <UserCheck className="text-purple-600" />, '/workers'),
    mapKpi(data.customers, 'Customers', <Users className="text-indigo-600" />, '/customers'),
    mapKpi(data.conversionRate, 'Conversion Rate', <Activity className="text-orange-600" />, '/analytics/conversion'),
    mapKpi(data.growth, 'Business Growth', <TrendingUp className="text-teal-600" />, '/analytics/growth'),
    mapKpi(data.cancellationRate, 'Cancellation Rate', <XCircle className="text-red-600" />, '/analytics/retention'),
    mapKpi(data.completionRate, 'Completion Rate', <CheckCircle className="text-emerald-600" />, '/analytics/performance'),
    mapKpi(data.averageRating, 'Average Rating', <Star className="text-yellow-500" />, '/analytics/reviews'),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {cards.map((card, idx) => (
        <div key={idx} onClick={card.onClick}>
          <UICard 
            title={card.title}
            value={card.value}
            change={card.change}
            changeType={card.changeType as 'increase' | 'decrease'}
            icon={card.icon}
          />
        </div>
      ))}
    </div>
  );
};

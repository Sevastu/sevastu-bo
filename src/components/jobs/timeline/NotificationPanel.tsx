import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface NotificationPanelProps {
  notifications: any[];
  isLoading: boolean;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Smart Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 animate-pulse">
            {[1, 2].map(i => <div key={i} className="h-12 bg-gray-200 rounded"></div>)}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Premium Feature 4: Smart Alerts parsing
  // Mock smart alerts based on backend notifications payload
  const alerts = notifications && notifications.length > 0 ? notifications : [
    { severity: 'Critical', message: 'Assignment pending too long. SLA breached.', time: '10 min ago' },
    { severity: 'Warning', message: 'Schedule slightly delayed. Worker en route.', time: '1 hr ago' },
    { severity: 'Info', message: 'Timeline gap detected between stages.', time: '2 hrs ago' }
  ];

  const getSeverityConfig = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return { icon: <AlertTriangle className="w-4 h-4 text-red-600" />, bg: 'bg-red-50', border: 'border-red-200' };
      case 'warning': return { icon: <AlertCircle className="w-4 h-4 text-yellow-600" />, bg: 'bg-yellow-50', border: 'border-yellow-200' };
      default: return { icon: <Info className="w-4 h-4 text-blue-600" />, bg: 'bg-blue-50', border: 'border-blue-200' };
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="flex items-center gap-2 text-base">
          <Bell className="w-4 h-4 text-indigo-500" />
          Smart Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {alerts.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-4">No active alerts.</div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert, idx) => {
              const { icon, bg, border } = getSeverityConfig(alert.severity);
              return (
                <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg border ${bg} ${border}`}>
                  <div className="mt-0.5">{icon}</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{alert.message}</div>
                    <div className="text-xs text-gray-500 mt-1 font-semibold">{alert.severity} • {alert.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

import React from 'react';

interface SimpleLineChartProps {
  data: Array<{
    month: string;
    revenue: number;
    jobs: number;
  }>;
}

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ data }) => {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const maxJobs = Math.max(...data.map(d => d.jobs));
  const chartHeight = 200;
  const chartWidth = 600;
  const padding = 40;

  return (
    <div className="h-64 overflow-auto">
      <svg width={chartWidth} height={chartHeight} className="w-full">
        {/* Grid Lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + (i * (chartHeight - 2 * padding)) / 4}
            x2={chartWidth - padding}
            y2={padding + (i * (chartHeight - 2 * padding)) / 4}
            stroke="#f0f0f0"
            strokeWidth="1"
          />
        ))}
        
        {/* Revenue Line */}
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          points={data.map((item, index) => {
            const x = padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
            const y = padding + ((maxRevenue - item.revenue) / maxRevenue) * (chartHeight - 2 * padding);
            return `${x},${y}`;
          }).join(' ')}
        />
        
        {/* Jobs Line */}
        <polyline
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeDasharray="5,5"
          points={data.map((item, index) => {
            const x = padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
            const y = padding + ((maxJobs - item.jobs) / maxJobs) * (chartHeight - 2 * padding);
            return `${x},${y}`;
          }).join(' ')}
        />
        
        {/* Data Points - Revenue */}
        {data.map((item, index) => {
          const x = padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
          const y = padding + ((maxRevenue - item.revenue) / maxRevenue) * (chartHeight - 2 * padding);
          return (
            <circle
              key={`revenue-${index}`}
              cx={x}
              cy={y}
              r="4"
              fill="#3b82f6"
              className="hover:r-6 transition-all cursor-pointer"
            />
          );
        })}
        
        {/* Data Points - Jobs */}
        {data.map((item, index) => {
          const x = padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
          const y = padding + ((maxJobs - item.jobs) / maxJobs) * (chartHeight - 2 * padding);
          return (
            <circle
              key={`jobs-${index}`}
              cx={x}
              cy={y}
              r="4"
              fill="#10b981"
              className="hover:r-6 transition-all cursor-pointer"
            />
          );
        })}
        
        {/* X-axis Labels */}
        {data.map((item, index) => {
          const x = padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
          return (
            <text
              key={index}
              x={x}
              y={chartHeight - 10}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
            >
              {item.month}
            </text>
          );
        })}
        
        {/* Y-axis Labels - Revenue */}
        {[0, 1, 2, 3, 4].map((i) => {
          const value = Math.round((maxRevenue * (4 - i)) / 4);
          const y = padding + (i * (chartHeight - 2 * padding)) / 4;
          return (
            <text
              key={`revenue-${i}`}
              x={padding - 10}
              y={y + 4}
              textAnchor="end"
              fontSize="12"
              fill="#6b7280"
            >
              ${value.toLocaleString()}
            </text>
          );
        })}
        
        {/* Legend */}
        <g>
          <rect x={chartWidth - 150} y={20} width={12} height={12} fill="#3b82f6" />
          <text x={chartWidth - 135} y={30} fontSize="12" fill="#374151">Revenue</text>
          
          <rect x={chartWidth - 150} y={40} width={12} height={12} fill="#10b981" />
          <text x={chartWidth - 135} y={50} fontSize="12" fill="#374151">Jobs</text>
        </g>
      </svg>
    </div>
  );
};

import React from 'react';

const mockData = [
  { date: 'Jan 1', jobs: 12 },
  { date: 'Jan 5', jobs: 19 },
  { date: 'Jan 10', jobs: 15 },
  { date: 'Jan 15', jobs: 25 },
  { date: 'Jan 20', jobs: 22 },
  { date: 'Jan 25', jobs: 30 },
  { date: 'Jan 30', jobs: 28 },
];

export const JobsChart: React.FC = () => {
  const maxJobs = Math.max(...mockData.map(d => d.jobs));
  const chartHeight = 200;
  const chartWidth = 600;
  const padding = 40;

  return (
    <div className="bg-[var(--color-card)] rounded-xl shadow-sm border border-[var(--color-border)] p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">Jobs Over Time</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">Last 30 days overview</p>
      </div>
      
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
              stroke="var(--color-border)"
              strokeWidth="1"
            />
          ))}
          
          {/* Data Line */}
          <polyline
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            points={mockData.map((data, index) => {
              const x = padding + (index * (chartWidth - 2 * padding)) / (mockData.length - 1);
              const y = padding + ((maxJobs - data.jobs) / maxJobs) * (chartHeight - 2 * padding);
              return `${x},${y}`;
            }).join(' ')}
          />
          
          {/* Data Points */}
          {mockData.map((data, index) => {
            const x = padding + (index * (chartWidth - 2 * padding)) / (mockData.length - 1);
            const y = padding + ((maxJobs - data.jobs) / maxJobs) * (chartHeight - 2 * padding);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="var(--color-primary)"
                className="hover:r-6 transition-all cursor-pointer"
              />
            );
          })}
          
          {/* X-axis Labels */}
          {mockData.map((data, index) => {
            const x = padding + (index * (chartWidth - 2 * padding)) / (mockData.length - 1);
            return (
              <text
                key={index}
                x={x}
                y={chartHeight - 10}
                textAnchor="middle"
                fontSize="12"
                fill="var(--color-text-secondary)"
              >
                {data.date}
              </text>
            );
          })}
          
          {/* Y-axis Labels */}
          {[0, 1, 2, 3, 4].map((i) => {
            const value = Math.round((maxJobs * (4 - i)) / 4);
            const y = padding + (i * (chartHeight - 2 * padding)) / 4;
            return (
              <text
                key={i}
                x={padding - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="var(--color-text-secondary)"
              >
                {value}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

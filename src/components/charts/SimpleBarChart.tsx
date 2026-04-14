import React from 'react';

interface SimpleBarChartProps {
  data: Array<{
    name: string;
    jobs?: number;
    rating?: number;
    revenue?: number;
  }>;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.jobs || 0));
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
        
        {/* Bars */}
        {data.map((item, index) => {
          const value = item.jobs || 0;
          const barWidth = 40;
          const barSpacing = 80;
          const x = padding + index * barSpacing + (barSpacing - barWidth) / 2;
          const barHeight = (value / maxValue) * (chartHeight - 2 * padding);
          const y = padding + (chartHeight - 2 * padding) - barHeight;

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="#3b82f6"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              <text
                x={x + barWidth / 2}
                y={chartHeight - 10}
                textAnchor="middle"
                fontSize="12"
                fill="#6b7280"
              >
                {item.name.split(' ')[0]}
              </text>
              <text
                x={x + barWidth / 2}
                y={y - 5}
                textAnchor="middle"
                fontSize="12"
                fill="#374151"
                fontWeight="bold"
              >
                {value}
              </text>
            </g>
          );
        })}
        
        {/* Y-axis Labels */}
        {[0, 1, 2, 3, 4].map((i) => {
          const value = Math.round((maxValue * (4 - i)) / 4);
          const y = padding + (i * (chartHeight - 2 * padding)) / 4;
          return (
            <text
              key={i}
              x={padding - 10}
              y={y + 4}
              textAnchor="end"
              fontSize="12"
              fill="#6b7280"
            >
              {value}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

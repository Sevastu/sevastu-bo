import React from 'react';

interface SimplePieChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const SimplePieChart: React.FC<SimplePieChartProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const centerX = 150;
  const centerY = 150;
  const radius = 100;
  
  let currentAngle = -90; // Start from top

  const createPieSlice = (startAngle: number, endAngle: number, color: string) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);
    
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="flex items-center justify-center">
      <svg width={300} height={300} viewBox="0 0 300 300">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const angle = (percentage / 100) * 360;
          const endAngle = currentAngle + angle;
          
          const pathData = createPieSlice(currentAngle, endAngle, item.color);
          currentAngle = endAngle;
          
          return (
            <g key={index}>
              <path
                d={pathData}
                fill={item.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            </g>
          );
        })}
        
        {/* Legend */}
        {data.map((item, index) => (
          <g key={`legend-${index}`}>
            <rect
              x={20}
              y={250 + index * 20}
              width={12}
              height={12}
              fill={item.color}
            />
            <text
              x={38}
              y={259 + index * 20}
              fontSize="12"
              fill="#374151"
            >
              {item.name} ({item.value})
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

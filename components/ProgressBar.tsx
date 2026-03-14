
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-medium mb-1">
        <span className="text-gray-900">${current.toLocaleString()}</span>
        <span className="text-gray-500">${total.toLocaleString()}</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-500 transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

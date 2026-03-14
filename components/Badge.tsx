
import React from 'react';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'info' | 'default';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default' }) => {
  const styles = {
    success: 'bg-green-50 text-green-700',
    info: 'bg-blue-50 text-blue-700',
    default: 'bg-gray-50 text-gray-700',
  };

  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${styles[variant]}`}>
      {label}
    </span>
  );
};


import React from 'react';
import { COLORS } from '../constants';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  // Added disabled prop to the interface to resolve errors in pages/WriteEditor.tsx, Onboarding.tsx, and ProductDetail.tsx
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  // Destructure disabled prop with a default value of false
  disabled = false
}) => {
  // Added Tailwind CSS 'disabled' variants to handle the disabled visual state and behavior
  const baseStyles = "px-6 py-2.5 rounded-xl font-medium transition-all active:scale-[0.98] duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  
  const variants = {
    primary: `bg-[#1D63D2] text-white hover:bg-blue-700`,
    secondary: `bg-white text-[#111827] border border-gray-200 hover:bg-gray-50`,
    ghost: `bg-transparent text-[#6B7280] hover:text-[#111827] hover:bg-gray-50`,
  };

  return (
    <button 
      // Apply the disabled prop to the native HTML button element
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

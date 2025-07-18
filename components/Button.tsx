
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success';
}

export const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
  const baseClasses = "flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg";

  const variantClasses = {
    primary: 'bg-cyan-600 hover:bg-cyan-500 focus:ring-cyan-500',
    secondary: 'bg-gray-700 hover:bg-gray-600 focus:ring-gray-500',
    success: 'bg-green-600 hover:bg-green-500 focus:ring-green-500',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

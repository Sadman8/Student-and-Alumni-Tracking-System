import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, fullWidth = false, className = '', ...props }, ref) => {
    const baseInputStyles = `
      block rounded-md border border-gray-300 shadow-sm
      focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-2 
      disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500
      transition duration-150 ease-in-out
    `;
    
    const leftIconStyles = leftIcon ? 'pl-10' : 'pl-4';
    const rightIconStyles = rightIcon ? 'pr-10' : 'pr-4';
    const errorStyles = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '';
    const widthStyles = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`${widthStyles}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={props.id}>
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`${baseInputStyles} ${leftIconStyles} ${rightIconStyles} ${errorStyles} py-2 text-sm ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
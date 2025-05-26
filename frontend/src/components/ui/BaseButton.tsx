import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};
const BaseButton: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  const baseClasses =
    'w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition transform hover:scale-105 rounded-full py-3 font-semibold drop-shadow-[0_0_8px_cyan] text-white';
  return (
    <button {...props} className={`${baseClasses} ${className}`.trim()}>
      {children}
    </button>
  );
};
export default BaseButton;

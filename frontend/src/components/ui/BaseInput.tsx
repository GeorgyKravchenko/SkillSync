type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const BaseInput: React.FC<BaseInputProps> = ({ className = '', ...props }) => {
  const baseClasses =
    'w-full px-5 py-3 rounded-full bg-gray-100 border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-900 placeholder-cyan-600 transition dark:bg-gray-800 dark:border-cyan-600 dark:focus:ring-cyan-600 dark:text-white dark:placeholder-cyan-400';

  return <input {...props} className={`${baseClasses} ${className}`.trim()} />;
};

export default BaseInput;

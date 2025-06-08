import { ChangeEvent } from 'react';
import Image from 'next/image';
type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchInput({ value, onChange, placeholder = 'Пошук...' }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mt-8">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-xl border border-cyan-300 dark:border-cyan-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
      />
      <Image
        src="/search.svg"
        alt="Search"
        width={20}
        height={20}
        className="absolute top-3 left-3"
      />
    </div>
  );
}

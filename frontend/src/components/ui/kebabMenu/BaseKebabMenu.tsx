'use client';
import { useEffect, useRef, useState, ReactNode } from 'react';

type MenuButton = {
  label: string;
  onClick: () => void;
  className?: string;
  icon?: ReactNode;
};

type KebabMenuProps = {
  buttons: MenuButton[];
  buttonClassName?: string;
  ariaLabel?: string;
};

const BaseKebabMenu = ({
  buttons,
  buttonClassName = '',
  ariaLabel = 'Меню дій',
}: KebabMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="relative flex-shrink-0">
      <button
        ref={buttonRef}
        onClick={() => setMenuOpen(!menuOpen)}
        className={`w-6 h-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full flex items-center justify-center ${buttonClassName}`}
        aria-label={ariaLabel}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="6" r="1.5"></circle>
          <circle cx="12" cy="12" r="1.5"></circle>
          <circle cx="12" cy="18" r="1.5"></circle>
        </svg>
      </button>

      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10"
        >
          {buttons.map(({ label, onClick, className = '', icon }, index) => (
            <button
              key={index}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2 ${className}`}
              onClick={() => {
                setMenuOpen(false);
                onClick();
              }}
            >
              {icon && <span className="flex-shrink-0">{icon}</span>}
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BaseKebabMenu;

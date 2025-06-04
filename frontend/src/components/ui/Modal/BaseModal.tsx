import React, { ReactNode, useEffect } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
};

const BaseModal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-6 pb-4 mx-4">
        {title && (
          <h2
            id="modal-title"
            className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100"
          >
            {title}
          </h2>
        )}

        <div className="mb-4">{children}</div>

        {footer && <div className="flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
};

export default BaseModal;

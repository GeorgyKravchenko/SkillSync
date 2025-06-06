'use client';

import { useRef, useState } from 'react';
import BaseModal from './BaseModal';
import formatBytes from '@/utils/formatBytes';

interface DownloadAvatarProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (file: File) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const DownloadAvatar = ({ isOpen, onClose, onConfirm }: DownloadAvatarProps) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const isFileTooLarge = !!file && file.size > MAX_FILE_SIZE;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Завантажити аватар"
      footer={
        <div className="flex justify-end gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Скасувати
          </button>
          <button
            type="button"
            className="rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 disabled:opacity-40 transition"
            onClick={() => file && onConfirm(file)}
            disabled={!file || isFileTooLarge}
          >
            Завантажити
          </button>
        </div>
      }
    >
      <div className="p-4 sm:p-6">
        <div
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center bg-gray-50 dark:bg-gray-800/50 transition"
          onClick={triggerFileInput}
        >
          <input
            ref={fileInputRef}
            type="file"
            name="avatar"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
          <svg
            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 32m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-2 text-sm text-cyan-600 hover:text-cyan-500 cursor-pointer">
            Виберіть файл
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">JPG, PNG, GIF до 5MB</p>
        </div>

        {file && (
          <div
            className={`relative mt-4 p-4 rounded-lg border transition-all duration-200 ${
              isFileTooLarge
                ? 'border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                : 'border-cyan-200 bg-cyan-50 dark:border-cyan-700 dark:bg-cyan-900/20'
            }`}
          >
            <button
              onClick={() => setFile(null)}
              type="button"
              aria-label="Очистити вибраний файл"
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Вибраний файл:</span>{' '}
              <span className="font-medium">{file.name}</span>
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Розмір: <span className="font-semibold">{formatBytes(file.size)}</span>
            </p>
            {isFileTooLarge && (
              <p className="mt-2 text-xs text-red-600 dark:text-red-400 font-medium">
                Файл перевищує допустимий розмір (максимум 5MB)
              </p>
            )}
          </div>
        )}
      </div>
    </BaseModal>
  );
};

export default DownloadAvatar;

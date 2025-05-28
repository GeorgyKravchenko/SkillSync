'use client';

import BaseButton from '@/components/ui/BaseButton';
import useGetProfile from '@/hooks/profile/useGetProfile';
import useUpdateProfile from '@/hooks/profile/useUpdateProfile';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type ProfileFormData = {
  name: string;
  description: string;
};
export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>();
  const { data, isSuccess, refetch } = useGetProfile();
  const { mutate, isSuccess: isSuccessUpdate } = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isSuccess) return;
    console.log('Profile data:', data);
  }, [isSuccess, data]);
  useEffect(() => {
    if (isSuccessUpdate) {
      setIsEditing(false);
      refetch();
    }
  }, [isSuccessUpdate, refetch]);
  const handleUpdateProfile = (data: { name: string; description: string }) => {
    mutate(data);
  };

  return (
    <div className="pt-24 min-h-screen transition-colors duration-500 bg-gradient-to-br from-cyan-100 to-blue-300 dark:from-cyan-900 dark:to-blue-900 text-gray-900 dark:text-white p-6 md:p-10 flex flex-col items-center font-sans">
      <div className="mt-12 w-full max-w-4xl bg-white dark:bg-gray-900 border border-cyan-400 dark:border-cyan-600 rounded-2xl shadow-lg shadow-cyan-700/30 dark:shadow-cyan-700/70 p-8 space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 drop-shadow-[0_0_10px_cyan]">Мій профіль</h1>
          <p className="text-cyan-700 dark:text-cyan-300 text-sm">
            Керування особистою інформацією та налаштуваннями
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-cyan-200 dark:bg-cyan-800 flex items-center justify-center text-3xl">
            👤
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit(handleUpdateProfile)} className="w-full">
              <div className="flex flex-col w-full max-w-lg">
                <div className="flex items-center gap-2 mb-4">
                  <input
                    {...register('name', { required: true, maxLength: 40, minLength: 3 })}
                    type="text"
                    defaultValue={data?.name || ''}
                    placeholder="Ім’я користувача"
                    className="flex-grow px-2 py-1 border border-cyan-400 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 max-w-md"
                  />
                  <button
                    aria-label="Скасувати редагування"
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
                    onClick={() => setIsEditing(false)}
                  >
                    ✕
                  </button>
                </div>
                {errors.name && (
                  <span className="text-red-500 mb-2">
                    {errors.name.type === 'required' && 'Ім’я користувача обов’язкове'}
                    {errors.name.type === 'maxLength' && 'Максимальна довжина - 40 символів'}
                    {errors.name.type === 'minLength' && 'Мінімальна довжина - 3 символи'}
                  </span>
                )}

                <textarea
                  {...register('description', { maxLength: 400 })}
                  defaultValue={data?.description || ''}
                  placeholder="Короткий опис про користувача, його інтереси або статус."
                  rows={3}
                  className="w-full px-2 py-1 border border-cyan-400 rounded-md resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 max-w-md"
                />
                {errors.description && (
                  <span className="text-red-500 mt-2">
                    {errors.description.type === 'maxLength' &&
                      'Максимальна довжина - 400 символів'}
                  </span>
                )}
                <div className="mt-4 flex gap-4">
                  <button
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md transition"
                    onClick={() => handleUpdateProfile({ name: '', description: '' })} // Replace with actual values
                  >
                    Зберегти
                  </button>
                  <button
                    className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md transition"
                    type="submit"
                  >
                    Відмінити
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold">{data?.name || 'Ім’я користувача'}</h2>
                <button
                  aria-label="Редагувати профіль"
                  className="text-cyan-600 dark:text-cyan-300 hover:text-cyan-400 dark:hover:text-cyan-500 transition"
                  onClick={() => setIsEditing(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536M9 13.5V16h2.5l7.232-7.232-2.5-2.5L9 13.5z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-1 max-w-lg">
                {data?.description || 'Короткий опис про користувача, його інтереси або статус.'}
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-cyan-300 dark:border-cyan-700 pt-6">
          <h3 className="text-lg font-semibold text-red-500 mb-2">Небезпечна зона</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Видалення акаунту є незворотним. Всі ваші дані будуть втрачені.
          </p>
          <BaseButton className="bg-red-500 hover:bg-red-600 text-white border-red-600">
            Видалити акаунт
          </BaseButton>
        </div>
      </div>
    </div>
  );
}

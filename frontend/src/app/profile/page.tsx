'use client';

import BaseButton from '@/components/ui/BaseButton';
import BaseInput from '@/components/ui/BaseInput';
import useGetProfile from '@/hooks/useProfile';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { data, isSuccess } = useGetProfile();
  useEffect(() => {
    if (!isSuccess) return;
    console.log('Profile data:', data);
  }, [isSuccess, data]);
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
          <div>
            <h2 className="text-2xl font-semibold">{data?.name && data.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{data?.email && data.email}</p>
          </div>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <BaseInput type="text" placeholder="Ім'я користувача" />
          <BaseInput type="email" placeholder="Email" />
          <BaseInput type="password" placeholder="Новий пароль" />
          <BaseInput type="password" placeholder="Підтвердіть пароль" />
          <div className="sm:col-span-2">
            <BaseButton className="w-full">Зберегти зміни</BaseButton>
          </div>
        </form>

        {/* ДDanger zone */}
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

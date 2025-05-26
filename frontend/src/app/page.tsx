'use client';

import BaseButton from '@/components/ui/BaseButton';
import BaseInput from '@/components/ui/BaseInput';

export default function FuturisticThemePage() {
  return (
    <div className="pt-24 min-h-screen transition-colors duration-500 bg-gradient-to-br from-cyan-100 to-blue-300 dark:from-cyan-900 dark:to-blue-900 text-gray-900 dark:text-white p-10 flex flex-col items-center justify-center font-sans relative">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-wide drop-shadow-[0_0_10px_cyan]">
          SkillsSync
        </h1>
        <p className="text-cyan-700 dark:text-cyan-300 text-lg max-w-xl mx-auto">
          Платформа для розвитку навичок і синхронізації з колегами у реальному часі.
        </p>
      </header>

      <main className="w-full max-w-3xl rounded-xl border border-cyan-400 dark:border-cyan-600 p-8 shadow-lg shadow-cyan-700/30 dark:shadow-cyan-700/80 bg-white dark:bg-gray-900">
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Увійти в акаунт</h2>
          <BaseInput type="email" placeholder="Ваш email" className="mb-4" />
          <BaseInput type="password" placeholder="Пароль" className="mb-6" />
          <BaseButton>Увійти</BaseButton>
        </section>
        <section>
          <h2 className="text-3xl font-semibold mb-4">Реєстрація</h2>
          <BaseInput type="text" placeholder="Ім'я користувача" className="mb-4" />
          <BaseInput type="email" placeholder="Email" className="mb-4" />
          <BaseInput type="password" placeholder="Пароль" className="mb-6" />
          <BaseButton>Зареєструватися</BaseButton>
        </section>
      </main>
    </div>
  );
}

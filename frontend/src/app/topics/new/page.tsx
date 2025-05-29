'use client';

import BaseButton from '@/components/ui/BaseButton';
import useCreatePost from '@/hooks/post/useCreatePost';
import useTopic from '@/hooks/topic/useTopic';
import { IPostCreateDto } from '@/types/post.types';
import { useForm } from 'react-hook-form';

export default function NewPostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostCreateDto>();
  const { mutate } = useCreatePost();
  const { data: topics } = useTopic();
  const onSubmit = (data: IPostCreateDto) => mutate(data);
  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white p-4 sm:p-8 font-sans">
      <div className="max-w-2xl mx-auto pt-16 sm:pt-20">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-cyan-800 dark:text-cyan-300">
            Створити публікацію
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Заповніть форму нижче, щоб додати нову статтю
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Тема
            </label>
            <select
              {...register('topicId', { required: true })}
              defaultValue=""
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
            >
              <option disabled value="">
                Оберіть тему
              </option>
              {topics &&
                topics.map((topic) => (
                  <option key={topic.slug} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Заголовок
            </label>
            <input
              {...register('title', { required: true })}
              type="text"
              placeholder="Введіть заголовок"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
            />
            {errors.title && <span className="text-red-500">{`Це поле є обов'язковим`}</span>}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Контент
            </label>
            <textarea
              {...register('content', { required: true })}
              rows={6}
              placeholder="Напишіть текст публікації..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition resize-none"
            ></textarea>
          </div>

          <BaseButton type="submit" className="w-full py-3 text-md font-medium">
            Опублікувати
          </BaseButton>
        </form>
      </div>
    </main>
  );
}

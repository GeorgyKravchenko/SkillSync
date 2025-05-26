// app/auth/layout.tsx

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-24 min-h-screen transition-colors duration-500 bg-gradient-to-br from-cyan-100 to-blue-300 dark:from-cyan-900 dark:to-blue-900 text-gray-900 dark:text-white p-10 flex flex-col items-center justify-center font-sans relative">
      <main className="w-full max-w-3xl rounded-xl border border-cyan-400 dark:border-cyan-600 p-8 shadow-lg shadow-cyan-700/30 dark:shadow-cyan-700/80 bg-white dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;

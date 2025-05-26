// components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full text-center py-4 text-sm text-cyan-700 dark:text-cyan-300 border-t border-cyan-300 dark:border-cyan-700 bg-gradient-to-r from-cyan-100 to-blue-200 dark:from-cyan-950 dark:to-blue-950">
      © {new Date().getFullYear()} SkillsSync. Всі права захищені.
    </footer>
  );
}

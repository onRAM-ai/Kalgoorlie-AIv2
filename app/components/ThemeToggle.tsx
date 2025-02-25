'use client';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full p-1 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{
        backgroundColor: theme === 'light' ? '#42D4B3' : '#42D4B3'
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-white flex items-center justify-center"
        animate={{
          x: theme === 'light' ? 0 : 28
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 30 }}
      >
        {theme === 'light' ? (
          <i className="fas fa-sun text-[#42D4B3] text-xs" />
        ) : (
          <i className="fas fa-moon text-[#42D4B3] text-xs" />
        )}
      </motion.div>
    </button>
  );
}
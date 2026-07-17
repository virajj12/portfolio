"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder to avoid layout shift
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-foreground overflow-hidden"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{
          y: theme === "dark" ? -30 : 0,
          opacity: theme === "dark" ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun size={18} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          y: theme === "dark" ? 0 : 30,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon size={18} />
      </motion.div>
    </button>
  );
}

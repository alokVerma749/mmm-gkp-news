"use client"

import { useThemeContext } from "@/app/context/ThemeContext"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-pointer"
    >
      {theme === "dark" ? <Moon className="h-5 w-5 text-zinc-400" /> : <Sun className="h-5 w-5 text-amber-500" />}
    </button>
  )
}

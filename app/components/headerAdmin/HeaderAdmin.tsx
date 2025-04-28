"use client"

import { useState, useEffect, useRef, type ChangeEvent } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu, X, Bell, User, Settings, LogOut, ChevronDown, Sun, Moon, Thermometer } from 'lucide-react'
import { getCurrentWeather } from "@/app/services/external/weather"
import getArticlesSuggestionsAction from "@/app/Actions/article-suggestions/getArticleSuggestionsAction"
import { Loader } from "../spinner"

// Custom hook for debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function HeaderAdmin() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [suggestions, setSuggestions] = useState<{ _id: string; title: string }[]>([])
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(null)
  const [weatherLoading, setWeatherLoading] = useState<boolean>(true)
  const [weatherError, setWeatherError] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  const pathname = usePathname()
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Navigation items
  const navItems = [
    { name: "Dashboard", path: "/admin", icon: "dashboard" },
    { name: "Articles", path: "/admin/articles", icon: "articles" },
    { name: "Editor", path: "/admin/editor", icon: "editor" },
    { name: "Complaints", path: "/admin/complaints", icon: "complaints" },
    { name: "Contacts", path: "/admin/contacts", icon: "contacts" },
    { name: "Surveys", path: "/admin/surveys", icon: "surveys" },
  ]

  // Fetch article suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedSearchTerm) {
        setSuggestions([])
        return
      }

      try {
        const response = JSON.parse(
          await getArticlesSuggestionsAction({ search: debouncedSearchTerm })
        )

        if (!response) {
          console.error("Invalid response")
          return
        }

        setSuggestions(response)
      } catch (error) {
        console.error("Error fetching suggestions:", error)
        setSuggestions([])
      }
    }

    fetchSuggestions()
  }, [debouncedSearchTerm])

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      setWeatherLoading(true)
      try {
        const temperature = await getCurrentWeather()
        setCurrentTemperature(temperature)
      } catch (err) {
        setWeatherError("Error fetching weather data")
        console.error("Error fetching weather data:", err)
      } finally {
        setWeatherLoading(false)
      }
    }

    fetchWeather()
  }, [])

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node) && suggestions.length > 0) {
        setSuggestions([])
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [suggestions.length])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden mr-4 p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            <Link href="/admin" className="flex items-center">
              <span className="text-xl font-bold text-gray-800 dark:text-white">MMMUT</span>
              <span className="ml-1 text-xl font-bold text-blue-600 dark:text-blue-400">Admin</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path || 
                (item.path !== "/admin" && pathname.startsWith(item.path))
              
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Right Side - Search, Weather, User Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={handleInputChange}
                  className="w-full md:w-64 pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-800 dark:text-white"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto z-50">
                  <ul>
                    {suggestions.map(({ _id, title }) => (
                      <li key={_id} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <Link
                          href={`/admin/article/${_id}`}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Weather */}
            {typeof currentTemperature === "number" && (
              <div className="hidden md:flex items-center text-sm text-gray-600 dark:text-gray-300">
                {weatherLoading ? (
                  <Loader variant="small" />
                ) : weatherError ? (
                  <span className="text-red-500">Error</span>
                ) : (
                  <div className="flex items-center">
                    <Thermometer className="h-4 w-4 mr-1 text-blue-500" />
                    <span>{currentTemperature.toFixed(1)}°C</span>
                  </div>
                )}
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Notifications */}
            <button className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 focus:outline-none relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
                <span className="ml-2 hidden md:block">Admin User</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-50">
                  <Link
                    href="/admin/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Your Profile
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                  <div className="border-t border-gray-200 dark:border-gray-700"></div>
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path || 
              (item.path !== "/admin" && pathname.startsWith(item.path))
            
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

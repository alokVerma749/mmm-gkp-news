"use client"

import type React from "react"
import { useState, useEffect, type ChangeEvent } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import getArticlesSuggestionsAction from "@/app/Actions/article-suggestions/getArticleSuggestionsAction"
import { getCurrentWeather } from "@/app/services/external/weather"
import { Loader } from "../spinner"
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Newspaper,
  BookOpen,
  Home,
  GraduationCap,
  Building2,
  Users,
  CalendarDays,
  Briefcase,
  School,
  Award,
  Thermometer,
} from "lucide-react"

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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<{ _id: string; title: string }[]>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(null)
  const [weatherLoading, setWeatherLoading] = useState<boolean>(true)
  const [weatherError, setWeatherError] = useState<string | null>(null)
  const pathname = usePathname()

  // Use debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  // Fetch article suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedSearchTerm) {
        setSuggestions([])
        return
      }

      try {
        const response = JSON.parse(await getArticlesSuggestionsAction({ search: debouncedSearchTerm }))

        // Check if the response is valid
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchTerm)
    // You could redirect to search results page
    // router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  const tags: string[] = [
    "Department",
    "Hostel",
    "Library",
    "Events",
    "Placements",
    "College Life",
    "Alumni",
    "Admissions",
    "Scholarships",
  ]

  const categoryIcons: { [key: string]: React.ReactNode } = {
    Department: <Building2 className="w-4 h-4 mr-2" />,
    Hostel: <Home className="w-4 h-4 mr-2" />,
    Library: <BookOpen className="w-4 h-4 mr-2" />,
    Events: <CalendarDays className="w-4 h-4 mr-2" />,
    Placements: <Briefcase className="w-4 h-4 mr-2" />,
    "College Life": <GraduationCap className="w-4 h-4 mr-2" />,
    Alumni: <Users className="w-4 h-4 mr-2" />,
    Admissions: <School className="w-4 h-4 mr-2" />,
    Scholarships: <Award className="w-4 h-4 mr-2" />,
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-8 w-8 mr-2">
                <Newspaper className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">MMMUT News</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center transition-colors">
                Categories
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>

              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className="py-1 grid grid-cols-1 gap-0.5">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/${tag.toLowerCase().replace(" ", "_")}`}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {categoryIcons[tag]}
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/trending"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/trending"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Trending
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/about"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              About
            </Link>

            {/* Weather Display */}
            {typeof currentTemperature === "number" && (
              <div className="px-3 py-2 flex items-center text-sm text-gray-700 dark:text-gray-300">
                {weatherLoading ? (
                  <Loader variant="small" />
                ) : weatherError ? (
                  "Error"
                ) : (
                  <div className="flex items-center">
                    <Thermometer className="w-4 h-4 mr-1 text-blue-500" />
                    <span>{currentTemperature.toFixed(1)}°C</span>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={handleInputChange}
                className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto z-50">
                  <ul>
                    {suggestions.map(({ _id, title }) => (
                      <li key={_id} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <Link
                          href={`/article/${_id}`}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-3 px-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                autoFocus
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />

              {/* Mobile Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto z-50">
                  <ul>
                    {suggestions.map(({ _id, title }) => (
                      <li key={_id} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <Link
                          href={`/article/${_id}`}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Home
            </Link>

            {/* Categories in Mobile Menu */}
            <div className="px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300">Categories</div>
            <div className="pl-6 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 ml-3">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/${tag.toLowerCase().replace(" ", "_")}`}
                  className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {categoryIcons[tag]}
                  {tag}
                </Link>
              ))}
            </div>

            <Link
              href="/trending"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/trending"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Trending
            </Link>

            <Link
              href="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/about"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              About
            </Link>

            {/* Weather in mobile menu */}
            {typeof currentTemperature === "number" && (
              <div className="px-3 py-2 flex items-center text-sm text-gray-700 dark:text-gray-300">
                {weatherLoading ? (
                  <Loader variant="small" />
                ) : weatherError ? (
                  "Error loading weather"
                ) : (
                  <div className="flex items-center">
                    <Thermometer className="w-4 h-4 mr-1 text-blue-500" />
                    <span>{currentTemperature.toFixed(1)}°C</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

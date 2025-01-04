"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import { getCurrentWeather } from "@/app/services/external/weather";
import getArticlesSuggestionsAction from "@/app/Actions/article-suggestions/getArticleSuggestionsAction";
import { Loader } from "../spinner";

// Custom hook for debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    { _id: string; title: string }[]
  >([]);
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(
    null
  );
  const [weatherLoading, setWeatherLoading] = useState<boolean>(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

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
  ];

  const activePath = usePathname();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fetch article suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedSearchTerm) {
        setSuggestions([]);
        return;
      }

      try {
        const response = JSON.parse(
          await getArticlesSuggestionsAction({ search: debouncedSearchTerm })
        );

        // Check if the response is valid JSON
        if (!response) {
          console.error("Invalid response");
          return;
        }

        setSuggestions(response);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchTerm]);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      setWeatherLoading(true);
      try {
        const temperature = await getCurrentWeather();
        setCurrentTemperature(temperature);
      } catch (err) {
        setWeatherError("Error fetching weather data");
        console.error("Error fetching weather data:", err);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const [sidebar, setSidebar] = useState(false);
  const handleSidebarToggle = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="flex flex-col w-full lg:px-0 lg:w-3/4 mx-auto lg:gap-10">
      {/* Header Section */}
      <div className="flex flex-col w-full lg:flex lg:flex-row gap-6 lg:gap-6 items-center lg:justify-between lg:items-center py-6 lg:py-10 relative">
        <Link
          href="/"
          className="text-white text-3xl md:text-3xl lg:text-4xl font-thin"
        >
          MMMUT
        </Link>
        <div className="relative flex w-full lg:justify-end">
          <input
            type="text"
            placeholder="Search for headlines"
            className="bg-[#04594D] py-[0.5] px-2 lg:py-1 mx-8 lg:px-6 w-full lg:w-[35vw] text-white outline-none focus:ring-0 focus:border-transparent text-sm lg:text-lg"
            value={searchTerm}
            onChange={handleInputChange}
          />
          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="bg-white absolute rounded-md mt-2 shadow-lg w-[35vw] max-h-40 overflow-y-auto z-10">
              <ul>
                {suggestions.map(({ _id, title }) => (
                  <li key={_id} className="p-2 hover:bg-gray-200">
                    <Link href={`/article/${_id}`} className="block">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Section */}
      <div className="h-0 lg:h-auto">
        <ul className="h-0 lg:h-auto hidden lg:visible lg:flex justify-between items-center bg-[#1f1f1f] text-white text-base">
          {tags.map((tag) => {
            const tagPath = `/${tag.toLowerCase().replace(" ", "_")}`;
            const isActive = activePath === tagPath;
            return (
              <li key={tag} className="h-0 lg:h-auto p-2">
                <Link
                  href={tagPath}
                  className={`${isActive
                      ? "bg-[#04594D] h-full p-2 font-extralight"
                      : "text-white"
                    }`}
                >
                  {tag}
                </Link>
              </li>
            );
          })}
          {typeof currentTemperature === "number" && (
            <li className="px-4 py-2">
              {weatherLoading ? (
                <Loader variant="small" />
              ) : weatherError ? (
                "Error"
              ) : (
                <span>Current Temperature: {currentTemperature?.toFixed(1)}°C</span>
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;

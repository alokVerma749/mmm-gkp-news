"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import { getCurrentWeather } from "@/app/services/external/weather";
import getArticlesSuggestionsAction from "@/app/Actions/article-suggestions/getArticleSuggestionsAction";

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
  const [suggestions, setSuggestions] = useState<{ _id: string; title: string }[]>([]);
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(null);
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
        const response = JSON.parse(await getArticlesSuggestionsAction({ search: debouncedSearchTerm }));

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

  return (
    <div className="flex flex-col w-3/4 mx-auto gap-10">
      {/* Header Section */}
      <div className="flex justify-between items-center py-10 relative">
        <Link href="/" className="text-white text-4xl font-thin">
          MMMUT
        </Link>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for headlines"
            className="bg-[#04594D] py-1 px-6 w-[35vw] text-white outline-none focus:ring-0 focus:border-transparent"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className="bg-[#8E4042] text-white px-4 py-1 outline-none">
            SEARCH
          </button>

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
      <div>
        <ul className="flex justify-between items-center bg-[#1f1f1f] text-white text-base">
          {tags.map((tag) => {
            const tagPath = `/${tag.toLowerCase().replace(" ", "_")}`;
            const isActive = activePath === tagPath;
            return (
              <li key={tag} className="h-full p-2">
                <Link
                  href={tagPath}
                  className={`${isActive ? "bg-[#04594D] h-full p-2 font-extralight" : "text-white"
                    }`}
                >
                  {tag}
                </Link>
              </li>
            );
          })}
          {typeof currentTemperature === "number" && (
            <li className="px-4 py-2">
              Current Temperature: {currentTemperature.toFixed(1)}°C
            </li>
          )}
        </ul>
      </div>

      {/* Weather Loading/Error */}
      {weatherLoading && <div className="text-white">Loading weather...</div>}
      {weatherError && <div className="text-red-500">{weatherError}</div>}
    </div>
  );
};

export default Header;

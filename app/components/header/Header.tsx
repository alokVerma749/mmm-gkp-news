"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import { getCurrentWeather } from "@/app/services/external/weather";
import getArticlesSuggestionsAction from "@/app/Actions/article-suggestions/getArticleSuggestionsAction";
import { Loader } from "../spinner";
import HeaderAdmin from "../headerAdmin/HeaderAdmin";

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
  const [sidebar, setSidebar] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

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

  // Determine if the route is admin
  useEffect(() => {
    setIsAdminRoute(activePath.startsWith("/admin"));
  }, [activePath]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSidebarToggle = () => {
    setSidebar(!sidebar);
  };

  if (isAdminRoute) {
    return <HeaderAdmin />;
  }

  return (
    <div className="flex flex-col w-full lg:px-0 lg:w-3/4 mx-auto lg:gap-10 relative">
      {/* Header Section */}
      <div className="flex w-full flex-col gap-10 lg:gap-0 items-center justify-between lg:flex-row lg:justify-between py-6 lg:py-10 relative">
        <Link href="/" className="text-gray-200 text-4xl md:text-3xl lg:text-4xl font-thin" >MMMUT</Link>

        <div className="relative flex-grow lg:flex-grow-0 w-full lg:w-auto lg:ml-auto px-2 lg:px-0">
          <input
            type="text"
            placeholder="Search for headlines"
            className="bg-[#04594D] py-1 px-2 lg:py-1 lg:px-6 w-full lg:w-[35vw] text-white outline-none focus:ring-0 focus:border-transparent text-sm lg:text-lg rounded-md lg:rounded-none"
            value={searchTerm}
            onChange={handleInputChange}
          />

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="bg-white absolute left-0 lg:left-auto lg:right-0 rounded-md mt-2 shadow-lg w-full lg:w-[35vw] max-h-40 overflow-y-auto z-50">
              <ul>
                {suggestions.map(({ _id, title }) => (
                  <li
                    key={_id}
                    className="px-2 py-1 text-sm lg:text-base lg:p-2 hover:bg-gray-200"
                  >
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
                <Link href={tagPath} className={`${isActive ? "bg-[#04594D] h-full p-2 font-extralight" : "text-white"}`}>
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
                <span>
                  Current Temperature: {currentTemperature?.toFixed(1)}°C
                </span>
              )}
            </li>
          )}
        </ul>
      </div>

      {/* Sidebar icon for mobile device */}
      <div
        className="text-white text-center lg:hidden flex items-center justify-center h-auto pb-2"
        onClick={handleSidebarToggle}
      >
        {sidebar ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className="h-4"
          >
            <path
              fill="#ffffff"
              d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="h-4"
          >
            <path
              fill="#fbfefe"
              d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
            />
          </svg>
        )}
      </div>

      {/*Sidebar for mobile device*/}
      <div className={`lg:hidden overflow-hidden transition-all duration-700 w-full ${sidebar ? "max-h-screen" : "max-h-0"}`}>
        <ul className="flex flex-col lg:flex-row justify-between items-start bg-[#1A1A1A] text-white w-full pt-0 p-2">
          {tags.map((tag) => {
            const tagPath = `/${tag.toLowerCase().replace(" ", "_")}`;
            const isActive = activePath === tagPath;
            return (
              <li key={tag} className="w-full">
                <Link
                  href={tagPath}
                  className={`py-1 px-2 block text-base ${isActive ? "bg-[#04594D]" : "text-white"
                    }`}
                >
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="lg:hidden absolute top-2 right-0">
        {typeof currentTemperature === "number" && (
          <li className="px-4 py-2 text-white list-none text-sm">
            {currentTemperature.toFixed(1)}°C
          </li>
        )}
      </div>
    </div>
  );
};

export default Header;

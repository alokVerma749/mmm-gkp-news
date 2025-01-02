'use client';

import { getCurrentWeather } from "@/app/services/external/weather";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";

// Debounce utility with TypeScript types
function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timer: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  }) as T;
}

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [temperature, setTemperature] = useState<number | never[]>();
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

  // Mock API or suggestion source
  const getSuggestions = (query: string): string[] => {
    if (!query) return [];
    return tags.filter((tag) =>
      tag.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Debounced function
  const handleSearch = debounce((query: string) => {
    const results = getSuggestions(query);
    setSuggestions(results);
  }, 300);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Fetch the current temperature
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const temp = await getCurrentWeather();
        setTemperature(temp);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="flex flex-col w-3/4 mx-auto">
      <div className="flex justify-between items-center py-8">
        <Link href="/" className="text-white text-4xl font-thin">
          MMMUT
        </Link>
        <div>
          <input
            type="text"
            placeholder="search for headlines"
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
                {suggestions.map((suggestion) => (
                  <li key={suggestion}>
                    <Link href={`/${suggestion.toLowerCase().replace(" ", "_")}`}>
                      <a className="block px-4 py-2 hover:bg-gray-200">{suggestion}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#1A1A1A]">
        <ul className="flex justify-between items-center text-white text-base h-full">
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
          {typeof temperature === "number" && (
            <li className="px-4 py-2">
              Current Temperature: {temperature.toFixed(1)}°C
            </li>
          )}

        </ul>
      </div>
    </div>
  );
};

export default Header;

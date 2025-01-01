'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const tags = [
    'Department',
    'Hostel',
    'Library',
    'Events',
    'Placements',
    'College Life',
    'Alumni',
    'Admissions',
    'Scholarships',
  ];

  const activePath = usePathname()

  return (
    <div className="flex flex-col w-3/4 mx-auto">
      <div className="flex justify-between items-center py-8">
        <Link href='/' className="text-white text-4xl font-thin">MMMUT</Link>
        <div>
          <input type="text" placeholder="search for headlines" className="bg-[#04594D] py-1 px-6 w-[35vw]"></input>
          <button className="bg-[#8E4042] text-white px-4 py-1 outline-none">SEARCH</button>
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
                  className={`${isActive ? "bg-[#04594D] h-full p-2 font-extralight" : "text-white"}`}
                >
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;

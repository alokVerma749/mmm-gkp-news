import Link from "next/link";

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

  return (
    <div className="flex flex-col w-3/4 mx-auto">
      <div className="flex justify-between items-center py-8">
        <Link href='/' className="text-white text-4xl font-thin">MMMGKP</Link>
        <div>
          <input type="text" placeholder="search for headlines" className="bg-[#04594D] py-1 px-6 w-[25vw]"></input>
          <button className="bg-[#8E4042] text-white px-4 py-1 outline-none">SEARCH</button>
        </div>
      </div>
      <div className="bg-[#1A1A1A] px-10 py-2">
        <ul className="flex justify-between items-center text-white text-base">
          {tags.map((tag) => (
            <li key={tag}>
              <Link href={`/${tag.toLowerCase().replace(" ", "_")}`}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;

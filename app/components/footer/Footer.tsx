import Link from "next/link";

const Footer = () => {
  const tags = [
    "Privacy Policy",
    "Terms of Service",
    "Copyright Policy",
    "Data Policy",
    "Help",
  ];

  return (
    <div className="w-full flex flex-col items-center lg:mx-auto lg:flex lg:flex-row lg:justify-between gap-4 py-6 lg:py-10 lg:gap-20 lg:h-full lg:w-3/4">
      <Link href="/" className="text-gray-300 text-2xl lg:text-4xl font-thin"> MMMUT </Link>
      <div className="text-gray-300">
        <ul className="px-4 lg:px-0 flex flex-wrap gap-4 items-center justify-center text-sm lg:text-xl lg:gap-4 font-normal">
          {tags.map((tag) => {
            const tagPath = `/${tag.toLowerCase().replace(" ", "_")}`;
            return <Link href={tagPath} className="text-base" key={tag}>{tag}</Link>
          })}
        </ul>
      </div>
    </div>
  );
};

export default Footer;

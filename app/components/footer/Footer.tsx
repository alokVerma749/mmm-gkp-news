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
    <div className="mx-auto flex  justify-between pt-10 gap-20 h-full w-3/4">
      <Link href='/' className="text-white text-4xl font-thin">MMMUT</Link>
      <div className="text-white font-normal">
        <ul className="flex flex-wrap gap-4">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;

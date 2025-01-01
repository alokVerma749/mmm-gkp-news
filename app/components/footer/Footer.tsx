import React from "react";

const Footer = () => {
  const tags = [
    "Privacy Policy",
    "Terms of Service",
    "Copyright Policy",
    "Data Policy",
    "Help",
  ];

  return (
    <div className="text-white w-3/4 mx-auto flex items-center justify-center pt-10 gap-20">
      <h1 className="text-white text-4xl font-thin">MMMGKP</h1>
      <div className="text-white font-normal">
        <ul className="flex gap-4">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <h3 className="text-white text-center">@ 2024 Newsletter, All rights reserved</h3>
      </div>
    </div>
  );
};

export default Footer;

"use client";

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/app/types/article";
import { ArrowBigUp } from "lucide-react";
import { useEffect, useState } from "react";

export const ArticleListCard = ({ article }: { article: Article }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check the screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile if width is less than 768px
    };
    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const defaultImage =
    "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = article.image || defaultImage;

  // Dynamic truncation based on screen size
  const truncatedContent = isMobile
    ? article.content.length > 30
      ? article.content.substring(0, 50) + "..." // Shorter for mobile
      : article.content
    : article.content.length > 30
    ? article.content.substring(0, 150) + "..." // Longer for larger screens
    : article.content;

  return (
    <Link href={`/article/${article._id}`}>
      <div className="h-full w-full flex sm:text-left md:p-4 relative min-h-28">
        <div className="bg-gray-300 h-[1.5px] absolute top-0 w-full lg:w-[98%] mx-auto"></div>
        <div className="flex h-full w-full items-center">
          <Image
            alt="team"
            className="flex-shrink-0 p-2 aspect-square lg:object-center lg:p-0 max-w-[20%] lg:max-w-[25%]"
            src={imageSrc}
            width={200}
            height={200}
          />

          <div className="flex-1 w-full lg:pl-6 pr-3 lg:pr-0 flex flex-col justify-center overflow-hidden items-start py-3 lg:py-4">
            <h2 className="title-font font-semibold text-sm lg:text-xl">
              {article.title}
            </h2>
            <h3 className="text-gray-700 lg:mb-3 text-sm lg:text-lg">
              {article.primary_tag}
            </h3>
            <p className="lg:mb-4 text-[#04594D] text-sm lg:text-base">
              {truncatedContent}
            </p>
            <span className="inline-flex">
              <div className="text-gray-500 flex flex-row justify-center items-center">
                <ArrowBigUp strokeWidth={1.75} />
                <p className="text-xs">{article.upvotes}</p>
              </div>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

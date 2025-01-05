import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/app/types/article";

export const TrendingCard = ({ article }: { article: Article }) => {
  const defaultImage =
    "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = article.image || defaultImage;
  const truncatedContent =
    article.content.length > 30
      ? article.content.substring(0, 30) + "..."
      : article.content;

  return (
    <Link href={`/article/${article._id}`}>
      <div className="h-full w-full items-center justify-between flex lg:gap-4 sm:flex-row sm:justify-start sm:text-left lg:p-2 relative min-h-28">
        <div className="w-full lg:w-[98%] lg:mx-auto h-[1.2px] lg:h-[2] bg-[#dbdbdb] absolute top-0"></div>

        <Image
          alt="team"
          className="flex-shrink-0 object-center h-full p-2 lg:p-0 max-w-[20%] lg:max-w-[25%]"
          src={imageSrc}
          width={150}
          height={150}
        />

        <div className="flex-grow w-2/3 pr-3 lg:pr-0">
          <h2 className="font-semibold text-sm lg:text-base text-gray-900">
            {article.title}
          </h2>
          <h3 className="text-gray-700 text-sm">{article.primary_tag}</h3>
          <p className="text-[#04594D] text-sm">{truncatedContent}</p>
        </div>
      </div>
    </Link>
  );
};

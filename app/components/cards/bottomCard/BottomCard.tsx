import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/app/types/article";

export const BottomCard = ({ article }: { article: Article }) => {
  const defaultImage =
    "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = article.image || defaultImage;
  const truncatedContent =
    article.content.length > 30
      ? article.content.substring(0, 80) + "..."
      : article.content;

  return (
    <Link href={`/article/${article._id}`}>
      <div className="h-full w-full items-center justify-between flex gap-4 sm:flex-row sm:justify-start sm:text-left py-6">
        <div className="h-full">
          <Image
            alt="team"
            className="flex-shrink-0 h-full w-full"
            src={imageSrc}
            width={150}
            height={150}
          />
        </div>
        <div className="w-[2.5] h-[80%] bg-[#dbdbdb]"></div>
        <div className="flex-grow sm:pl-8 lg:px-4">
          <h2 className="title-font font-bold text-lg text-gray-900">
            {article.title}
          </h2>
          <div className="h-[1.8] w-[90%] bg-[#dbdbdb] my-1"></div>

          <h3 className="text-gray-500 mb-3">{article.primary_tag}</h3>
          <p className="text-[#04594D] font-semibold">{truncatedContent}</p>
        </div>
      </div>
    </Link>
  );
};

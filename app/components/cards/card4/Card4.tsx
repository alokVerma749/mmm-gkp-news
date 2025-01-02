import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/app/types/article";

export const Card4 = ({ article }: { article: Article }) => {
  const defaultImage =
    "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = article.image || defaultImage;
  const truncatedContent =
    article.content.length > 30
      ? article.content.substring(0, 500) + "..."
      : article.content;

  return (
    <Link href={`/article/${article._id}`}>
      <div className="h-full w-full flex sm:flex-row sm:justify-start text-center sm:text-left p-4 pt-0 bg-[#1A1A1A] text-[#D5D5D5]">
        <div className="w-1/3 pt-2 pr-2 overflow-hidden">
          {/* <h2 className="title-font font-medium">{article.title}</h2> */}
          {/* <h3 className="text-gray-500 mb-3">{article.primary_tag}</h3> */}
          <p>{truncatedContent}</p>
        </div>
        <div className="w-2/3 relative">
          <Image
            alt="team"
            className="flex-shrink-0 h-full w-full"
            src={imageSrc}
            width={200}
            height={200}
          />
          <div className="absolute text-[#F7F7F4] font-semibold bottom-0 w-full h-full flex flex-col justify-end p-4 bg-gradient-to-t from-black">
          <h2 className="">{article.title}</h2>

          </div>
        </div>
      </div>
    </Link>
  );
};

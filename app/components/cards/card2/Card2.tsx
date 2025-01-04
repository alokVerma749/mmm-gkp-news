import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/app/types/article";
import { ArrowBigUp } from "lucide-react";

export const Card2 = ({ article }: { article: Article }) => {
  const defaultImage = "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = article.image || defaultImage;
  const truncatedContent = article.content.length > 30 ? article.content.substring(0, 50) + "..." : article.content;

  return (
    <Link href={`/article/${article._id}`} >
      <div className="grid grid-cols-[20%_80%] lg:grid-cols-1 lg:grid lg:grid-rows-[55%_40%] min-h-28 lg:min-h-[45dvh] sm:text-left relative">
        <div className="h-full w-full flex items-center">
          <Image
            alt="team"
            className="flex-shrink-0 lg:h-full lg:w-full aspect-square lg:aspect-auto p-2 lg:p-0"
            src={imageSrc}
            width={200}
            height={200}
          />
        </div>

        <div className="pr-3 lg:pr-4 lg:p-4 flex flex-col justify-center h-full bg-[#FDFDFD] overflow-hidden lg:items-start">
          <h2 className="font-semibold lg:font-bold text-sm lg:text-lg text-gray-900">
            {article.title}
          </h2>
          <h3 className="text-gray-500 lg:mb-3 text-xs">{article.primary_tag}</h3>
          <div className="w-full lg:h-[2] bg-[#dbdbdb] lg:mb-2"></div>
          <p className="lg:mb-4 text-xs lg:text-sm text-[#04594D] lg:font-semibold">{truncatedContent}</p>
          <span className="lg:inline-flex hidden">
            <div className="text-gray-500 flex flex-row justify-center items-center">
              <ArrowBigUp strokeWidth={1.75} />
              <p className="text-xs">Total Upvotes: {article.upvotes}</p>
            </div>
          </span>
        </div>
        <div className="lg:hidden h-[1.2px] w-full bg-[#c2bfbf] absolute"></div>
      </div>
    </Link>
  );
};

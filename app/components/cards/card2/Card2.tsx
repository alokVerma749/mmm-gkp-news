import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/app/types/article";
import { ArrowBigUp } from "lucide-react";

export const Card2 = ({ article }: { article: Article }) => {
  const defaultImage = "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = article.image || defaultImage;
  const truncatedContent = article.content.length > 30 ? article.content.substring(0, 100) + "..." : article.content;

  return (
    <Link href={`/article/${article._id}`} >
      <div className="grid grid-rows-[55%_40%] min-h-[45dvh] text-center sm:text-left">
        <div className="h-full w-full border ">
          <Image
            alt="team"
            className="flex-shrink-0 h-full w-full"
            src={imageSrc}
            width={200}
            height={200}
          />
        </div>

        <div className="flex-grow sm:pl-8 p-4 bg-[#FDFDFD] overflow-hidden">
          <h2 className="title-font font-bold text-base text-gray-900">
            {article.title}
          </h2>
          <h3 className="text-gray-500 mb-3 text-xs">{article.primary_tag}</h3>
          <div className="w-full h-[0.5] bg-gray-400 mb-2"></div>
          <p className="mb-4 text-sm text-[#04594D] font-semibold">{truncatedContent}</p>
          <span className="inline-flex">
            <div className="text-gray-500 flex flex-row justify-center items-center">
              <ArrowBigUp strokeWidth={1.75} />
              <p className="text-xs">Total Upvotes: {article.upvotes}</p>
            </div>
          </span>
        </div>
      </div>
    </Link>
  );
};

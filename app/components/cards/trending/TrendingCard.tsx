import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/app/types/article';

export const TrendingCard = ({ article }: { article: Article }) => {
  const defaultImage = "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = article.image || defaultImage;
  const truncatedContent = article.content.length > 30 ? article.content.substring(0, 30) + '...' : article.content;

  return (
    <Link href={`/article/${article._id}`}>
      <div className="h-full w-full items-center justify-between flex sm:flex-row sm:justify-start sm:text-left gap-4 p-6 relative">
      <div className="w-[90%] mx-auto h-[2] bg-[#dbdbdb] absolute top-0"></div>
        <div className='h-full w-1/3'>
        <Image
          alt="team"
          className="flex-shrink-0 h-full w-full"
          src={imageSrc}
          width={150}
          height={150}
        />
        </div>
        
        <div className="flex-grow w-2/3">
          <h2 className="title-font font-semibold text-lg text-gray-900">{article.title}</h2>
          <h3 className="text-gray-500">{article.primary_tag}</h3>
          <p className="text-[#04594D] font-semibold">{truncatedContent}</p>
        </div>
      </div>
    </Link>
  );
};

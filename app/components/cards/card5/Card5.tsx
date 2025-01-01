import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/app/types/article';

export const Card5 = ({ article }: { article: Article }) => {
  const defaultImage = "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = article.image || defaultImage;
  const truncatedContent = article.content.length > 30 ? article.content.substring(0, 30) + '...' : article.content;

  return (
    <Link href={`/article/${article._id}`}>
      <div className="flex sm:flex-row flex-col sm:justify-start text-start p-2">
        <div className="flex-grow">
          <h2 className="title-font font-medium text-sm text-gray-900">{article.title}</h2>
          <p className="text-xs text-blue-500">{truncatedContent}</p>
        </div>
        <Image
          alt="team"
          className="flex-shrink-0 rounded-lg"
          src={imageSrc}
          width={70}
          height={60}
        />
      </div>
    </Link>
  );
};

'use client'

import Image from 'next/image';
import { Article } from '@/app/types/article';
import Link from 'next/link';

export const TopCard = ({ article }: { article: Article }) => {
  const defaultImage = "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = article.image || defaultImage;
  const truncatedContent = article.content.length > 30 ? article.content.substring(0, 30) + '...' : article.content;

  return (
    <Link href={`/article/${article._id}`} className="flex relative h-full">
      <Image
        alt="gallery"
        className="absolute inset-0 w-full h-full object-cover object-center"
        src={imageSrc}
        layout="fill"
      />
      <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-60">
        <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">{article.primary_tag}</h2>
        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{article.title}</h1>
        <p className="leading-relaxed">{truncatedContent}</p>
      </div>
    </Link>
  );
};

export default TopCard;

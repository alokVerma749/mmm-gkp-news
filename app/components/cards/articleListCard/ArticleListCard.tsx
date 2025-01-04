import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/app/types/article';
import { ArrowBigUp } from 'lucide-react';

export const ArticleListCard = ({ article }: { article: Article }) => {
  const defaultImage = "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = article.image || defaultImage;
  const truncatedContent = article.content.length > 30 ? article.content.substring(0, 150) + '...' : article.content;

  return (
    <Link href={`/article/${article._id}`}>
      <div className="h-full w-full flex flex-col text-center sm:text-left p-4 pb-0 relative">
      <div className="bg-gray-300 h-[1.5px] absolute top-0 w-[98%] mx-auto"></div>
        <div className="flex sm:flex-row sm:justify-start">
          <Image
            alt="team"
            className="flex-shrink-0"
            src={imageSrc}
            width={200}
            height={200}
          />
          <div className="flex-grow sm:pl-8">
            <h2 className="title-font font-semibold text-xl">{article.title}</h2>
            <h3 className="text-gray-700 mb-3 text-lg">{article.primary_tag}</h3>
            <p className="mb-4 text-[#04594D] text-base">{truncatedContent}</p>
            <span className="inline-flex">
              <div className="text-gray-500 flex flex-row justify-center items-center">
                <ArrowBigUp strokeWidth={1.75}/> 
                <p className="text-xs">{article.upvotes}</p>
              </div>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

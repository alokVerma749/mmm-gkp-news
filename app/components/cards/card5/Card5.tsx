import Link from "next/link";
import Image from "next/image";
import { Article } from "@/app/types/article";

export const Card5 = ({ article }: { article: Article }) => {
  const defaultImage = "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = article.image || defaultImage;
  const truncatedContent = article.content.length > 30 ? article.content.substring(0, 60) + "..." : article.content;

  return (
    <Link href={`/article/${article._id}`}>
      <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start">
        <div className="">
          <h2 className="title-font font-semibold text-lg text-gray-900">{article.title}</h2>
          <p className="text-sm text-[#04594D]">{truncatedContent}</p>
        </div>
        <Image
          alt="team"
          className="flex-shrink-0 self-end w-[15%] h-[80%]"
          src={imageSrc}
          width={80}
          height={60}
        />
      </div>
    </Link>
  );
};

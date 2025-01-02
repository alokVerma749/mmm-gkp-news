import Link from "next/link";
import Image from "next/image";
import { Article } from "@/app/types/article";

export const Card4 = ({ article }: { article: Article }) => {
  const defaultImage =
    "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = article.image || defaultImage;
  const truncatedContent =
    article.content.length > 30 ? article.content.substring(0, 300) + "..." : article.content;

  return (
    <Link href={`/article/${article._id}`}>
      <div className="h-full w-full flex sm:flex-row sm:justify-start text-center sm:text-left p-4 pt-0 gap-2 bg-[#1A1A1A] text-[#D5D5D5]">
        <div className="w-2/3 relative">
          <Image
            alt="team"
            className="flex-shrink-0 h-full w-full"
            src={imageSrc}
            width={200}
            height={200}
          />
          <div className="absolute font-semibold bottom-0 w-full h-full flex flex-col justify-end p-4 bg-gradient-to-t from-black">
            <h2>{article.title}</h2>
          </div>
        </div>
        <div className="w-1/3 overflow-hidden">
          <p className="break-all font-thin text-sm">{truncatedContent}</p>
        </div>

      </div>
    </Link>
  );
};

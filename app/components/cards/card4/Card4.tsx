import Link from "next/link";
import Image from "next/image";
import { Article } from "@/app/types/article";

export const Card4 = ({ article }: { article: Article }) => {
  const defaultImage = "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = article.image || defaultImage;
  const truncatedContent = article.description.length > 30 ? article.description.substring(0, 200) + "..." : article.description;

  return (
    <Link href={`/article/${article._id}`}>
      <div className="h-full w-full flex sm:flex-row sm:justify-start text-center sm:text-left p-4 pt-0 bg-[#1A1A1A] text-[#D5D5D5]">
        <div className="flex items-start flex-col justify-between gap-2 w-[30%] pr-4 overflow-hidden">
          <p className="self-end break-all font-thin text-sm mt-2">{truncatedContent}</p>
        </div>
        <div className="w-[70%] relative">
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
      </div>
    </Link>
  );
};

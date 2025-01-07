import Image from "next/image";
import { Article } from "@/app/types/article";
import Link from "next/link";

export const TopCard = ({ article }: { article: Article }) => {
  const defaultImage = "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg";
  const imageSrc = article.image || defaultImage;
  const truncatedContent = article.description.length > 30 ? article.description.substring(0, 180) + "..." : article.description;

  return (
    <Link href={`/article/${article._id}`} className="flex relative h-full">
      <Image
        alt="gallery"
        className="relative w-full h-full"
        src={imageSrc}
        layout="fill"
      />
      <div className="absolute text-[#F7F7F4] font-semibold bottom-0 w-full h-full flex flex-col justify-end p-4 bg-gradient-to-t from-black">
        <h1 className="title-font text-xl font-semibold">{article.title}</h1>
        <p className="leading-relaxed font-thin text-sm">{truncatedContent}</p>
        <h2 className="tracking-widest text-xs title-font font-thin">{article.primary_tag}</h2>
      </div>
    </Link>
  );
};

export default TopCard;

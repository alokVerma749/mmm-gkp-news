import { Article } from "@/app/types/article";
import Image from "next/image";

export const CarouselCard = ({ article }: { article: Article }) => {
  return (
    <div className="w-[100dvw] relative h-[30dvh] min-w-full snap-start">
      {article.image && (
        <Image alt="not found" src={article.image} height={100} width={100} 
        className="w-full h-full object-cover object-center"/>
      )}
        <div className="absolute top-0 left-0 w-full h-full z-10 flex items-end text-center justify-center text-white bg-gradient-to-t from-black">
        <h1 className="text-xl pb-2">{article.title}</h1>
        </div>
      
    </div>
  );
};

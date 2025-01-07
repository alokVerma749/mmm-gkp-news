import { Article } from "@/app/types/article";
import { Card2 } from "../cards/card2";

export const CampusUpdates = ({ articles }: { articles: Article[] }) => {
  // Split the articles array into two parts
  const firstHalf = articles.slice(0, Math.ceil(articles.length / 2));
  const secondHalf = articles.slice(Math.ceil(articles.length / 2));

  return (
    <div className="order-last lg:order-first">
      <div className="flex gap-6 justify-between items-center my-4 pl-2 lg:pl-0">
        <h1 className="text-xl font-semibold lg:text-3xl">Campus Updates</h1>
        <div className="h-[1.5px] lg:h-[2px] bg-[#c7c7c7] lg:bg-[#1A1A1A] flex-1"></div>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-4 w-full">
        {/* First section with the first half of articles */}
        <div className="flex flex-col lg:w-1/2">
          {firstHalf.map((article, index) => (
            <Card2 key={index} article={article} />
          ))}
        </div>

        {/* Second section with the second half of articles */}
        <div className="flex flex-col lg:w-1/2">
          {secondHalf.map((article, index) => (
            <Card2 key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

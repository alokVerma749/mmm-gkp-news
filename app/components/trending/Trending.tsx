import { Article } from "@/app/types/article";
import { TrendingCard } from "../cards/trending";

export const Trending = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="h-max bg-[#FDFDFD]">
      <div className="flex items-center gap-4 py-4 pl-2 pr-0">
        <h1 className="font-semibold text-xl">Trending Headlines</h1>
        <div className="h-[1.5px] lg:h-[2px] bg-[#c7c7c7] lg:bg-[#1A1A1A] flex-1"></div>
      </div>

      <div className="flex flex-col">
        {articles.map((article, index) => (
          <TrendingCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

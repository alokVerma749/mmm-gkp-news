import { Article } from "@/app/types/article";
import { TrendingCard } from "../cards/trending";

export const Trending = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="h-max bg-[#FDFDFD]">
      <div>
        <div className="flex justify-between items-center p-4">
          <h1 className="font-semibold text-xl">Trending Headlines</h1>
          {/* <button className="text-xs lg:text-base py-1 px-[1.2rem] bg-[#363636] hover:bg-[#1A1A1A] text-white rounded-md active:scale-x-[0.96] transition-all duration-300">
            <p className="font-thin">View All</p>
          </button> */}
        </div>
      </div>

      <div className="flex flex-col">
        {articles.map((article, index) => (
          <TrendingCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

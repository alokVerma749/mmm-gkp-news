import React from "react";
import { Article } from "@/app/types/article";
import { TrendingCard } from "../cards/trending";

export const Trending = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="bg-[#FDFDFD] h-max">
      <div>
        <div className="flex justify-between items-center p-4">
        <h1 className="font-semibold text-xl">Trending Headlines</h1>
        <button className="py-1 px-[1.2rem] hover:bg-[#1A1A1A] bg-[#363636] text-white rounded-md active:scale-x-[0.96] transition-all duration-300">
          <a href="#">View All</a>
        </button>
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

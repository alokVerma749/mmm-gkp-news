import React from "react";
import { Article } from "@/app/types/article";
import { TrendingCard } from "../cards/trending";

export const Trending = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="bg-[#FDFDFD] h-max">
      <div>
        <div className="flex justify-between items-center p-4">
          <h1 className="font-semibold text-xl">Trending Headlines</h1>
          <button className="py-1 px-[1.2rem] bg-[#1A1A1A] text-white rounded-md">
            <a href="#">View All</a>
          </button>
        </div>

        <div className="w-[90%] mx-auto h-[2px] bg-[#1A1A1A]"></div>
      </div>

      <div className="flex flex-col gap-4">
        {articles.map((article, index) => (
          <TrendingCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

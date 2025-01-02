import { Article } from "@/app/types/article"
import { Card2 } from "../cards/card2"

export const CampusUpdates = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="bg-transparent w-[90%]">
      <div className="flex gap-6 justify-between items-center px-6 mb-4">
      <h1 className="font-semibold text-3xl">Campus Updates</h1>
      <div className="h-[2] bg-[#1A1A1A] flex-1"></div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="flex flex-col gap-4 w-1/2">
          {articles.map((article, index) => (
            <Card2 key={index} article={article} />
          ))}
        </div>
        <div className="flex flex-col gap-4 w-1/2">
          {articles.map((article, index) => (
            <Card2 key={index} article={article} />
          ))}
        </div>
        
      </div>
      <div className="flex justify-center mt-4">
        <button className="py-2 px-4 bg-[#04594D] text-white">
          <a href="#">View More</a>
        </button>
      </div>
    </div>
  )
}

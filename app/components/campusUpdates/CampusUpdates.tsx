import { Article } from "@/app/types/article"
import { Card2 } from "../cards/card2"

export const CampusUpdates = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="order-last lg:order-first">
      <div className="flex gap-6 justify-between items-center my-4">
        <h1 className="text-xl font-semibold lg:text-3xl">Campus Updates</h1>
        <div className="h-[1.5px] lg:h-[2px] bg-[#1A1A1A] flex-1"></div>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-4 w-full">
        <div className="flex flex-col lg:w-1/2">
          {articles.map((article, index) => (
            <Card2 key={index} article={article} />
          ))}
        </div>
        <div className="flex flex-col lg:w-1/2">
          {articles.map((article, index) => (
            <Card2 key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}

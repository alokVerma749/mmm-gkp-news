import { Article } from "@/app/types/article"
import { Card2 } from "../cards/card2"
import { Card3 } from "../cards/card3"

export const CampusUpdates = ({ articles }: { articles: Article[] }) => {
  return (
    <div>
      <h1>Campus Updates</h1>
      <div className="flex flex-row h-full gap-4">
        <div className="flex flex-col gap-4">
          {articles.map((article, index) => (
            <Card2 key={index} article={article} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {articles.map((article, index) => (
            <Card3 key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}

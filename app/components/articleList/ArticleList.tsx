import { Article } from '@/app/types/article'
import { TrendingListCard } from '../cards/trendingListCard'

export const ArticleList = ({ articles }: { articles: Article[] }) => {
  return (
    <div className='flex flex-col gap-2'>
      {articles.map((article, index) => (
        <TrendingListCard key={index} article={article} />
      ))}
    </div>
  )
}

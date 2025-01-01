import { Article } from '@/app/types/article'
import { TrendingListCard } from '../cards/trendingListCard'

export const ArticleList = ({ articles }: { articles: Article[] }) => {
  return (
    <div className='flex flex-col gap-2 bg-white w-3/4 mx-auto shadow-md'>
      <h1 className='text-4xl font-semibold p-4'>Trending Headlines</h1>
      <div className='h-[1.5px] w-[98%] mx-auto bg-gray-300'></div>
      {articles.map((article, index) => (
        <TrendingListCard key={index} article={article} />
      ))}
    </div>
  )
}

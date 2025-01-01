import { TopCard } from '../cards/topcard'
import { TrendingCard } from '../cards/trending'
import { Card4 } from '../cards/card4'
import { Card5 } from '../cards/card5'
import { Article } from '@/app/types/article'

export const Hero = ({ articles }: { articles: Article[] }) => {
  return (
    <div className='border border-green-900 flex flex-row justify-between p-2'>
      <div className='flex flex-col gap-2 w-1/2'>
        <TopCard article={articles[0]} />
        <TrendingCard article={articles[1]} />
      </div>
      <div className='flex flex-col gap-2 w-1/2'>
        <Card4 article={articles[1]} />
        <Card5 article={articles[1]} />
      </div>
    </div>
  )
}

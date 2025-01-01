import React from 'react'
import { Article } from '@/app/types/article'
import { TrendingCard } from '../cards/trending'

export const Trending = ({ articles }: { articles: Article[] }) => {
  return (
    <div>
      <h1>Trending</h1>
      <div className='max-width-7xl mx-auto flex flex-col gap-4'>
        {articles.map((article, index) => (
          <TrendingCard key={index} article={article} />
        ))}
      </div>
    </div>
  )
}

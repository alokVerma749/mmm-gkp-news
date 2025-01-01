import React from 'react'
import { Article } from '@/app/types/article'
import { TrendingCard } from '../cards/trending'

export const Trending = ({ articles }: { articles: Article[] }) => {
  return (
    <ul>
      {articles.map((article, index) => (
        <TrendingCard key={index} article={article} />
      ))}
    </ul>
  )
}

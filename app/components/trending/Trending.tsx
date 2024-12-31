import React from 'react'
import TrendingCard from '../cards/trending/TrendingCard'
import { Article } from '@/app/types/article'

export const Trending = ({ articles }: { articles: Article[] }) => {
  return (
    <ul>
      {articles.map((article, index) => (
        <TrendingCard key={index} article={article} />
      ))}
    </ul>
  )
}

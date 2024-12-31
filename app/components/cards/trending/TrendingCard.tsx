import { Article } from '@/app/types/article'
import Link from 'next/link'
import React from 'react'

const TrendingCard = ({ article }: { article: Article }) => {
  return (
    <Link href={`/article/${article._id}`} className='border-2 border-red-900 p-2' >
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </Link >
  )
}

export default TrendingCard

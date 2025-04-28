import Image from "next/image"
import Link from "next/link"
import { Article } from "../types/article"
import { formatDate } from "../utils/form-date"

interface FeaturedStoryProps {
  article: Article
}

export function FeaturedStory({ article }: FeaturedStoryProps) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm h-full">
      <div className="p-4">
        <div className="font-serif text-xs uppercase tracking-wider text-red-600 mb-1">
          Featured Story
        </div>

        <h2 className="text-xl font-bold font-serif leading-tight mb-2">
          <Link href={`/article/${article._id}`} className="hover:text-blue-600 transition-colors">
            {article.title}
          </Link>
        </h2>

        {article.image && (
          <div className="aspect-video relative mb-3 overflow-hidden">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        )}

        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
          {article.title}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{"MMMUT Students"}</span>
          <span>{formatDate(article.createdAt?.toString() || "")}</span>
        </div>
      </div>
    </div>
  )
}

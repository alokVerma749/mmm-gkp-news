import Link from "next/link"
import Image from "next/image"
import { Article } from "@/app/types/article"
import { formatDate } from "@/app/utils/form-date"


interface TrendingProps {
  articles: Article[]
}

export function Trending({ articles }: TrendingProps) {
  if (!articles.length) return null

  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <article key={article._id} className={`flex gap-3 ${index !== 0 ? "pt-4 border-t border-gray-100" : ""}`}>
          {article.image && (
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover"
                sizes="64px"
              />
              <div className="absolute top-0 left-0 w-6 h-6 flex items-center justify-center bg-red-600 text-white text-xs font-bold">
                {index + 1}
              </div>
            </div>
          )}

          <div className="flex-1">
            <h3 className="text-sm font-medium leading-tight mb-1">
              <Link href={`/article/${article._id}`} className="hover:text-blue-600 transition-colors">
                {article.title}
              </Link>
            </h3>

            <div className="text-xs text-gray-500">{formatDate(article.createdAt?.toString() || "")}</div>
          </div>
        </article>
      ))}
    </div>
  )
}

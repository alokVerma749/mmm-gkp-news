import { Article } from "@/app/types/article"
import { formatDate } from "@/app/utils/form-date"
import Image from "next/image"
import Link from "next/link"


interface CampusUpdatesProps {
  articles: Article[]
}

export function CampusUpdates({ articles }: CampusUpdatesProps) {
  if (!articles.length) return null

  // Feature the first article
  const featuredArticle = articles[0]
  const remainingArticles = articles.slice(1)

  return (
    <div className="divide-y divide-gray-200">
      {/* Featured Article */}
      <article className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredArticle.image && (
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={featuredArticle.image || "/placeholder.svg"}
                alt={featuredArticle.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          )}

          <div>
            <h3 className="text-2xl font-bold font-serif leading-tight mb-3">
              <Link href={`/article/${featuredArticle._id}`} className="hover:text-blue-600 transition-colors">
                {featuredArticle.title}
              </Link>
            </h3>

            <p className="text-gray-600 mb-4 line-clamp-3">
              {featuredArticle.title}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="font-medium">{"MMMUT Staff"}</span>
              <span>{formatDate(featuredArticle.createdAt?.toString() || "")}</span>
            </div>
          </div>
        </div>
      </article>

      {/* Remaining Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {remainingArticles.slice(0, 2).map((article) => (
          <article key={article._id} className="p-6">
            <h3 className="text-lg font-bold leading-tight mb-2">
              <Link href={`/article/${article._id}`} className="hover:text-blue-600 transition-colors">
                {article.title}
              </Link>
            </h3>

            {article.image && (
              <div className="aspect-video relative mb-3 overflow-hidden">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
            )}

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {article.title}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{"MMMUT Staff"}</span>
              <span>{formatDate(article.createdAt?.toString() || "")}</span>
            </div>
          </article>
        ))}
      </div>

      {/* More Articles in Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {remainingArticles.slice(2, 5).map((article) => (
          <article key={article._id} className="p-4">
            <h3 className="text-base font-medium leading-tight mb-2">
              <Link href={`/article/${article._id}`} className="hover:text-blue-600 transition-colors">
                {article.title}
              </Link>
            </h3>

            <p className="text-gray-600 text-xs mb-2 line-clamp-2">
              {article.title}
            </p>

            <div className="text-xs text-gray-500">{formatDate(article.createdAt?.toString() || "")}</div>
          </article>
        ))}
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import { ArrowBigUp, Calendar, Clock, Tag, ChevronLeft, Share2, Bookmark, Eye } from "lucide-react"
import Markdown from "react-markdown"
import getArticleAction from "@/app/Actions/get-article/getArticle"
import type { Article as ArticleType } from "@/app/types/article"
import Voting from "@/app/components/voting/Voting"
import Link from "next/link"

type ArticleProps = {
  params: Promise<{ article_id: string }>
}

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const { article_id } = await params

  const response: string = await getArticleAction(article_id)
  const article: ArticleType | null = response ? JSON.parse(response) : null

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article was not found.",
    }
  }

  return {
    title: article.title,
    description: article.description || article.content.slice(0, 150),
    openGraph: {
      title: article.title,
      description: article.description || article.content.slice(0, 150),
      images: [
        {
          url:
            article.image ||
            "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  }
}

export default async function Article({ params }: ArticleProps) {
  const { article_id } = await params

  const response: string = await getArticleAction(article_id)
  const article: ArticleType | null = response ? JSON.parse(response) : null

  const defaultImage =
    "https://res.cloudinary.com/dv1fxqrsi/image/upload/v1735705725/article-thumbnails/b4lxfvb1qgkefdbybuor.jpg"
  const imageSrc = article?.image || defaultImage

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The article you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
    )
  }

  // Calculate reading time (average reading speed: 200 words per minute)
  const wordCount = article.content.split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  // Format date if available
  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "Recently published"

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0 opacity-40"
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Category Badge */}
            <Link
              href={`/${article.primary_tag}`}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 bg-opacity-80 text-white mb-6 hover:bg-opacity-100 transition-colors"
            >
              <Tag className="w-3 h-3 mr-1" />
              {article.primary_tag?.replace("_", " ").toUpperCase()}
            </Link>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6">{article.title}</h1>

            {/* Description */}
            {article.description && (
              <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto mb-8">{article.description}</p>
            )}

            {/* Article Meta */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formattedDate}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {readingTime} min read
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
              </div>
              <div className="sm:hidden lg:flex items-center">
                <Voting article_id={article_id} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto -mt-10 relative z-20">
        <div className="mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          {/* Article Content */}
          <div className="flex">
            {/* Sidebar with voting */}
            <div className="hidden sm:block w-16 border-r border-gray-100 dark:border-gray-700 p-4">
              <div className="sticky top-8 flex flex-col items-center space-y-6">

                <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>

                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>

                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6 sm:p-8 md:p-10">
              {/* Mobile voting */}
              <div className="sm:hidden flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <Voting article_id={article_id} />

                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Bookmark className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Article content */}
              <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 max-w-none">
                <Markdown>{article.content}</Markdown>
              </div>

              {/* Tags */}
              {article.secondary_tags && article.secondary_tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Related Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.secondary_tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/tag/${tag.toLowerCase()}`}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <ArrowBigUp className="w-5 h-5 mr-1" />
                  <span>{article.upvotes || 0} upvotes</span>
                </div>

                <Link
                  href={`/${article.primary_tag}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  More from {article.primary_tag?.replace("_", " ")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles Section - Placeholder */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

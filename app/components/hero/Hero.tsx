"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Article } from "@/app/types/article";
import { formatDate } from "@/app/utils/form-date";

interface HeroProps {
  articles: Article[]
}

export function Hero({ articles }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-rotate articles
  useEffect(() => {
    if (articles.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [articles.length])

  if (!articles.length) return null

  const currentArticle = articles[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? articles.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length)
  }

  return (
    <div className="relative bg-black h-full">
      {/* Featured Article */}
      <div className="relative h-full overflow-hidden">
        {currentArticle.image && (
          <div className="absolute inset-0">
            <Image
              src={currentArticle.image || "/placeholder.svg"}
              alt={currentArticle.title}
              fill
              className="object-cover opacity-70"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="relative h-full flex flex-col justify-end p-6 text-white">
          <div className="max-w-3xl">
            <div className="inline-block bg-red-600 px-2 py-1 text-xs font-bold uppercase tracking-wider mb-3">
              Featured
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif leading-tight mb-3">
              <Link href={`/article/${currentArticle._id}`} className="hover:text-blue-300 transition-colors">
                {currentArticle.title}
              </Link>
            </h2>

            <p className="text-gray-200 mb-4 line-clamp-2 md:line-clamp-3">
              {currentArticle.title}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-300">
              <span>{formatDate(currentArticle.createdAt?.toString() || "")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {articles.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Previous article"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Next article"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                aria-label={`Go to article ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

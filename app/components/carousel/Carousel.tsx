"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Article } from "@/app/types/article"

interface CarouselProps {
  articles: Article[]
}

export function Carousel({ articles }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-rotate articles
  useEffect(() => {
    if (articles.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length)
    }, 5000)

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
    <div className="relative bg-black rounded-md overflow-hidden">
      {/* Featured Article */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {currentArticle.image && (
          <Image
            src={currentArticle.image || "/placeholder.svg"}
            alt={currentArticle.title}
            fill
            className="object-cover opacity-80"
            priority
            sizes="(max-width: 768px) 100vw, 600px"
          />
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
          <h2 className="text-lg font-bold leading-tight mb-2 line-clamp-2">
            <Link href={`/article/${currentArticle._id}`} className="hover:text-blue-300 transition-colors">
              {currentArticle.title}
            </Link>
          </h2>
        </div>
      </div>

      {/* Navigation Controls */}
      {articles.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
            aria-label="Previous article"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
            aria-label="Next article"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
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

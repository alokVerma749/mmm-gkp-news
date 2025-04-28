"use client"

import { useState, useEffect, useRef } from "react"
import { Article } from "../types/article"
import { ChevronRight } from 'lucide-react'

interface BreakingNewsProps {
  articles: Article[]
}

export function BreakingNews({ articles }: BreakingNewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (articles.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [articles.length])
  
  if (!articles.length) return null
  
  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="shrink-0 font-bold text-sm md:text-base uppercase tracking-wider mr-4 px-2 py-1 bg-black rounded">
            Breaking
          </div>
          
          <div className="overflow-hidden relative flex-1" ref={containerRef}>
            <div className="whitespace-nowrap animate-marquee">
              {articles.map((article, index) => (
                <span 
                  key={article._id} 
                  className={`inline-flex items-center ${index !== currentIndex ? 'hidden' : ''}`}
                >
                  <span className="text-sm md:text-base font-medium">
                    {article.title}
                  </span>
                  <ChevronRight className="h-4 w-4 mx-2" />
                </span>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-1 ml-4">
            {articles.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to news item ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

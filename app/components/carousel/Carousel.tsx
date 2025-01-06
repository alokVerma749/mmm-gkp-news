"use client";

import { useState, useEffect, useRef } from "react";
import { Article } from "@/app/types/article";
import { CarouselCard } from "../cards/carouselCard";

export const Carousel = ({ articles }: { articles: Article[] }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const totalSlides = articles.length;

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      const interval = setInterval(() => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [totalSlides]);

  useEffect(() => {
    if (carouselRef.current) {
      const offset = -(slideIndex * 100);
      carouselRef.current.style.transform = `translateX(${offset}vw)`;
    }
  }, [slideIndex]);

  return (
    <div className="relative w-full overflow-hidden">
      <div ref={carouselRef} className="flex transition-transform duration-500 ease-out" >
        {articles.map((article, index) => (
          <CarouselCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

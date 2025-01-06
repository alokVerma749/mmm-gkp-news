"use client";

import { useState, useEffect, useRef } from "react";
import { Article } from "@/app/types/article";
import { CarouselCard } from "../cards/carouselCard";

export const Carousel = ({ articles }: { articles: Article[] }) => {
  const [slideIndex, setSlideIndex] = useState(0);  // State to track the current slide
  const totalSlides = articles.length;

  // Ref for the carousel container to control its transformation
  const carouselRef = useRef<HTMLDivElement>(null);

  // Automatic slide movement
  useEffect(() => {
    if (carouselRef.current) {
      const interval = setInterval(() => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }, 3000); // Slide every 3 seconds

      return () => clearInterval(interval);  // Clean up on unmount
    }
  }, [totalSlides]);

  // Update the carousel position based on the current slide index
  useEffect(() => {
    if (carouselRef.current) {
      const offset = -(slideIndex * 100);  // Calculate the offset in `vw`
      carouselRef.current.style.transform = `translateX(${offset}vw)`;  // Apply the offset
    }
  }, [slideIndex]);  // This runs whenever the slide index changes

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={carouselRef} // Attach the ref here
        className="flex transition-transform duration-500 ease-out"
      >
        {articles.map((article, index) => (
          <CarouselCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

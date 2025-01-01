import React from 'react'

export const ArticleSkeleton = () => {
  return (
    <div>
      {/* Image Skeleton */}
      <div className="w-3/4 mx-auto border border-gray-800 rounded-xl mt-[-12.5rem] shadow-lg shadow-slate-700">
        <div className="flex-shrink-0 rounded-xl w-full h-96 bg-gray-500 animate-pulse"></div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex gap-4 w-3/4 mx-auto mt-16">
        <div className="flex justify-center items-center bg-gray-500 text-gray-400 px-4 py-1 rounded-md animate-pulse w-20 h-10"></div>
        <div className="flex justify-center items-center bg-gray-500 text-gray-400 px-4 py-1 rounded-md animate-pulse w-20 h-10"></div>
      </div>

      {/* Text Skeleton */}
      <div className="w-3/4 mx-auto mt-4">
        <div className="h-6 bg-gray-700 rounded-md animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-700 rounded-md animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-700 rounded-md animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-700 rounded-md animate-pulse mb-2"></div>

        {/* Upvotes Section Skeleton */}
        <div className="mt-16 flex justify-center items-center space-x-2">
          <div className="h-4 w-8 bg-gray-700 rounded-md animate-pulse"></div>
          <div className="h-4 w-6 bg-gray-700 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

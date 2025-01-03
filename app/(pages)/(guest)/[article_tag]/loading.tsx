
export const Loading = () => {
  return (
    <div>
      <div className="w-full h-[50dvh] mx-auto relative">
        <div className="w-full h-[60%] bg-foreground absolute top-0 z-0"></div>

        <div className="relative z-10 w-3/4 mx-auto bg-background">
          <div className="animate-pulse">
            <p className="h-24 w-24"></p>
          </div>
        </div>

        {/* Skeleton for ArticleList */}
        <div className="relative z-10 w-3/4 mx-auto bg-background">
          <div className="animate-pulse">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2 p-4 border border-gray-300 rounded-md mb-4">
                <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div> {/* Title Placeholder */}
                <div className="h-4 w-full bg-gray-300 rounded-md"></div> {/* Description Line 1 */}
                <div className="h-4 w-2/3 bg-gray-300 rounded-md"></div> {/* Description Line 2 */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  )
};

export default Loading;

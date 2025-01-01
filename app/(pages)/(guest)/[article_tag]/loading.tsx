
export const Loading = () => {
  return <div className="flex flex-col gap-2 bg-background w-3/4 mx-auto shadow-md py-4 mt-[-13rem]">
    {/* Articles Skeleton */}
    <div className="flex flex-col gap-4 px-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 p-4 border border-gray-300 rounded-md animate-pulse"
        >
          <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div> {/* Title Placeholder */}
          <div className="h-4 w-full bg-gray-300 rounded-md"></div> {/* Description Line 1 */}
          <div className="h-4 w-2/3 bg-gray-300 rounded-md"></div> {/* Description Line 2 */}
        </div>
      ))}
    </div>

    {/* Button Skeleton */}
    <div className="flex justify-center my-4">
      <div className="h-10 w-40 bg-gray-300 rounded-md animate-pulse"></div>
    </div>
  </div>
};

export default Loading;

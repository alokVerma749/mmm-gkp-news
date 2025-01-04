import { ArticleSkeleton } from "@/app/components/articleSkeleton";

const Loading = () => {
  return (
    <div className="relative w-full">
      <div className="bg-foreground h-[30vh]"></div>
      <ArticleSkeleton />
    </div>
  );
};

export default Loading;

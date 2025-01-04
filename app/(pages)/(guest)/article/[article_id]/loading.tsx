import { ArticleSkeleton } from "@/app/components/articleSkeleton";

const Loading = () => {
  return (
    <div className="relative w-full">
      <div className="bg-foreground h-34"></div>
      <ArticleSkeleton />
    </div>
  );
};

export default Loading;

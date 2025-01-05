import { Article } from "@/app/types/article";
import { ArticleListCard } from "../cards/articleListCard";

type ArticleListProps = {
  articles: Article[];
  article_tag: string;
}

export const ArticleList = ({ articles, article_tag }: ArticleListProps) => {
  return (
    <div className="flex flex-col lg:gap-0 bg-[#FDFDFD] lg:w-3/4 mx-auto shadow-md lg:py-0 overflow-hidden">
      <div className="flex items-center gap-4 py-4 pl-2 pr-0 lg:p-4">
        <h1 className="text-xl lg:text-4xl font-semibold capitalize">
          {article_tag}
        </h1>
        <div className="h-[1.5px] lg:h-[2px] bg-[#c7c7c7] lg:bg-[#1A1A1A] flex-1"></div>
      </div>
      {articles.map((article, index) => (
        <ArticleListCard key={index} article={article} />
      ))}
    </div>
  );
};

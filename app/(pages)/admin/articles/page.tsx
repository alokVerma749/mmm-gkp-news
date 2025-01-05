import getAllArticlesAction from "@/app/Actions/get-all-articles/getArticles";
import { ArticleCard } from "@/app/components/admin/articleCard";
import { Article as ArticleType } from "@/app/types/article";

const Articles = async () => {
  const response: string = await getAllArticlesAction()
  const articles: ArticleType[] = response ? JSON.parse(response as string) : [];
  return (
    <div className="flex flex-col lg:gap-0 bg-[#FDFDFD] lg:w-3/4 mx-auto shadow-md lg:py-0 overflow-hidden">
      <div className="flex items-center gap-4 py-4 pl-2 pr-0 lg:p-4 my-8">
        <h1 className="text-xl lg:text-4xl font-semibold capitalize">
          All Articles ({articles.length})
        </h1>
        <div className="h-[1.5px] lg:h-[2px] bg-[#c7c7c7] lg:bg-[#1A1A1A] flex-1"></div>
      </div>
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
    </div>
  )
}

export default Articles

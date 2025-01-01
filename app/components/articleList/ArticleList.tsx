import { Article } from '@/app/types/article'
import { ArticleListCard } from '../cards/articleListCard'

export const ArticleList = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="flex flex-col gap-2 bg-white w-3/4 mx-auto shadow-md py-4">
      <h1 className="text-4xl font-semibold p-4">Trending Headlines</h1>
      <div className="h-[1.5px] w-[98%] mx-auto bg-gray-300"></div>
      {articles.map((article, index) => (
        <ArticleListCard key={index} article={article} />
      ))}
      <button className="bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] text-lg px-4 py-1 font-semibold rounded-md w-40 place-self-center my-4 active:scale-x-[0.98] transition-all duration-300">
        View More
      </button>
    </div>
  );
};

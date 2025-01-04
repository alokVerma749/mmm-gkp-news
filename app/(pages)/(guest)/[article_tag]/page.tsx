import { Metadata } from "next";
import getArticlesAction from "@/app/Actions/get-articles/getArticles";
import { Article as ArticleType } from "@/app/types/article";
import { ArticleList } from "@/app/components/articleList";
import { InfiniteScrollList } from "@/app/components/infiniteScrollList";

type ArticleProps = {
  params: Promise<{ article_tag: string }>;
};

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const { article_tag } = await params;

  if (!article_tag) {
    return {
      title: "Articles Not Found",
      description: "The requested articles were not found.",
    };
  }

  return {
    title: `${article_tag.toUpperCase()} - MMMUT GKP NEWS`,
    description: `Read the latest updates and news about ${article_tag}. Stay informed with the most recent articles on ${article_tag} at MMMUT GKP NEWS.`,
  };
}

export default async function Article({ params }: ArticleProps) {
  const { article_tag } = await params;

  // Fetch initial articles
  const response1: string = await getArticlesAction({
    primary_tag: article_tag,
    limit: 10,
    page: 1,
  });

  const response2: string = await getArticlesAction({
    primary_tag: article_tag,
    limit: 10,
    page: 2,
  });

  const initialArticles: ArticleType[] = response1 ? JSON.parse(response1 as string) : [];
  const nextArticles: ArticleType[] = response2 ? JSON.parse(response2 as string) : [];

  return (
    <div>
      <div className="w-full h-full mx-auto relative mb-6">
        <div className="w-full h-[30%] bg-foreground absolute top-0 z-0"></div>
        {/* Render static initial articles */}
        <div className="relative z-10">
          <ArticleList article_tag={article_tag} articles={initialArticles} />
        </div>
      </div>

      {/* Infinite scroll for additional articles */}
      {
        nextArticles.length > 0 && <InfiniteScrollList article_tag={article_tag} initialArticles={nextArticles} initialPage={3} />
      }
    </div>
  );
}

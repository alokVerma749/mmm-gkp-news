import getArticlesAction from "@/app/Actions/get-articles/getArticles";
import { ArticleList } from "@/app/components/articleList";
import { CampusUpdates } from "@/app/components/campusUpdates";
import { Hero } from "@/app/components/hero";
import { Trending } from "@/app/components/trending";
import { Article as ArticleType } from "@/app/types/article";
import { Metadata } from "next";

type ArticleProps = {
  params: Promise<{ article_tag: string }>;
};

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const { article_tag } = await params;

  if (!article_tag) {
    return {
      title: "Articles Not Found",
      description: "The requested articles was not found.",
    };
  }

  return {
    title: `${article_tag.toUpperCase()}- MMMUT GKP NEWS`,
    description: `Read the latest updates and news about ${article_tag}. Stay informed with the most recent articles on ${article_tag} at MMMUT GKP NEWS.`,
  };
}

export default async function Article({ params }: ArticleProps) {
  const { article_tag } = await params;

  const response: string = await getArticlesAction(article_tag);
  const articles: ArticleType[] = response ? JSON.parse(response as string) : [];

  if (articles.length === 0) {
    return <p>No articles found {article_tag}</p>;
  }

  return (
    <div className="w-3/4 mx-auto mt-2">
      <ArticleList articles={articles} />
      <button>View More</button>
    </div>
  );
}

import { Metadata } from "next";
import getArticleAction from "@/app/Actions/get-article/getArticle";
import { Article as ArticleType  } from "@/app/types/article";

type ArticleProps = {
  params: Promise<{ article_id: string }>; // Note: Keeping this async if required
};

export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const { article_id } = await params;

  const response: string = await getArticleAction(article_id);
  const article: ArticleType | null = response ? JSON.parse(response) : null;

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article was not found.",
    };
  }

  return {
    title: article.title,
    description: article.content.slice(0, 150),
  };
}

export default async function Article({ params }: ArticleProps) {
  const { article_id } = await params;

  const response: string = await getArticleAction(article_id);
  const article: ArticleType | null = response ? JSON.parse(response) : null;

  if (!article) {
    return <p>No articles found</p>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <p>Upvotes: {article.upvotes}</p>
      <p>Downvotes: {article.downvotes}</p>
    </div>
  );
}

import getArticleAction from "@/app/Actions/get-article/getArticle";

export interface Article {
  primary_tag: string;
  secondary_tags: string[];
  title: string;
  upvotes: number;
  downvotes: number;
  content: string;
}

type ArticleProps = {
  params: Promise<{ article_id: string }>;
};


export default async function Article({ params }: ArticleProps) {
  const { article_id } = await params;

  const response: string = await getArticleAction(article_id);
  const article: Article = response ? JSON.parse(response as string) : [];

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

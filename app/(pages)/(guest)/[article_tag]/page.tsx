import getArticlesAction from "@/app/Actions/get-articles/getArticles";

export interface Article {
  primary_tag: string;
  secondary_tags: string[];
  title: string;
  upvotes: number;
  downvotes: number;
  content: string;
}

type ArticleProps = {
  params: Promise<{ article_tag: string }>;
};


export default async function Article({ params }: ArticleProps) {
  const { article_tag } = await params;

  const response: string = await getArticlesAction(article_tag);
  const articles: Article[] = response ? JSON.parse(response as string) : [];

  if (articles.length === 0) {
    return <p>No articles found {article_tag}</p>;
  }

  return (
    <div>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
}

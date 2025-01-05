import getArticleAction from '@/app/Actions/get-article/getArticle';
import ArticleClient from '@/app/components/admin/articleClient/ArticleClient';

type ArticleProps = {
  params: Promise<{ article_id: string }>;
};

export default async function ArticlePage({ params }: ArticleProps) {
  const { article_id } = await params;

  // Fetch article data on the server
  const response: string = await getArticleAction(article_id);
  const article = response ? JSON.parse(response) : null;

  if (!article) {
    return <p>No articles found</p>;
  }

  return <ArticleClient article={article} />;
}

import connect_db from '../config/db';
import Article from '@/app/models/article-schema';
import { Article as ArticleType } from '../types/article';

export const getAllArticles = async (article_tag?: string): Promise<ArticleType[]> => {
  await connect_db();

  const query: { primary_tag?: string } = article_tag ? { primary_tag: article_tag } : {};

  try {
    const articles = await Article.find(query).exec();
    return articles as ArticleType[];
  } catch (error) {
    console.error("Error fetching all articles:", error instanceof Error ? error.message : error);
    return [];
  }
};

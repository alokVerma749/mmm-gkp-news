import connect_db from '../config/db';
import Article from '@/app/models/article-schema';
import { Article as ArticleType } from '../types/article';

export const getArticles = async (primary_tag?: string): Promise<ArticleType[]> => {
  await connect_db();

  try {
    const query = primary_tag ? { primary_tag } : {};
    const articles = await Article.find(query).exec();
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

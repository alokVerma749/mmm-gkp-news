import connect_db from '../config/db';
import Article from '@/app/models/article-schema';
import { Article as ArticleType } from '../types/article';

export const getArticle = async (article_id?: string): Promise<ArticleType[]> => {
  await connect_db();

  try {
    const article = await Article.findOne({ _id: article_id }).exec();
    return article;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

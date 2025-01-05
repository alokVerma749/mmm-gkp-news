import connect_db from '../config/db';
import Article from '@/app/models/article-schema';
import { Article as ArticleType } from '../types/article';

export const getAllArticles = async (): Promise<ArticleType[]> => {
  await connect_db();

  try {
    const articles = await Article.find({}).exec();
    return articles;
  } catch (error) {
    console.error("Error fetching all articles:", error);
    return [];
  }
};

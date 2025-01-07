import connect_db from '../config/db';
import Article from '@/app/models/article-schema';
import { Article as ArticleType } from '../types/article';

export interface GetArticlesOptions {
  limit?: number;
}

export const getTrendingArticles = async ({ limit = 10 }: GetArticlesOptions): Promise<ArticleType[]> => {
  await connect_db();

  try {
    const articles = await Article.find({}).limit(limit).sort({ upvotes: -1 }).exec();
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

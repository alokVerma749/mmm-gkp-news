import connect_db from '../config/db';
import Article from '@/app/models/article-schema';
import { Article as ArticleType } from '../types/article';

export interface GetArticlesOptions {
  primary_tag?: string;
  limit?: number;
  page?: number;
}

export const getArticles = async ({
  primary_tag,
  limit = 10,
  page = 1,
}: GetArticlesOptions): Promise<ArticleType[]> => {
  await connect_db();

  try {
    const query = primary_tag && primary_tag !== 'timeline' ? { primary_tag } : {};
    const skip = (page - 1) * limit;

    const articles = await Article.find(query).limit(limit).skip(skip).exec();

    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

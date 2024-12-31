import connect_db from '../config/db';
import Article from '@/app/models/article-schema';
import { ArticleFormData } from '../types/article';

export const publishArticle = async (data: ArticleFormData) => {
  await connect_db();

  try {
    const article = new Article(data);
    await article.save();
    return article;
  } catch (error) {
    console.error("Error publishing article:", error);
    throw new Error("Failed to publish the article.");
  }
};

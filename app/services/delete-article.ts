import connect_db from '../config/db';
import Article from '@/app/models/article-schema';
import { revalidateArticles } from '../Actions/revalidate-articles/revalidate-articles';

export const deleteArticle = async (article_id?: string) => {
  await connect_db();

  try {
    if (!article_id) {
      throw new Error("Article ID is required.");
    }

    const deletedArticle = await Article.findByIdAndDelete(article_id);

    if (!deletedArticle) {
      throw new Error("Article not found.");
    }

    await revalidateArticles();

    return deletedArticle;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting article:", error.message);
      throw new Error(`Failed to delete the article: ${error.message}`);
    } else {
      console.error("Unknown error occurred during article deletion:", error);
      throw new Error("An unknown error occurred during article deletion.");
    }
  }
};

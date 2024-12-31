import connect_db from '../config/db';
import Article from '@/app/models/article-schema';
import { Article as ArticleType } from '../types/article';

export const downvoteArticle = async (article_id: string): Promise<ArticleType | null> => {
  await connect_db();

  try {
    const article = await Article.findOneAndUpdate(
      { _id: article_id },
      { $inc: { downvotes: 1 } },
      { new: true }
    );

    if (!article) {
      throw new Error("Article not found");
    }

    return article;
  } catch (error) {
    console.error("Error upvoting article:", error);
    throw new Error("Failed to upvote the article.");
  }
};

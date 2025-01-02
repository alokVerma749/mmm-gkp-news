'use server'

import connect_db from '../config/db';
import Article from '@/app/models/article-schema';

export const upvoteArticle = async (article_id: string): Promise<{ success: boolean; message: string; }> => {
  await connect_db();

  try {
    const article = await Article.findOneAndUpdate(
      { _id: article_id },
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    if (!article) {
      throw new Error("Article not found");
    }

    return { success: true, message: 'Article upvoted successfully' };
  } catch (error) {
    console.error("Error upvoting article:", error);
    throw new Error("Failed to upvote the article.");
  }
};

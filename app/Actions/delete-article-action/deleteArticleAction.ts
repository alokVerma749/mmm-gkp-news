'use server';

import { deleteArticle } from "@/app/services/delete-article";

const deleteArticleAction = async ({ article_id }: { article_id: string }) => {
  try {
    const article = await deleteArticle(article_id);
    if (!article) {
      throw new Error("Failed to update the article.");
    }

    return { success: true, message: 'Article updated successfully' };
  } catch (error) {
    console.error("Error in updating the article:", error);
    throw new Error(error instanceof Error ? error.message : "An unknown error occurred.");
  }
};

export default deleteArticleAction;

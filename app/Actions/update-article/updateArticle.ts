'use server';

import { updateArticle } from "@/app/services/update-article";
import { ArticleFormData } from "@/app/types/article";

const updateArticleAction = async (data: ArticleFormData) => {
  try {
    const article = await updateArticle(data);
    if (!article) {
      throw new Error("Failed to update the article.");
    }

    return { success: true, message: 'Article updated successfully' };
  } catch (error) {
    console.error("Error in updating the article:", error);
    throw new Error(error instanceof Error ? error.message : "An unknown error occurred.");
  }
};

export default updateArticleAction;

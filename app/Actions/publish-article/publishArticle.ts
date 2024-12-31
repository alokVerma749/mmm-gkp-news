'use server';

import { publishArticle } from "@/app/services/publish-article";
import { ArticleFormData } from "@/app/types/article";

const publishArticleAction = async (data: ArticleFormData) => {
  try {
    const article = await publishArticle(data);
    if (!article) {
      throw new Error("Failed to publish the article.");
    }

    return { success: true, message: 'Article published successfully' };
  } catch (error) {
    console.error("Error in publishArticleAction:", error);
    throw new Error(error instanceof Error ? error.message : "An unknown error occurred.");
  }
};

export default publishArticleAction;

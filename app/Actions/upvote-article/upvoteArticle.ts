'use server';

import { upvoteArticle } from "@/app/services/upvote-article";

export default async function upvoteArticleAction(formData: FormData): Promise<{ success: boolean, message: string }> {
  const article_id = formData.get("article_id") as string;
  try {
    const response = await upvoteArticle(article_id);

    if (!response) {
      throw new Error("Failed to upvote the article.");
    }

    console.log('Article upvoted successfully');
    return response
  } catch (error) {
    console.error("Error in upvoteArticleAction:", error);
    throw new Error(error instanceof Error ? error.message : "An unknown error occurred.");
  }
};

'use server';

import { downvoteArticle } from "@/app/services/downvote-article";


export default async function downvoteArticleAction(formData: FormData): Promise<{ success: boolean, message: string }>  {
  const article_id = formData.get("article_id") as string;
  try {
    const response = await downvoteArticle(article_id);

    if (!response) {
      throw new Error("Failed to downvote the article.");
    }

    console.log('Article downvoted successfully');
    return response
  } catch (error) {
    console.error("Error in downvoteArticleAction:", error);
    throw new Error(error instanceof Error ? error.message : "An unknown error occurred.");
  }
};

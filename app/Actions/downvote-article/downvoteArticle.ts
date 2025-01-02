'use server';

import { downvoteArticle } from "@/app/services/downvote-article";


export default async function downvoteArticleAction(formData: FormData): Promise<void> {
  const article_id = formData.get("article_id") as string;
  try {
    const article = await downvoteArticle(article_id);

    if (!article) {
      throw new Error("Failed to downvote the article.");
    }

    console.log('Article downvoted successfully');
  } catch (error) {
    console.error("Error in downvoteArticleAction:", error);
    throw new Error(error instanceof Error ? error.message : "An unknown error occurred.");
  }
};

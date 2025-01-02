'use server';

import { upvoteArticle } from "@/app/services/upvote-article";

export default async function upvoteArticleAction(formData: FormData): Promise<void> {
  const article_id = formData.get("article_id") as string;
  try {
    const article = await upvoteArticle(article_id);

    if (!article) {
      throw new Error("Failed to upvote the article.");
    }
    console.log('Article upvoted successfully');
  } catch (error) {
    console.error("Error in upvoteArticleAction:", error);
    throw new Error(error instanceof Error ? error.message : "An unknown error occurred.");
  }
};

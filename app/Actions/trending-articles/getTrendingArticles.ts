'use server';

import { getTrendingArticles } from "@/app/services/get-trending-articles";
import { Article as ArticleType } from "@/app/types/article";

interface GetArticlesActionProps {
  limit?: number;
}

const getTrendingArticlesAction = async ({ limit = 10 }: GetArticlesActionProps): Promise<string> => {
  try {
    const articles: ArticleType[] = await getTrendingArticles({ limit });

    return JSON.stringify(articles);
  } catch (error) {
    console.error("Error in fetching trending articles:", error);
    return JSON.stringify({
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
};

export default getTrendingArticlesAction;

'use server';

import { getArticles } from "@/app/services/get-paginated-articles";
import { Article as ArticleType } from "@/app/types/article";

interface GetArticlesActionProps {
  primary_tag?: string;
  limit?: number;
  page?: number;
}

const getArticlesAction = async ({ primary_tag, limit = 10, page = 1 }: GetArticlesActionProps): Promise<string> => {
  try {
    const articles: ArticleType[] = await getArticles({
      primary_tag,
      limit,
      page,
    });

    return JSON.stringify(articles);
  } catch (error) {
    console.error("Error in getArticlesAction:", error);
    return JSON.stringify({
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
};

export default getArticlesAction;

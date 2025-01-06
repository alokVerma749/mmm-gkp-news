'use server';

import { getAllArticles } from "@/app/services/get-all-articles";
import { Article as ArticleType } from "@/app/types/article";


const getAllArticlesAction = async (article_tag?: string): Promise<string> => {
  try {
    const articles: ArticleType[] = await getAllArticles(article_tag);
    return JSON.stringify(articles);
  } catch (error) {
    console.error("Error in getArticlesAction:", error);
    return JSON.stringify({
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
};

export default getAllArticlesAction;

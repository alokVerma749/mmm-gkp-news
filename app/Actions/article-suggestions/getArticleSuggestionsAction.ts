'use server';

import { getArticlesSuggestions } from "@/app/services/article-suggestions";

interface GetArticlesActionProps {
  search: string;
}

const getArticlesSuggestionsAction = async ({ search }: GetArticlesActionProps): Promise<string> => {
  try {
    const articles = await getArticlesSuggestions({ search });
    return JSON.stringify(articles);
  } catch (error) {
    console.error("Error in getArticlesAction:", error);
    return JSON.stringify({
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
};

export default getArticlesSuggestionsAction;

'use server';

import { getArticlesSuggestions } from "@/app/services/article-suggestions";
import { toast } from "@/hooks/use-toast";

interface GetArticlesActionProps {
  search: string;
}

const getArticlesSuggestionsAction = async ({ search }: GetArticlesActionProps): Promise<string> => {
  try {
    const articles = await getArticlesSuggestions({ search });
    return JSON.stringify(articles);
  } catch (error) {
    console.error("Error in fetching suggestions:", error);
    toast({
      title: "Error in fetching suggestions:"
    })
    return JSON.stringify({
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    });
  }
};

export default getArticlesSuggestionsAction;

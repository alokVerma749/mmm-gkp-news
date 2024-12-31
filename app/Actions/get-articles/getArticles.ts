'use server'

import { getArticles } from "@/app/services/get-articles";

const getArticlesAction = async (primary_tag?: string): Promise<string> => {

  try {
    const articles = await getArticles(primary_tag)

    return JSON.stringify(articles)
  } catch (error) {
    console.error("Error in getFoldersAction:", error)
    return JSON.stringify({ error: error instanceof Error ? error.message : "An unknown error occurred." });
  }
}

export default getArticlesAction;

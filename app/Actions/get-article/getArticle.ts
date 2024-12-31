'use server'

import { getArticle } from "@/app/services/get-article"

const getArticleAction = async (article_id?: string): Promise<string> => {

  try {
    const article = await getArticle(article_id)

    return JSON.stringify(article)
  } catch (error) {
    console.error("Error in getFoldersAction:", error)
    return JSON.stringify({ error: error instanceof Error ? error.message : "An unknown error occurred." });
  }
}

export default getArticleAction;

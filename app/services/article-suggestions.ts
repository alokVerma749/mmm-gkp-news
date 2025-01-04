import connect_db from "../config/db";
import Article from "@/app/models/article-schema";

export interface GetArticlesSuggestionsOptions {
  search?: string;
}

export const getArticlesSuggestions = async ({ search = "" }: GetArticlesSuggestionsOptions): Promise<{ _id: string; title: string }[]> => {
  await connect_db();

  try {
    const query = search
      ? { title: { $regex: search, $options: "i" } } // Case-insensitive regex for matching
      : {};

    const suggestions = await Article.find(query, "_id title").exec(); // Select only `_id` and `title`
    return suggestions;
  } catch (error) {
    console.error("Error fetching article suggestions:", error);
    return [];
  }
};

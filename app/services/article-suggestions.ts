import connect_db from "../config/db";
import Article from "@/app/models/article-schema";

export interface GetArticlesSuggestionsOptions {
  search?: string;
  limit?: number;
}

export const getArticlesSuggestions = async ({
  search = "",
  limit = 10,
}: GetArticlesSuggestionsOptions): Promise<{ _id: string; title: string }[]> => {
  await connect_db();

  try {
    const query = search
      ? { title: { $regex: search, $options: "i" } } // Case-insensitive regex for matching
      : {};

    const suggestions = await Article.find(query, "_id title") // Select only `_id` and `title`
      .limit(limit)
      .exec();

    return suggestions;
  } catch (error) {
    console.error("Error fetching article suggestions:", error);
    return [];
  }
};

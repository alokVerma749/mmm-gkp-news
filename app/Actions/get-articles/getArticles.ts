import connect_db from "@/app/config/db";
import Article from "@/app/models/article-schema";

export interface Article {
  primary_tag: string;
  secondary_tags: string[];
  title: string;
  upvotes: number;
  downvotes: number;
  content: string;
}

const getArticles = async (primary_tag?: string): Promise<Article[]> => {
  await connect_db();
  try {
    const query = primary_tag ? { primary_tag } : {};
    const articles = await Article.find(query).exec();
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export default getArticles;

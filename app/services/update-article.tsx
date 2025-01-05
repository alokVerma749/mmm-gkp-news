import connect_db from '../config/db';
import Article from '@/app/models/article-schema';
import { ArticleFormData } from '../types/article';
import { revalidateArticles } from '../Actions/revalidate-articles/revalidate-articles';

export const updateArticle = async (data: ArticleFormData) => {
  await connect_db();

  try {
    // Find the article by ID and update it with new data
    const updatedArticle = await Article.findByIdAndUpdate(
      data._id, // Find article by its ID
      {
        title: data.title,
        image: data.image,
        content: data.content,
        primary_tag: data.primary_tag,
        secondary_tags: data.secondary_tags,
      },
      { new: true } // Return the updated document
    );

    if (!updatedArticle) {
      throw new Error("Article not found.");
    }

    // Trigger revalidation
    await revalidateArticles();

    return updatedArticle;
  } catch (error) {
    console.error("Error updating article:", error);
    throw new Error("Failed to update the article.");
  }
};

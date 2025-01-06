import connect_db from '../config/db';
import Article from '@/app/models/article-schema';
import { ArticleFormData } from '../types/article';
import { revalidateArticles } from '../Actions/revalidate-articles/revalidate-articles';
import { jwtVerify } from 'jose';
import { cookies, headers } from 'next/headers';
import { PermissionLevel } from '../models/admin-schema';

const JWT_SECRET = process.env.JWT_SECRET;

export const updateArticle = async (data: ArticleFormData) => {
  await connect_db();

  try {
    // Read cookies
    const cookieStore = cookies();
    const userToken = (await cookieStore).get('auth_token')?.value;

    if (!userToken) {
      throw new Error("Unauthorized: Missing authentication token.");
    }

    // Verify JWT Token
    const secret = new TextEncoder().encode(JWT_SECRET);
    try {
      await jwtVerify(userToken, secret);
    } catch (err) {
      console.log(err)
      throw new Error("Unauthorized: Invalid authentication token.");
    }

    // Check for required permission in headers
    const headerStore = headers();
    const permission = (await headerStore).get('x-admin-permission');

    if (!permission || permission == PermissionLevel.PUBLISH) {
      throw new Error("Unauthorized: Insufficient permissions.");
    }

    // Find the article by ID and update it with new data
    const updatedArticle = await Article.findByIdAndUpdate(data._id,
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

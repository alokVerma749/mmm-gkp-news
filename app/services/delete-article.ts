import connect_db from '../config/db';
import Article from '@/app/models/article-schema';
import { revalidateArticles } from '../Actions/revalidate-articles/revalidate-articles';
import { cookies, headers } from 'next/headers';
import { PermissionLevel } from '../models/admin-schema';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

export const deleteArticle = async (article_id?: string) => {
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

    if (!permission || permission !== PermissionLevel.DELETE) {
      throw new Error("Unauthorized: Insufficient permissions.");
    }

    // Ensure the article ID is provided
    if (!article_id) {
      throw new Error("Article ID is required.");
    }

    // Delete the article from the database
    const deletedArticle = await Article.findByIdAndDelete(article_id);

    if (!deletedArticle) {
      throw new Error("Article not found.");
    }

    // Revalidate cache after deletion
    await revalidateArticles();

    return deletedArticle;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting article:", error.message);
      throw new Error(`Failed to delete the article: ${error.message}`);
    } else {
      console.error("Unknown error occurred during article deletion:", error);
      throw new Error("An unknown error occurred during article deletion.");
    }
  }
};

import connect_db from '../config/db';
import Article from '@/app/models/article-schema';
import { ArticleFormData } from '../types/article';
import { PermissionLevel } from '../models/admin-schema';
import { cookies, headers } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

export const publishArticle = async (data: ArticleFormData) => {
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

    if (permission === null || !Object.values(PermissionLevel).includes(permission as PermissionLevel)) {
      throw new Error("Unauthorized: Insufficient permissions.");
    }
    console.log(data, '###')
    const article = new Article(data);
    await article.save();
    console.log(article, '$$$')
    return article;
  } catch (error) {
    console.error("Error publishing article:", error);
    throw new Error("Failed to publish the article.");
  }
};

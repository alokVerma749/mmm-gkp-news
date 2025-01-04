import type { MetadataRoute } from 'next';
import getArticlesAction from './Actions/get-articles/getArticles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error("Environment variable NEXT_PUBLIC_SITE_URL is not set.");
  }

  const allArticles = [];
  let page = 1;
  let hasMoreArticles = true;

  try {
    while (hasMoreArticles) {
      const response: string = await getArticlesAction({
        primary_tag: "timeline",
        limit: 10,
        page: page,
      });

      const articles = response ? JSON.parse(response) : [];
      allArticles.push(...articles);

      // Stop fetching if fewer than `limit` articles are returned
      hasMoreArticles = articles.length === 10;
      page++;
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  const sitemapEntries: MetadataRoute.Sitemap = allArticles.map((article) => {
    // Dynamically determine priority based on upvotes
    let priority = 0.6;
    if (article.upvotes > 50) {
      priority = 0.9;
    } else if (article.upvotes > 20) {
      priority = 0.7;
    } else if (article.upvotes < 10) {
      priority = 0.4;
    }

    return {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/article/${article._id}`,
      lastModified: new Date(article.updatedAt || article.createdAt || Date.now()),
      changeFrequency: "weekly",
      priority,
    };
  });

  const staticPages = [
    "department",
    "hostel",
    "library",
    "events",
    "placements",
    "college_life",
    "alumni",
    "admissions",
    "scholarships",
  ].map((page) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${page.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...staticPages,
    ...sitemapEntries,
  ];
}

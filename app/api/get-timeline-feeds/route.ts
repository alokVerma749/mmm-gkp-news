import connect_db from "@/app/config/db";
import Article from "@/app/models/article-schema"

export async function POST(request: Request) {
  try {
    const { tag } = await request.json()

    // Ensure the database connection is established
    await connect_db();

    // Fetch the articles with the given tag
    const articles = await Article.find({ primary_tag: tag }).exec();

    if (articles.length === 0) {
      return new Response(
        JSON.stringify({ message: "No articles found for this tag" }),
        { status: 404 } // Use 404 if no articles are found
      );
    }

    return new Response(
      JSON.stringify(articles),
      { status: 200 } // Return the articles with a 200 status code
    );

  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

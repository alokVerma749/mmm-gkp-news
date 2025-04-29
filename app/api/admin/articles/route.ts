import { NextResponse } from "next/server";
import connect_db from "@/app/config/db";
import Article from "@/app/models/article-schema";

// GET all articles
export async function GET() {
  try {
    await connect_db();

    const articles = await Article.find();

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

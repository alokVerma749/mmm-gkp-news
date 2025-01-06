import connect_db from "@/app/config/db";
import Suggestion from "@/app/models/survey-schema";

export async function POST(request: Request) {
  try {
    await connect_db();

    const { title, description, category, relatedLinks, name, email } = await request.json();

    if (!title || !description || !category) {
      return new Response(JSON.stringify({ message: "Title, description, and category are required" }), { status: 400 });
    }

    const newSuggestion = new Suggestion({
      title,
      description,
      category,
      relatedLinks,
      name,
      email,
    });

    await newSuggestion.save();

    return new Response(JSON.stringify({ message: "Suggestion submitted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error submitting suggestion:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

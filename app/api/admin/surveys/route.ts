import { NextResponse } from "next/server";
import connect_db from "@/app/config/db";
import Suggestion from "@/app/models/survey-schema";

// GET all surveys
export async function GET() {
  try {
    await connect_db();

    const surveys = await Suggestion.find();

    return NextResponse.json(surveys);
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json({ error: "Failed to fetch surveys" }, { status: 500 });
  }
}

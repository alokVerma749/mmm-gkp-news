import Contact from "@/app/models/contact-model";
import { NextResponse } from "next/server";
import connect_db from "@/app/config/db";

// GET all contacts
export async function GET() {
  try {
    await connect_db();

    const contacts = await Contact.find();

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import connect_db from "@/app/config/db";
import Event from "@/app/models/admin-events";

// GET all events
export async function GET() {
  try {
    await connect_db(); // Connect to the database

    // Fetch all events from the database
    const events = await Event.find().sort({ date: 1, time: 1 }); // Sort by date and time

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

// POST a new event
export async function POST(request: Request) {
  try {
    await connect_db(); // Connect to the database

    const body = await request.json();

    // Validate request
    if (!body.title || !body.date || !body.time) {
      return NextResponse.json({ error: "Title, date, and time are required" }, { status: 400 });
    }

    // Create a new event
    const newEvent = new Event({
      title: body.title,
      date: body.date,
      time: body.time,
      type: body.type || "other",
    });

    // Save the event to the database
    await newEvent.save();

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

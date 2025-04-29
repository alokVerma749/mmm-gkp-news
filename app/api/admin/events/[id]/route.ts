import { NextResponse } from "next/server";
import connect_db from "@/app/config/db";
import mongoose from "mongoose";
import Event from "@/app/models/admin-events";

// GET a specific event
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<any> {
  try {
    const id = (await params).id;
    await connect_db();

    if (!id) {
      return {
        title: "Id is missing",
        description: "The requested was not fulfilled",
      };
    }

    // Find the event by ID
    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}

// PUT (update) a event
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<any> {
  try {
    const id = (await params).id;
    await connect_db();
    const body = await request.json();

    // Update the event by ID
    const updatedTask = await Event.findByIdAndUpdate(id, body, { new: true });

    if (!updatedTask) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

// DELETE a event
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<any> {
  try {
    const id = (await params).id;
    await connect_db();

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid Event ID format" }, { status: 400 });
    }

    const deletedTask = await Event.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(deletedTask);
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}

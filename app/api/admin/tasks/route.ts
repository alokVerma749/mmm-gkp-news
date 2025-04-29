import { NextResponse } from "next/server";
import connect_db from "@/app/config/db";
import Task from "@/app/models/admin-task";

// GET all tasks
export async function GET() {
  try {
    await connect_db();

    // Fetch all tasks from the database
    const tasks = await Task.find().sort({ createdAt: -1 });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

// POST a new task
export async function POST(request: Request) {
  try {
    await connect_db();

    const body = await request.json();

    // Validate request
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Create a new task
    const newTask = new Task({
      title: body.title,
      completed: body.completed || false,
    });

    // Save the task to the database
    await newTask.save();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}

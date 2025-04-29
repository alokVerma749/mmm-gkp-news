import { NextResponse } from "next/server";
import connect_db from "@/app/config/db";
import Task from "@/app/models/admin-task";

// GET a specific task
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connect_db();
    const { id } = await params;

    // Find the task by ID
    const task = await Task.findById(id);

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
  }
}

// PUT (update) a task
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connect_db();
    const id = (await params).id;
    const body = await request.json();

    // Update the task by ID
    const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

// DELETE a task
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connect_db();
    const id = (await params).id;

    // Delete the task by ID
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(deletedTask);
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}

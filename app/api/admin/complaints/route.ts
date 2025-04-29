import { NextResponse } from "next/server";
import connect_db from "@/app/config/db";
import Complaint from "@/app/models/complaint-schema";

// GET all complaints
export async function GET() {
  try {
    await connect_db();

    const complaints = await Complaint.find();

    return NextResponse.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return NextResponse.json({ error: "Failed to fetch complaints" }, { status: 500 });
  }
}

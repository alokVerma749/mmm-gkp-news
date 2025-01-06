import connect_db from "@/app/config/db";
import Complaint from "@/app/models/complaint-schema";

export async function POST(request: Request) {
  try {
    await connect_db();

    const { complaint, articleLinks, proof, name, email } = await request.json();

    if (!complaint) {
      return new Response(
        JSON.stringify({ message: "Complaint description is required" }),
        { status: 400 }
      );
    }

    const newComplaint = new Complaint({
      complaint,
      articleLinks,
      proof,
      name,
      email,
    });

    await newComplaint.save();

    return new Response(
      JSON.stringify({ message: "Complaint successfully submitted" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering complaint:", error);

    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

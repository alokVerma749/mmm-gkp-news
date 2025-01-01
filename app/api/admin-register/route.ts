import connect_db from "@/app/config/db";
import Admin from "@/app/models/admin-schema";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Connect to the database
    await connect_db();

    // Check if the admin exists
    const existingAdmin = await Admin.findOne({ username }).exec();

    if (existingAdmin) {
      return new Response(JSON.stringify({ message: "Admin already exist" }), { status: 404 });
    }

    const admin = new Admin({ username, password });
    await admin.save();

    // Return success response with cookie
    return new Response(JSON.stringify({ message: "Registration successful" }), { status: 200 });
  } catch (error) {
    console.error("Error registering admin:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

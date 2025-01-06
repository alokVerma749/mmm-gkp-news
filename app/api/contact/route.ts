import connect_db from "@/app/config/db";
import Contact from "@/app/models/contact-model";

export async function POST(request: Request) {
  try {
    await connect_db();

    const { name, email, message, subject } = await request.json();

    if (!name || !email || !message || !subject) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    const newContact = new Contact({
      name,
      email,
      message,
      subject,
    });

    await newContact.save();

    return new Response(JSON.stringify({ message: "Contact message submitted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

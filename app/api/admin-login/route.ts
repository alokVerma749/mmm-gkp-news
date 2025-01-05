import connect_db from "@/app/config/db";
import Admin from "@/app/models/admin-schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: Request) {
  try {
    const { username, password, otp } = await request.json();

    // Connect to the database
    await connect_db();

    // Check if the admin exists
    const admin = await Admin.findOne({ username }).exec();
    if (!admin) {
      return new Response(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Optional OTP verification
    if (otp && admin.otp !== otp) {
      return new Response(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      JWT_SECRET,
      { expiresIn: "30m" }
    );

    // Set HttpOnly cookie (conditionally secure for production)
    const secureFlag = process.env.NODE_ENV === "production" ? "Secure;" : "";
    const cookie = `auth_token=${token}; Path=/; HttpOnly; ${secureFlag} SameSite=Strict; Max-Age=1800`;

    // Reset OTP if used
    if (otp) {
      admin.otp = null;
      await admin.save();
    }

    // Return success response with cookie
    return new Response(
      JSON.stringify({ message: "Login successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error) {
    console.error("Error logging in admin:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

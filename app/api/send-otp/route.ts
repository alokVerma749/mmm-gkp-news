import connect_db from "@/app/config/db";
import Admin from "@/app/models/admin-schema";
import { generateOtp, sendOtpToAdminEmail } from "@/app/utils/otp-utils";

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    // Connect to the database
    await connect_db();

    // Check if the admin exists
    const admin = await Admin.findOne({ username }).exec();

    if (!admin) {
      return new Response(JSON.stringify({ message: "Admin not found" }), { status: 404 });
    }

    // Generate OTP
    const otp = generateOtp();
    admin.otp = otp;
    await admin.save();

    // Send OTP to admin's email
    await sendOtpToAdminEmail(otp, username, process.env.EMAIL_USER);

    // Return success response with cookie
    return new Response(JSON.stringify({ message: "OTP sent successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error logging in admin:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

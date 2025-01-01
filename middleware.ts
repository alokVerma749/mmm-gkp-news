import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function middleware(request: NextRequest) {
  // Restrict access to routes starting with "/admin"
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // const token = request.cookies.get("auth_token")?.value;

    // if (!token) {
    //   // Redirect to login if no token is found
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }

    // try {
    //   // Verify the token
    //   const secret = new TextEncoder().encode(JWT_SECRET);
    //   await jwtVerify(token, secret);
    // } catch (error) {
    //   console.error("Invalid Token:", error);
    //   // Redirect to login if token is invalid
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }
  }

  // Allow the request to proceed for non-restricted routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Apply middleware to /admin and all its subroutes
  runtime: "nodejs",
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function middleware(request: NextRequest) {

  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
  }

  const secret = new TextEncoder().encode(JWT_SECRET);
  const { payload }: any = await jwtVerify(token, secret);

  if (!payload) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Verify the token
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
    } catch (error) {
      console.error("Invalid Token:", error);
      // Redirect to login if token is invalid
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const requestHeaders = new Headers(request.headers)
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set('x-admin-permission', payload.permissions)

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
  runtime: "nodejs",
};

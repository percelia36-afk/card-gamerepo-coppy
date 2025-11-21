import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all /profile and profile-setup routes, add others as needed
    "/profile/:path*",
    "/profile-setup",
    "/api/:path*",
  ],
};

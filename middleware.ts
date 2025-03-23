import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";

export default withAuth(
  function middleware(req) {
    // If user is not authenticated, redirect to login
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next(); // Continue to requested page if authenticated
  },
  {
    pages: {
      signIn: "/login", // Redirect here if not signed in
    },
  }
);

export const config = {
  matcher: ["/((?!register|login|forgot-password|api).*)"],

};

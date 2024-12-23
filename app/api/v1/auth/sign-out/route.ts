import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const isProduction: boolean = process.env.NODE_ENV === "production";

export async function POST(req: Request) {
  try {
    const cookies = req.headers.get("cookies");
    const authToken = cookies
      ?.split(";")
      .find((cookie) => cookie.startsWith("authToken="))
      ?.split("=")[1];

    if (!authToken) {
      return NextResponse.json({ message: "Forbidden !" }, { status: 401 });
    }

    await prismadb.tokens.delete({
      where: { token: authToken },
    });

    // Clear the cookie on the client side
    const response = NextResponse.json({ message: "User signed out successfully" }, { status: 200 });
    response.headers.set("Set-Cookie", `authToken=; HttpOnly;${isProduction ? "Secure;" : ""} ;Path=/; Max-Age=0; SameSite=Strict;`);

    return response;
  } catch (error) {
    console.error("Error during sign-out:", error);
    return NextResponse.json({ error: "An error occurred during sign-out. Please try again." }, { status: 500 });
  }
}

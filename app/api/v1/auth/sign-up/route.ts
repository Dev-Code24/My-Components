import prismadb from "@/lib/prismadb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

const isProduction = process.env.NODE_ENV === "production";

export async function GET(req: Request) {
  return NextResponse.json({ message: "hello" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, middleName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Check if user with this email Id already exists
    const userExists = await prismadb.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json({ message: "User already exists with this email id" }, { status: 400 });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await prismadb.user.create({
      data: {
        firstName,
        lastName,
        middleName: middleName || null,
        email,
        password: encryptedPassword,
      },
    });

    // Extract device information from User-Agent header
    const userAgent = req.headers.get("user-agent") || "Unknown Device";
    const { browser, os, device } = UAParser(userAgent);

    const deviceInfo = `browser: ${browser.name || "Unknown Browser"}, os: ${os.name || "Unknown OS"}, device: (${device.model || "Unknown Device"})`;

    console.log("device info:", deviceInfo);
    // Generate a JWT token with device and location in the payload
    // Token expiration = 1 hr
    const expiresIn = 1; // in hrs
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        device: deviceInfo,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: `${expiresIn}h` } // Token valid for 1 hour
    );

    console.log({
      userId: newUser.id,
      email: newUser.email,
      device: deviceInfo,
    });

    await prismadb.tokens.create({
      data: {
        userId: newUser.id,
        token,
        expiresAt: new Date(Date.now() + expiresIn * 3600 * 1000),
      },
    });

    // Set the token in an HTTP-only secure cookie
    const cookie = `authToken=${token}; HttpOnly; ${isProduction ? "Secure;" : ""}; Path=/; Max-Age=3600; SameSite=Strict;`;
    const response = NextResponse.json({ message: "User created successfully" }, { status: 200 });
    response.headers.append("Set-Cookie", cookie);

    return response;
  } catch (error) {
    console.error("Error during sign-up:", error);
    return NextResponse.json({ error: "An error occurred during sign-up. Please try again." }, { status: 500 });
  }
}

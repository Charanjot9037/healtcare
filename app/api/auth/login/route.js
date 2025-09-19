import dbConnect from "../../../lib/config/db";
import User from "../../../lib/models/User";
import bcrypt from "bcrypt";
import cookie from "cookie";
import { createAccessToken, createRefreshToken } from "../../../lib/helper/auth";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Email and password are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Generate tokens
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    // Set refresh token in httpOnly cookie
    const setCookie = cookie.serialize("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return new Response(
      JSON.stringify({
        accessToken,
        user: { id: user._id, name: user.name, role: user.role },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": setCookie,
        },
      }
    );
  } catch (err) {
    console.error("Login error:", err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

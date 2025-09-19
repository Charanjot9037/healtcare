import jwt from "jsonwebtoken";
import cookie from "cookie";
import dbConnect from "../../../lib/config/db";
import User from "../../../lib/models/User";
import { createAccessToken, createRefreshToken } from "../../../lib/helper/auth";

export async function POST(req) {
  try {
    await dbConnect();

    // Parse cookies
    const cookies = cookie.parse(req.headers.get("cookie") || "");
    const token = cookies.refreshToken;

    if (!token) {
      return new Response(JSON.stringify({ message: "No refresh token provided" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verify refresh token
    let payload;
    try {
      payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return new Response(JSON.stringify({ message: "Invalid refresh token" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find user
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== token) {
      return new Response(JSON.stringify({ message: "Refresh token not recognized" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create new tokens
    const newAccessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user);

    // Save new refresh token
    user.refreshToken = newRefreshToken;
    await user.save();

    // Update cookie
    const setCookie = cookie.serialize("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return new Response(
      JSON.stringify({
        accessToken: newAccessToken,
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
    console.error("Refresh error:", err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

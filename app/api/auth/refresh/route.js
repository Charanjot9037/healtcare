import dbConnect from "../../../lib/config/db";
import User from "../../../lib/models/User";
import cookie from "cookie";
import {
  createAccessToken,
  verifyRefreshToken,
} from "../../../lib/helper/auth";

export async function POST(req) {
  try {
    await dbConnect();

    // 🍪 Read refresh token from cookies
    const cookies = cookie.parse(req.headers.get("cookie") || "");
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return new Response(
        JSON.stringify({ message: "No refresh token provided" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded || !decoded.id) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired refresh token" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // 🔎 Find user
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return new Response(
        JSON.stringify({ message: "Invalid refresh token" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // 🔑 Issue new access token
    const newAccessToken = createAccessToken(user);

    return new Response(
      JSON.stringify({
        accessToken: newAccessToken,
        user: { id: user._id, name: user.name, role: user.role },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Refresh token error:", err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

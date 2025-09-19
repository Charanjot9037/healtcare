import dbConnect from "../../../lib/config/db";
import User from "../../../lib/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, password, contact, location, age, gender, disease, role } = body;

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return new Response(JSON.stringify({ message: "Email already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      passwordHash,
      contact,
      location,
      age,
      gender,
      disease,
      role: role || "user",
    });

    return new Response(
      JSON.stringify({ message: "Account created successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Register error:", err);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
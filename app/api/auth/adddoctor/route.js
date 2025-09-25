

import bcrypt from "bcrypt";
import User from "@/app/lib/models/User";
import Doctor from "@/app/lib/models/Doctor";
import dbConnect from "@/app/lib/config/db";
import { sendDoctorCredentials } from "@/app/lib/helper/mail";
import { NextResponse } from "next/server";
import { Mail } from "lucide-react";

export async function POST(req) {
  try {
    const {
      name,
      email,
      password,
      mobile,
      degree,
      fees,
      licenseNumber,
      gender,
      specialization,
      imageUrl,
      doc_id,
       signature
    } = await req.json();
console.log(signature,imageUrl);
    if (!name || !email || !password || !mobile || !degree || !fees || !licenseNumber || !gender || !specialization) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return NextResponse.json({ message: "Email already exists" }, { status: 409 });

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create User for login
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: "doctor",
      doc_id
    });

    // Create Doctor profile
    const doctor = await Doctor.create({
      name,
      mobile,
      degree,
      fees,
      licenseNumber,
      gender,
      specialization,
      imageUrl,
      doc_id,
       signature
    });
     await sendDoctorCredentials({ to: email, password });

    return NextResponse.json({ success: true, message: "Doctor created",doctorId: doctor._id  });
  } catch (err) {
    console.error("Create Doctor Error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

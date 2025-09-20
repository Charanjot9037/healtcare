// import dbConnect from "@/app/lib/config/db";
// import Doctor from "@/app/lib/models/Doctor";
// import { NextResponse } from "next/server";

// export  async function POST(req) {
 
//      const {
// name, mobile,degree,fees,licenseNumber,gender,specialization,imageUrl,} = await req.json();
//        if (!name||!mobile||!degree||!fees||!licenseNumber||!gender||!specialization||!imageUrl){
//           return NextResponse.json({message:"something missing"},{status:200})
//        }
//        console.log("hello");
//  await dbConnect();
//  const existinguser= await Doctor.findOne({name})
//  if(existinguser){
//   return NextResponse.json({success:"false"},{error:'already registered'},{status:404});
//  }

 
//   const newDoctor = await Doctor.create({
//     name,
//     mobile,
//     degree,
//     fees,
//     licenseNumber,
//     gender,
//     specialization,
//     imageUrl,
//   });
//     return NextResponse.json({success:'true'},{status:200});
//     } 





import bcrypt from "bcrypt";
import User from "@/app/lib/models/User";
import Doctor from "@/app/lib/models/Doctor";
import dbConnect from "@/app/lib/config/db";
import { NextResponse } from "next/server";

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
    } = await req.json();

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
      userId: user._id, // optional link to User
    });

    return NextResponse.json({ success: true, message: "Doctor created", doctorId: doctor._id });
  } catch (err) {
    console.error("Create Doctor Error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

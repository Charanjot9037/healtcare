import dbConnect from "@/app/lib/config/db";
import Doctor from "@/app/lib/models/Doctor";
import { NextResponse } from "next/server";

export  async function POST(req) {
 
     const {
name, mobile,degree,fees,licenseNumber,gender,specialization,imageUrl,} = await req.json();
       if (!name||!mobile||!degree||!fees||!licenseNumber||!gender||!specialization||!imageUrl){
          return NextResponse.json({message:"something missing"},{status:200})
       }
       console.log("hello");
 await dbConnect();
 const existinguser= await Doctor.findOne({name})
 if(existinguser){
  return NextResponse.json({success:"false"},{error:'already registered'},{status:404});
 }

 
  const newDoctor = await Doctor.create({
    name,
    mobile,
    degree,
    fees,
    licenseNumber,
    gender,
    specialization,
    imageUrl,
  });
    return NextResponse.json({success:'true'},{status:200});
    } 
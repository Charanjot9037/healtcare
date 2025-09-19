import { NextResponse } from "next/server";
import Appointment from "@/app/lib/models/appointment";
import dbConnect from "@/app/lib/config/db";

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    const newAppointment = await Appointment.create(data);

    return NextResponse.json(
      { message: "Appointment booked successfully", appointment: newAppointment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error booking appointment:", error);
    return NextResponse.json({ message: "Error booking appointment" }, { status: 500 });
  }
}

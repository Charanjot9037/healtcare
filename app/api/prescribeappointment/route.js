

import dbConnect from "@/app/lib/config/db";
import Appointment from "@/app/lib/models/appointment"
import Doctor from "@/app/lib/models/Doctor";

export async function POST(req) {


  try {
    await dbConnect();

    const { id } = await req.json(); 
console.log(id);
    if (!id) {
      return Response.json(
        { success: false, error: "userId is required" },
        { status: 400 }
      );
    }
// const app = await Appointment.findById(id);
const app = await Appointment.findById(id).populate("doctorId");

   console.log(app);
    return Response.json({ success: true ,app }, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}


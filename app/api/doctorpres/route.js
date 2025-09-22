
import dbConnect from "@/app/lib/config/db";
import Appointment from "@/app/lib/models/appointment";

export async function POST(req) {
  try {
    await dbConnect();

    const { id,prescription} = await req.json();
console.log(prescription,id);
    if (!id) {
      return Response.json(
        { success: false, error: "appointmentId is required" },
        { status: 400 }
      );
    }

 

    // Update appointment by ID
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
        
doctorreports:prescription          // make sure your schema has this field
      },
      { new: true } // return updated doc
    );

    console.log(updatedAppointment);
    if (!updatedAppointment) {
      return Response.json(
        { success: false, error: "Appointment not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, appointment: updatedAppointment },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating appointment:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

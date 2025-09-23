import dbConnect from "@/app/lib/config/db";
import Appointment from "@/app/lib/models/appointment";

export async function POST(req) {
  try {
    await dbConnect();

    const { appointmentId, status, time, meetingLink } = await req.json();

    if (!appointmentId) {
      return Response.json(
        { success: false, error: "appointmentId is required" },
        { status: 400 }
      );
    }

    console.log("Updating appointment:",meetingLink);

    // Update appointment by ID
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        
appointmentStatus:"confirm",
        appointmentTime: time, // assuming schema field is appointmentTime
        meetinglink:meetingLink,           // make sure your schema has this field
      },
      { new: true } // return updated doc
    );

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

import Doctor from "@/app/lib/models/Doctor";
import dbConnect from "@/app/lib/config/db";
import Appointment from "@/app/lib/models/appointment";
import User from "@/app/lib/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    // Get userId from frontend
    const { userId } = await req.json();

    if (!userId) {
      return Response.json(
        { success: false, error: "userId is required" },
        { status: 400 }
      );
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return Response.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Get the doctor ID from user
    const doc_id = user.doc_id;
    if (!doc_id) {
      return Response.json(
        { success: false, error: "User has no associated doctor" },
        { status: 400 }
      );
    }

    // Find the doctor
    const doctor = await Doctor.findOne({ doc_id });
    if (!doctor) {
      return Response.json(
        { success: false, error: "Doctor not found" },
        { status: 404 }
      );
    }

    // Fetch appointments
    const appointments = await Appointment.find({ doctorId: doctor._id });

    return Response.json(
      { success: true, appointments },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

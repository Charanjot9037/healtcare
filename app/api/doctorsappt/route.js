
import Doctor from "@/app/lib/models/Doctor";
import dbConnect from "@/app/lib/config/db";
import Appointment from "@/app/lib/models/appointment"
import User from "@/app/lib/models/User";
export async function POST(req) {


  try {
    await dbConnect();

    const { userId } = await req.json(); // frontend sends user.id

    if (!userId) {
      return Response.json(
        { success: false, error: "userId is required" },
        { status: 400 }
      );
    }
const user = await User.findById(userId);
    // console.log("Looking for appointments with userID:", user.doc_id);

const doc_id=user.doc_id;
// console.log(doc_id);
const doctor = await Doctor.findOne({doc_id});

    const appointments = await Appointment.find({ doctorId:doctor._id });
console.log("appoint",appointments);
    return Response.json({ success: true ,appointments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}


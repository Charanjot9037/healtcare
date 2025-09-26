
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
 

const doc_id=user.doc_id;

const doctor = await Doctor.findOne({doc_id});

 
console.log("doctor",doctor);
    return Response.json({ success: true ,doctor}, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}


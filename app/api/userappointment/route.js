
import dbConnect from "@/app/lib/config/db";
import Appointment from "@/app/lib/models/appointment";

export async function POST(req) {
  try {
    await dbConnect();

    const { user } = await req.json();
    if (!user?.id) {
      return Response.json({ error: "user.id is required" }, { status: 400 });
    }

    const userID = user.id;
    console.log("Looking for appointments with userID:", userID);

 
    const appointments = await Appointment.find({ userID });

    console.log("Found appointments:", appointments);

    return Response.json(
      { success: true, appointments },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

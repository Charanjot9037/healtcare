// import dbConnect from "@/app/lib/config/db";
// import Appointment from "@/app/lib/models/appointment";

// export async function GET() {
//   try {
//     await dbConnect();
//     const appointment = await Appointment.find({});
//     return Response.json(appointment);
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }
import dbConnect from "@/app/lib/config/db";
import Appointment from "@/app/lib/models/appointment";
import User from "@/app/lib/models/User";
import Doctor from "@/app/lib/models/Doctor";
export async function GET() {
  try {
    await dbConnect();

    const appointments = await Appointment.find({})
      // .populate("user") ;   // populate user details
    //   .populate("doctor"); // populate doctor details

    return Response.json(appointments, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

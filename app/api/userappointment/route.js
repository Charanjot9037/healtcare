
// import dbConnect from "@/app/lib/config/db";
// import Appointment from "@/app/lib/models/appointment";

// export async function POST(req) {
//   try {
//     await dbConnect();

//     const { userId } = await req.json(); // frontend sends user.id

//     if (!userId) {
//       return Response.json(
//         { success: false, error: "userId is required" },
//         { status: 400 }
//       );
//     }

//     console.log("Looking for appointments with userID:", userId);

//     // 🔑 Important: match schema field name (userID not userId)
//     const appointments = await Appointment.find({ userID: userId });

//     return Response.json({ success: true, appointments }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching appointments:", error);
//     return Response.json({ success: false, error: error.message }, { status: 500 });
//   }
// }


import dbConnect from "@/app/lib/config/db";
import Appointment from "@/app/lib/models/appointment";

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

    console.log("Cleaning appointments for userID:", userId);

    // 1️⃣ Delete all pending appointments
    await Appointment.deleteMany({ userID: userId, status: "Pending" });

    // 2️⃣ Fetch remaining appointments
    const appointments = await Appointment.find({ userID: userId });

    return Response.json({ success: true, appointments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

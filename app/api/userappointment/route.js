
// import dbConnect from "@/app/lib/config/db";
// import Appointment from "@/app/lib/models/appointment";

// export async function POST(req) {
//   try {
//     await dbConnect();

//     const { user } = await req.json();
//     if (!user?.id) {
//       return Response.json({ error: "user.id is required" }, { status: 400 });
//     }

//     const userID = user.id;
//     console.log("Looking for appointments with userID:", userID);

 
//     const appointments = await Appointment.find({ userID });

//     console.log("Found appointments:", appointments);

//     return Response.json(
//       { success: true, appointments },
//       { status: 200 }
//     );
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
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

    console.log("Looking for appointments with userID:", userId);

    // 🔑 Important: match schema field name (userID not userId)
    const appointments = await Appointment.find({ userID: userId });

    return Response.json({ success: true, appointments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}


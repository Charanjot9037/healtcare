// import dbConnect from "@/app/lib/config/db";
// import Appointment from "@/app/lib/models/appointment";

// export async function POST(req) {
//   try {
//     await dbConnect();

//     const { appointmentId, status, time, meetingLink } = await req.json();

//     if (!appointmentId) {
//       return Response.json(
//         { success: false, error: "appointmentId is required" },
//         { status: 400 }
//       );
//     }

//     console.log("Updating appointment:",meetingLink);

//     // Update appointment by ID
//     const updatedAppointment = await Appointment.findByIdAndUpdate(
//       appointmentId,
//       {
        
// appointmentStatus:"confirm",
//         appointmentTime: time, // assuming schema field is appointmentTime
//         meetinglink:meetingLink,           // make sure your schema has this field
//       },
//       { new: true } // return updated doc
//     );

//     if (!updatedAppointment) {
//       return Response.json(
//         { success: false, error: "Appointment not found" },
//         { status: 404 }
//       );
//     }

//     return Response.json(
//       { success: true, appointment: updatedAppointment },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating appointment:", error);
//     return Response.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

import dbConnect from "@/app/lib/config/db";
import Appointment from "@/app/lib/models/appointment";
import { sendEmail } from "@/app/lib/helper/sendemail";

export async function POST(req) {
  try {
    await dbConnect();

    const { appointmentId, time, meetingLink } = await req.json();

    if (!appointmentId) {
      return Response.json(
        { success: false, error: "appointmentId is required" },
        { status: 400 }
      );
    }

    // Update appointment
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        appointmentStatus: "confirm",
        appointmentTime: time,
        meetinglink: meetingLink,
      },
      { new: true }
    ).populate("userID") // Assuming you have user reference
     .populate("doctorId"); // Assuming you have doctor reference

    if (!updatedAppointment) {
      return Response.json(
        { success: false, error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Prepare email content
    const doctorName = updatedAppointment.doctorName || updatedAppointment.doctorId?.name;
    const userEmail = updatedAppointment.userID?.email;
 
    const appointmentDate = updatedAppointment.appointmentDate;
    const appointmentTime = updatedAppointment.appointmentTime;

    if (userEmail) {
      const emailHtml = `
        <h2>Appointment Confirmation</h2>
        <p>Dear Patient,</p>
        <p>Your appointment has been confirmed with <strong>Dr. ${doctorName}</strong>.</p>
        <p><strong>Date:</strong> ${appointmentDate}</p>
        <p><strong>Time:</strong> ${appointmentTime}</p>
        <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
        <br/>
        <p>Thanks for booking your appointment with us!</p>
        <p>Best regards,<br/>Healthcare Team</p>
      `;




      await sendEmail({
        to: userEmail,
        subject: "Your Appointment is Confirmed ✅",
        html: emailHtml,
      });
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

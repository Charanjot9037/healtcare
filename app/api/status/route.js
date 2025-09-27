
// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import dbConnect from "@/app/lib/config/db";
// import Appointment from "@/app/lib/models/appointment";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function GET(req) {
//   try {
//     await dbConnect();

//     const { searchParams } = new URL(req.url);
//     const sessionId = searchParams.get("sessionId");

//     if (!sessionId) {
//       return NextResponse.json({ error: "Session ID missing" }, { status: 400 });
//     }

//     // Find appointment using Stripe session ID
//     const appointment = await Appointment.findOne({ stripeSessionId: sessionId });
//     if (!appointment) {
//       return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
//     }

//     //  Auto-cancel if older than 2 minutes and still unpaid
//     const createdTime = new Date(appointment.createdAt).getTime();
// const now = Date.now();
// const diffMinutes = (now - createdTime) / (1000 * 60);

// console.log("Appointment age (minutes):", diffMinutes, "Status:", appointment.status);

// if (appointment.status === "pending" && diffMinutes > 1) {
//   console.log("Deleting expired appointment:", appointment._id);
//   await Appointment.findByIdAndDelete(appointment._id);
//   return NextResponse.json({ error: "Appointment expired and cancelled" }, { status: 410 });
// }
//     // Otherwise, check Stripe payment
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     if (session.payment_status === "paid" && appointment.status !== "Paid") {
//       appointment.status = "Paid";
//       await appointment.save();
//     }

//     return NextResponse.json({ appointment });
//   } catch (err) {
//     console.error("Error fetching appointment status:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/app/lib/config/db";
import Appointment from "@/app/lib/models/appointment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID missing" }, { status: 400 });
    }

    // Find appointment using Stripe session ID
    const appointment = await Appointment.findOne({ stripeSessionId: sessionId });
    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    console.log("Fetched appointment:", appointment);

    // Check Stripe payment status
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      // ✅ Payment done → mark as Paid
      if (appointment.status !== "Paid") {
        appointment.status = "Paid";
        await appointment.save();
        console.log("Appointment marked as Paid:", appointment._id);
      }
      return NextResponse.json({ appointment });
    } else {
      // ❌ Not paid → delete appointment
      console.log("Deleting unpaid appointment:", appointment._id);
      await Appointment.findByIdAndDelete(appointment._id);
      return NextResponse.json({ error: "Appointment was not paid and has been deleted" }, { status: 410 });
    }

  } catch (err) {
    console.error("Error checking appointment:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


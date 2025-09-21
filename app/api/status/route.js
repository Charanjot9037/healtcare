// import { NextResponse } from "next/server";
// import dbConnect from "@/app/lib/config/db";
// import Appointment from "@/app/lib/models/appointment";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function GET(req) {
//   try {
//     await dbConnect();

//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("sessionId");
//     if (!userId) {
//       return NextResponse.json({ error: "user ID missing" }, { status: 400 });
//     }

//     // Find appointment using the stored Stripe session ID
//     const appointment = await Appointment.findOne({ userID: userIdId });
//     if (!appointment) {
//       return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
//     }

//     // Check Stripe session payment status
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     console.log("session id : ",sessionId)


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

// import { NextResponse } from "next/server";
// import dbConnect from "@/app/lib/config/db";
// import Appointment from "@/app/lib/models/appointment";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function GET(req) {
//   try {
//     await dbConnect();

//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("userId");

//     if (!userId) {
//       return NextResponse.json({ error: "User ID missing" }, { status: 400 });
//     }

//     // Find the latest Pending appointment for this user
//     const appointment = await Appointment.findOne({ userID: userId, status: "Pending" }).sort({ createdAt: -1 });

//     if (!appointment) {
//       return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
//     }

//     // Check Stripe session payment status using metadata
//     if (appointment.metadata?.appointmentId) {
//       const sessions = await stripe.checkout.sessions.list({
//         payment_intent: appointment.metadata.appointmentId,
//       });

//       const session = sessions.data[0];
//       if (session?.payment_status === "paid") {
//         appointment.status = "Paid";
//         await appointment.save();
//       }
//     }

//     return NextResponse.json({ appointment });
//   } catch (err) {
//     console.error("Error fetching appointment status:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import dbConnect from "@/app/lib/config/db";
// import Appointment from "@/app/lib/models/appointment";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function GET(req) {
//   try {
//     await dbConnect();

//     const { searchParams } = new URL(req.url);
//     const sessionId = searchParams.get("sessionId");

//     if (!sessionId) {
//       return NextResponse.json({ error: "Session ID missing" }, { status: 400 });
//     }

//     // Find the appointment using stripeSessionId
//     const appointment = await Appointment.findOne({ stripeSessionId: sessionId });

//     if (!appointment) {
//       return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
//     }

//     // Check Stripe payment status
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

    // Find appointment using the Stripe session ID
    const appointment = await Appointment.findOne({ stripeSessionId: sessionId });
    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    // Check Stripe payment status
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid" && appointment.status !== "Paid") {
      appointment.status = "Paid";
      await appointment.save();
    }

    return NextResponse.json({ appointment });
  } catch (err) {
    console.error("Error fetching appointment status:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

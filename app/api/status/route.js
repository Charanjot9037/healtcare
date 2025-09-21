

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

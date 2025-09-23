

import { NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/app/lib/config/db";
import Doctor from "@/app/lib/models/Doctor";
import Appointment from "@/app/lib/models/appointment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // 1️⃣ Get doctor details
    const doctor = await Doctor.findById(body.doctorId);
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }
    console.log(body.reports)

    // 2️⃣ Create appointment with "Pending" status
    const appointment = new Appointment({
      doctorId: body.doctorId,
      userID: body.userID,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      mobile: body.mobile,
      dob: body.dob,
      gender: body.gender,
      appointmentDate: body.appointmentDate,
      address: body.address,
      reports:body.reports,
      status: "Pending",
      appointmentStatus:"Pending"
    });

    await appointment.save(); // Save appointment immediately

    // 3️⃣ Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd", // or "inr"
            product_data: {
              name: `Appointment with Dr. ${doctor.name}`,
              description: `Specialization: ${doctor.specialization}`,
            },
            unit_amount: doctor.fees * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_ORIGIN}/appointment/processing?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_ORIGIN}/appointment?canceled=true`,
      metadata: {
        appointmentId: appointment._id.toString(), // link Stripe session to DB
        userId: body.userID,
      },
    });

    // 4️⃣ Save Stripe session ID in appointment
    appointment.stripeSessionId = session.id;
    await appointment.save();

    // 5️⃣ Return session ID to frontend
    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error("Stripe session error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

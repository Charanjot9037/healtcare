

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const {
      patientEmail,
      patientName,
      doctorName,
      appointmentDate,
      appointmentTime,
      meetingLink,
      status,
    } = await req.json();

    // ✅ Use Brevo SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${doctorName}" <${process.env.SENDER_EMAIL}>`,
      to: patientEmail,
      subject: `📅 Appointment with Dr. ${doctorName}`,
      html: `
      <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:10px; box-shadow:0 4px 8px rgba(0,0,0,0.1); padding:20px;">
          
          <h2 style="color:#4f46e5; text-align:center;">Your Appointment Details</h2>
          <p style="font-size:16px; color:#333;">Hello <b>${patientName}</b>,</p>
          <p style="font-size:16px; color:#333;">
            Your appointment status is: 
            <span style="color:${
              status === "Confirmed"
                ? "green"
                : status === "Pending"
                ? "orange"
                : "red"
            }; font-weight:bold;">${status}</span>.
          </p>

          <div style="background:#f3f4f6; padding:15px; border-radius:8px; margin:20px 0;">
            <p><b>👨‍⚕️ Doctor:</b> Dr. ${doctorName}</p>
            <p><b>📅 Date:</b> ${appointmentDate}</p>
            <p><b>⏰ Time:</b> ${appointmentTime}</p>
            <p><b>🔗 Meeting Link:</b> <a href="${meetingLink}" style="color:#4f46e5; text-decoration:none;" target="_blank">Join Meeting</a></p>
          </div>

          <p style="font-size:15px; color:#555;">
            Please join the meeting on time and make sure your internet connection is stable.
          </p>

          <div style="text-align:center; margin:20px 0;">
            <a href="${meetingLink}" style="background:#4f46e5; color:#fff; padding:12px 20px; border-radius:6px; text-decoration:none; font-size:16px; display:inline-block;">
              Join Appointment
            </a>
          </div>

          <hr style="border:0; border-top:1px solid #eee; margin:20px 0;"/>
          <p style="font-size:13px; color:#777; text-align:center;">
            This is an automated email from <b>Healthcare Appointment System</b>. <br/>
            If you have any questions, please contact your doctor’s office.
          </p>
        </div>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

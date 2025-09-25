import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // use TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendDoctorCredentials({ to, password }) {
  try {
    await transporter.sendMail({
      from: `"HealWell" <${process.env.SENDER_EMAIL}>`,
      to,
      subject: "Your HealWell Doctor Account has been created",
      html: `
        <h2>Welcome to HealWell!</h2>
        <p>Your doctor account has been created by the admin.</p>
        <p><strong>Login Details:</strong></p>
        <ul>
          <li><b>Username:</b> ${to}</li>
          <li><b>Password:</b> ${password}</li>
        </ul>
        <p>You can login here: <a href="${process.env.CLIENT_ORIGIN}/login">${process.env.CLIENT_ORIGIN}/login</a></p>
      `,
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email", error };
  }
}

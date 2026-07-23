import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_EMAIL || "vjvirajjain122005@gmail.com";
    const appPassword = process.env.EMAIL_APP_PASSWORD;
    const userEmail = process.env.EMAIL_USER;

    // Fallback if environment variables are not configured
    if (!appPassword || !userEmail) {
      console.log("No EMAIL_APP_PASSWORD or EMAIL_USER provided. Form submission received:");
      console.log({ name, email, subject, message });
      
      // Simulate network delay for UI realism
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return NextResponse.json({ success: true, dummy: true });
    }

    // Configure nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: userEmail,
        pass: appPassword,
      },
    });

    const mailOptions = {
      from: `"${name}" <${userEmail}>`, // Gmail requires 'from' to be the authenticated user
      to: toEmail,
      subject: `New Contact Request: ${subject} (from ${name})`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      replyTo: email, // This allows you to hit "Reply" and send an email directly to the sender
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

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

    const htmlBody = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #09090b; color: #f9fafb; padding: 40px 20px; min-height: 100vh;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #18181b; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); overflow: hidden;">
          <!-- Header -->
          <div style="padding: 30px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #f9fafb;">New Contact Request</h1>
            <div style="height: 4px; width: 40px; background-color: #10b981; margin: 16px auto 0; border-radius: 4px;"></div>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <div style="margin-bottom: 24px;">
              <p style="margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af;">From</p>
              <p style="margin: 0; font-size: 16px; font-weight: 600;">${name} &lt;<a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a>&gt;</p>
            </div>
            
            <div style="margin-bottom: 24px;">
              <p style="margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af;">Subject</p>
              <p style="margin: 0; font-size: 16px; font-weight: 600;">${subject}</p>
            </div>
            
            <div>
              <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af;">Message</p>
              <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 8px; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #d1d5db;">${message}</div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="padding: 20px 30px; background-color: rgba(0, 0, 0, 0.2); border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #6b7280;">This message was sent from your portfolio website contact form.</p>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"${name}" <${userEmail}>`, // Gmail requires 'from' to be the authenticated user
      to: toEmail,
      subject: `New Contact Request: ${subject} (from ${name})`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: htmlBody,
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

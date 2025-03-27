import { contactFormSchema } from './schema';
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  console.log("[Contact API] Received contact form submission");
  console.log("[Contact API] Request body:", req.body);

  try {
    // Validate the incoming data
    console.log("[Contact API] Validating request data...");
    const result = contactFormSchema.parse(req.body);
    console.log("[Contact API] Data validation successful");

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587", 10),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    await transporter.verify();
    console.log("[Contact API] Email transporter verified successfully");

    // Send email
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: "muretovr@gmail.com",
      replyTo: result.email,
      subject: `New Contact Message from ${result.name}: ${result.subject}`,
      text: `Name: ${result.name}\nEmail: ${result.email}\nSubject: ${result.subject}\nMessage:\n${result.message}`,
      html: `<p><strong>Name:</strong> ${result.name}</p>
             <p><strong>Email:</strong> <a href="mailto:${result.email}">${result.email}</a></p>
             <p><strong>Subject:</strong> ${result.subject}</p>
             <p><strong>Message:</strong></p>
             <p>${result.message.replace(/\n/g, '<br>')}</p>`,
    };

    console.log("[Contact API] Attempting to send email...");
    await transporter.sendMail(mailOptions);
    console.log("[Contact API] Email sent successfully");

    // Return success response
    res.status(200).json({
      success: true,
      message: "Message sent successfully. Thank you for reaching out!",
    });
  } catch (error) {
    console.error("[Contact API] Error processing request:", error);
    
    if (error instanceof z.ZodError) {
      // Handle validation errors
      const validationError = fromZodError(error);
      console.error("[Contact API] Validation error:", validationError.details);
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationError.details,
      });
    } else {
      // Handle email sending errors or other errors
      console.error("[Contact API] Server error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to send your message. Please try again later.",
      });
    }
  }
} 
import type { Express } from "express";
import { createServer, type Server } from "http";
// Remove storage import as it's no longer used for contact messages
// import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z, ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import nodemailer from "nodemailer"; // Import nodemailer

export async function registerRoutes(app: Express): Promise<Server> {
  // --- Nodemailer Transporter Setup ---
  // Ensure environment variables are set for email configuration
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // e.g., 'smtp.gmail.com'
    port: parseInt(process.env.EMAIL_PORT || "587", 10), // e.g., 587 or 465
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  // Verify transporter configuration on startup (optional but recommended)
  try {
    await transporter.verify();
    console.log("Nodemailer transporter is ready to send emails.");
  } catch (error) {
    console.error("Error verifying Nodemailer transporter:", error);
    // Consider exiting if email is critical: process.exit(1);
  }
  // --- End Nodemailer Setup ---

  // Contact form submission route - Modified to send email
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the incoming data
      const result = insertContactMessageSchema.parse(req.body);

      // --- Send Email ---
      const mailOptions = {
        from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`, // Sender address (must be your authenticated user)
        to: "muretovr@gmail.com", // Your receiving email address
        replyTo: result.email, // Set Reply-To to the sender's email
        subject: `New Contact Message from ${result.name}`,
        text: `Name: ${result.name}\nEmail: ${result.email}\nMessage:\n${result.message}`,
        html: `<p><strong>Name:</strong> ${result.name}</p>
               <p><strong>Email:</strong> <a href="mailto:${result.email}">${result.email}</a></p>
               <p><strong>Message:</strong></p>
               <p>${result.message.replace(/\n/g, '<br>')}</p>`,
      };

      await transporter.sendMail(mailOptions);
      // --- End Send Email ---

      // Return success response
      res.status(200).json({ // Changed status to 200 OK as nothing is created
        success: true,
        message: "Message sent successfully. Thank you for reaching out!",
        // Removed id as it's no longer relevant
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.details,
        });
      } else {
        // Handle email sending errors or other errors
        console.error("Error processing contact message:", error);
        res.status(500).json({
          success: false,
          message: "Failed to send your message. Please try again later.",
        });
      }
    }
  });

  // Remove the GET /api/contact route as messages are no longer stored
  // app.get("/api/contact", async (req, res) => { ... });

  const httpServer = createServer(app);

  return httpServer;
}

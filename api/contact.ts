import type { VercelRequest, VercelResponse } from '@vercel/node';
import { contactFormSchema } from "./schema";
import nodemailer from "nodemailer";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Only allow POST method
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  console.log('Contact form submission received:', request.body);

  try {
    // Validate the request body
    const result = contactFormSchema.parse(request.body);
    
    console.log('Validation passed, creating transporter with config:', {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        // password hidden for security
      }
    });

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587", 10),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter
    try {
      await transporter.verify();
      console.log('Transporter verified successfully');
    } catch (error) {
      console.error('Transporter verification failed:', error);
      throw error;
    }

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: "muretovr@gmail.com",
      replyTo: result.email,
      subject: `New Contact Message from ${result.name}: ${result.subject}`,
      text: `Name: ${result.name}\nEmail: ${result.email}\nSubject: ${result.subject}\nMessage:\n${result.message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${result.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${result.email}">${result.email}</a></p>
        <p><strong>Subject:</strong> ${result.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${result.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    console.log('Attempting to send email with options:', {
      ...mailOptions,
      text: '[Content hidden for privacy]',
      html: '[Content hidden for privacy]',
    });

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    return response.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return response.status(500).json({ 
      error: 'Failed to send message',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
} 
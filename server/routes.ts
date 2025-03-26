import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission route
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the incoming data
      const result = insertContactMessageSchema.parse(req.body);
      
      // Store the message
      const savedMessage = await storage.createContactMessage(result);
      
      // Return success response
      res.status(201).json({
        success: true,
        message: "Message received. Thank you for reaching out!",
        id: savedMessage.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.details
        });
      } else {
        // Handle other errors
        console.error("Error saving contact message:", error);
        res.status(500).json({
          success: false,
          message: "Failed to save your message. Please try again later."
        });
      }
    }
  });

  // Get all contact messages (for potential admin dashboard)
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch messages"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

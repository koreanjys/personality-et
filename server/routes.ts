import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTestResultSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Save test result
  app.post("/api/test-results", async (req, res) => {
    try {
      const validatedData = insertTestResultSchema.parse(req.body);
      const result = await storage.saveTestResult(validatedData);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  // Get test result
  app.get("/api/test-results/:id", async (req, res) => {
    try {
      const result = await storage.getTestResult(req.params.id);
      if (!result) {
        res.status(404).json({ error: "Test result not found" });
        return;
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch test result" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

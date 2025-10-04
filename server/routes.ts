import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAnalysisSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/analyze", async (req, res) => {
    try {
      const data = insertAnalysisSchema.parse(req.body);
      const analysis = await storage.createAnalysis(data);
      res.json(analysis);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/analyses", async (req, res) => {
    try {
      const { search } = req.query;
      const analyses = search
        ? await storage.searchAnalyses(search as string)
        : await storage.getAllAnalyses();
      res.json(analyses);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analyses/:id", async (req, res) => {
    try {
      const analysis = await storage.getAnalysis(req.params.id);
      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }
      res.json(analysis);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/analyses/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteAnalysis(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Analysis not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

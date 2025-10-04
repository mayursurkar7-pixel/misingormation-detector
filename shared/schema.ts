import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const verdictTypes = ["safe", "caution", "danger", "neutral"] as const;
export type VerdictType = typeof verdictTypes[number];

export const analysisSchema = z.object({
  id: z.string(),
  claim: z.string(),
  context: z.string().optional(),
  verdict: z.enum(verdictTypes),
  reasoning: z.string(),
  confidenceScore: z.number().min(0).max(100),
  impactMode: z.boolean(),
  analyzedAt: z.date(),
  sourceUrls: z.array(z.string()).optional(),
});

export const insertAnalysisSchema = analysisSchema.omit({ id: true, analyzedAt: true });

export type Analysis = z.infer<typeof analysisSchema>;
export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;

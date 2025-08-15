import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const testResults = pgTable("test_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personalityType: text("personality_type").notNull(),
  egenTetoType: text("egen_teto_type").notNull(),
  answers: jsonb("answers").notNull(),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const insertTestResultSchema = createInsertSchema(testResults).pick({
  personalityType: true,
  egenTetoType: true,
  answers: true,
});

export type InsertTestResult = z.infer<typeof insertTestResultSchema>;
export type TestResult = typeof testResults.$inferSelect;

// Question interface
export interface Question {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  type: "EI" | "SN" | "TF" | "JP" | "ET";
}

// Answer type
export interface Answer {
  questionId: number;
  selectedOption: "A" | "B";
}

// Result type description
export interface ResultDescription {
  description: string;
  bestMatch: string;
  bestMatchDesc: string;
  worstMatch: string;
  worstMatchDesc: string;
}

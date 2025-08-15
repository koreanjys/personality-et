import { type TestResult, type InsertTestResult } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  saveTestResult(result: InsertTestResult): Promise<TestResult>;
  getTestResult(id: string): Promise<TestResult | undefined>;
}

export class MemStorage implements IStorage {
  private results: Map<string, TestResult>;

  constructor() {
    this.results = new Map();
  }

  async saveTestResult(insertResult: InsertTestResult): Promise<TestResult> {
    const id = randomUUID();
    const result: TestResult = { 
      ...insertResult, 
      id,
      createdAt: new Date().toISOString()
    };
    this.results.set(id, result);
    return result;
  }

  async getTestResult(id: string): Promise<TestResult | undefined> {
    return this.results.get(id);
  }
}

export const storage = new MemStorage();

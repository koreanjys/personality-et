// 프로젝트에서 사용하는 타입 정의
export interface Question {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  type: string;
  dimensionA?: string;
  dimensionB?: string;
}

export interface Answer {
  questionId: number;
  selectedOption: 'A' | 'B';
  dimension: string;
}

// result-calculator.ts에서 정의된 타입을 re-export
export type { ResultDescription } from "@/lib/result-calculator";

export interface TestResult {
  id: string;
  personalityType: string;
  character: string;
  answers: Answer[];
  result: any; // ResultDescription from result-calculator
  createdAt: Date;
}

// Zod 스키마는 제거하고 기본 타입만 사용
export const insertTestResultSchema = {
  parse: (data: any) => data // 기본적인 파싱만 수행
};

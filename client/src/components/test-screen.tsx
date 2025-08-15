import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Question } from "@shared/schema";

interface TestScreenProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onSelectOption: (option: "A" | "B") => void;
}

export function TestScreen({ 
  question, 
  currentQuestionIndex, 
  totalQuestions, 
  onSelectOption 
}: TestScreenProps) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div data-testid="test-screen">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">진행률</span>
          <span className="text-sm font-medium text-primary" data-testid="text-progress">
            {currentQuestionIndex + 1} / {totalQuestions}
          </span>
        </div>
        <Progress value={progress} className="h-2" data-testid="progress-bar" />
      </div>

      {/* Question card */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-8 md:p-12">
          <div className="text-center mb-8">
            <span className="text-primary font-semibold text-lg" data-testid="text-question-number">
              질문 {currentQuestionIndex + 1}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-4 mb-8" data-testid="text-question">
              {question.question}
            </h2>
          </div>
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <Button
              onClick={() => onSelectOption("A")}
              variant="outline"
              className="w-full p-6 text-left bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-primary group h-auto"
              data-testid="button-option-a"
            >
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-primary mr-4 flex-shrink-0"></div>
                <span className="text-slate-800 font-medium text-left">{question.optionA}</span>
              </div>
            </Button>
            
            <Button
              onClick={() => onSelectOption("B")}
              variant="outline"
              className="w-full p-6 text-left bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-primary group h-auto"
              data-testid="button-option-b"
            >
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-primary mr-4 flex-shrink-0"></div>
                <span className="text-slate-800 font-medium text-left">{question.optionB}</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

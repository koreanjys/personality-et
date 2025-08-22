import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";
import type { Question } from "@/types";

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
  const { t } = useTranslation();
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div data-testid="test-screen">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">{t('test.progressLabel', '진행률')}</span>
          <span className="text-sm font-medium text-primary" data-testid="text-progress">
            {t('test.progress', { current: currentQuestionIndex + 1, total: totalQuestions })}
          </span>
        </div>
        <Progress value={progress} className="h-2" data-testid="progress-bar" />
      </div>

      {/* Question card */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-6 md:p-8 lg:p-12">
          <div className="text-center mb-6 md:mb-8">
            <span className="text-primary font-semibold text-base md:text-lg" data-testid="text-question-number">
              {t('test.questionNumber', { number: currentQuestionIndex + 1 })}
            </span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mt-3 md:mt-4 mb-6 md:mb-8 leading-tight px-2" data-testid="text-question">
              {question.question}
            </h2>
          </div>
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <Button
              onClick={() => onSelectOption("A")}
              variant="outline"
              className="w-full p-4 md:p-6 text-left bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-primary group h-auto min-h-[60px]"
              data-testid="button-option-a"
            >
              <div className="flex items-start">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-slate-300 group-hover:border-primary mr-3 md:mr-4 flex-shrink-0 mt-0.5"></div>
                <span className="text-slate-800 font-medium text-left text-sm md:text-base leading-relaxed break-words">{question.optionA}</span>
              </div>
            </Button>
            
            <Button
              onClick={() => onSelectOption("B")}
              variant="outline"
              className="w-full p-4 md:p-6 text-left bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-primary group h-auto min-h-[60px]"
              data-testid="button-option-b"
            >
              <div className="flex items-start">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-slate-300 group-hover:border-primary mr-3 md:mr-4 flex-shrink-0 mt-0.5"></div>
                <span className="text-slate-800 font-medium text-left text-sm md:text-base leading-relaxed break-words">{question.optionB}</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

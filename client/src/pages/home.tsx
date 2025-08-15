import { useState } from "react";
import { Brain } from "lucide-react";
import { WelcomeScreen } from "@/components/welcome-screen";
import { TestScreen } from "@/components/test-screen";
import { LoadingScreen } from "@/components/loading-screen";
import { ResultScreen } from "@/components/result-screen";
import { questions } from "@/lib/test-data";
import { calculateScores, getPersonalityType, getResultDescription } from "@/lib/result-calculator";
import type { Answer } from "@shared/schema";

type Screen = "welcome" | "test" | "loading" | "result";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [personalityType, setPersonalityType] = useState("");
  const [resultDescription, setResultDescription] = useState({
    description: "",
    bestMatch: "",
    bestMatchDesc: "",
    worstMatch: "",
    worstMatchDesc: ""
  });

  const handleStartTest = () => {
    setCurrentScreen("test");
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleSelectOption = (option: "A" | "B") => {
    const newAnswer: Answer = {
      questionId: questions[currentQuestionIndex].id,
      selectedOption: option
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 200);
    } else {
      setCurrentScreen("loading");
    }
  };

  const handleLoadingComplete = () => {
    const scores = calculateScores(answers);
    const type = getPersonalityType(scores);
    const description = getResultDescription(type);

    setPersonalityType(type);
    setResultDescription(description);
    setCurrentScreen("result");
  };

  const handleShareResult = () => {
    const shareText = `나의 성향 테스트 결과: ${personalityType}! 당신도 테스트해보세요! #성향테스트 #에겐테토`;
    
    if (navigator.share) {
      navigator.share({
        title: '성향 & 에겐-테토 궁합 테스트',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText + ' ' + window.location.href).then(() => {
        alert('결과가 클립보드에 복사되었습니다!');
      });
    }
  };

  const handleRestartTest = () => {
    setCurrentScreen("welcome");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setPersonalityType("");
  };

  const handleDownloadResult = () => {
    alert('결과 저장 기능은 준비중입니다!');
  };

  return (
    <div className="min-h-screen flex flex-col" data-testid="app">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800" data-testid="text-app-title">
                <Brain className="inline text-primary mr-3" />
                성향 & 에겐-테토 궁합 테스트
              </h1>
              <p className="text-slate-600 mt-2" data-testid="text-app-subtitle">
                당신의 성향과 연애 스타일을 발견해보세요
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {currentScreen === "welcome" && (
            <WelcomeScreen onStartTest={handleStartTest} />
          )}
          
          {currentScreen === "test" && (
            <TestScreen
              question={questions[currentQuestionIndex]}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              onSelectOption={handleSelectOption}
            />
          )}

          {currentScreen === "loading" && (
            <LoadingScreen onComplete={handleLoadingComplete} />
          )}

          {currentScreen === "result" && (
            <ResultScreen
              personalityType={personalityType}
              resultDescription={resultDescription}
              onShareResult={handleShareResult}
              onRestartTest={handleRestartTest}
              onDownloadResult={handleDownloadResult}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-slate-500">
            <p className="mb-2" data-testid="text-copyright">
              © 2024 성향 & 에겐-테토 궁합 테스트. All rights reserved.
            </p>
            <p className="text-sm" data-testid="text-disclaimer">
              이 테스트는 재미와 자기 이해를 위한 것입니다. 전문적인 심리 상담을 대체하지 않습니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

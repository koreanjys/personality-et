import { useState } from "react";
import html2canvas from "html2canvas";
import { Brain } from "lucide-react";
import { WelcomeScreen } from "@/components/welcome-screen";
import { TestScreen } from "@/components/test-screen";
import { LoadingScreen } from "@/components/loading-screen";
import { ResultScreen } from "@/components/result-screen";
import { questions } from "@/lib/test-data";
import { calculatePersonalityType, getResultDescription } from "@/lib/result-calculator";
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
    const type = calculatePersonalityType(answers);
    const description = getResultDescription(type);

    setPersonalityType(type);
    setResultDescription(description);
    setCurrentScreen("result");
  };

  const handleShareResult = () => {
    console.log('handleShareResult 호출됨');
    const shareText = `나의 성향 테스트 결과: ${personalityType}! 당신도 테스트해보세요! #성향테스트 #에겐테토`;
    
    if (navigator.share) {
      console.log('네이티브 공유 사용');
      navigator.share({
        title: '성향 & 에겐-테토 궁합 테스트',
        text: shareText,
        url: window.location.href
      });
    } else {
      console.log('클립보드 복사 사용');
      navigator.clipboard.writeText(shareText + ' ' + window.location.href).then(() => {
        alert('결과가 클립보드에 복사되었습니다!');
      });
    }
  };

  const handleRestartTest = () => {
    console.log('handleRestartTest 호출됨');
    setCurrentScreen("welcome");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setPersonalityType("");
  };

  const handleDownloadResult = async () => {
    console.log('handleDownloadResult 호출됨');
    
    try {
      // 결과 화면을 찾습니다
      const resultElement = document.querySelector('[data-testid="result-screen"]') as HTMLElement;
      
      if (!resultElement) {
        alert('결과 화면을 찾을 수 없습니다.');
        return;
      }

      // 스크롤을 맨 위로 이동
      window.scrollTo(0, 0);
      
      // 잠시 대기 (스크롤 애니메이션 완료 대기)
      await new Promise(resolve => setTimeout(resolve, 100));

      // HTML을 캔버스로 변환
      const canvas = await html2canvas(resultElement, {
        scale: 2, // 고해상도를 위해 스케일 증가
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: resultElement.scrollWidth,
        height: resultElement.scrollHeight,
      });

      // 캔버스를 blob으로 변환
      canvas.toBlob((blob) => {
        if (blob) {
          // 다운로드 링크 생성
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `성향테스트_결과_${personalityType}_${new Date().getTime()}.png`;
          
          // 다운로드 실행
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // 메모리 해제
          URL.revokeObjectURL(url);
          
          alert('결과가 이미지로 저장되었습니다!');
        }
      }, 'image/png');
      
    } catch (error) {
      console.error('결과 저장 중 오류 발생:', error);
      alert('결과 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
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

import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { Brain } from "lucide-react";
import { useTranslation } from "react-i18next";
import { WelcomeScreen } from "@/components/welcome-screen";
import { TestScreen } from "@/components/test-screen";
import { LoadingScreen } from "@/components/loading-screen";
import { ResultScreen } from "@/components/result-screen";
import { questions, useLocalizedQuestions } from "@/lib/test-data";
import { calculatePersonalityType, getResultDescription } from "@/lib/result-calculator";
import type { Answer } from "@shared/schema";

type Screen = "welcome" | "test" | "loading" | "result";

export default function Home() {
  const { t } = useTranslation();
  const localizedQuestions = useLocalizedQuestions();
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
  const [isLoadingSharedResult, setIsLoadingSharedResult] = useState(false);

  // URL에서 공유된 결과 확인
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resultId = urlParams.get('id');
    const result = urlParams.get('result');
    const type = urlParams.get('type');
    
    if (resultId) {
      // 결과 ID 형식 확인 (MBTI-character)
      const match = resultId.match(/^([A-Z]{4})-(eigen|teto)$/);
      
      if (match) {
        const [, personalityType, characterEn] = match;
        const character = characterEn === 'eigen' ? '에겐' : '테토';
        
        // 성향과 캐릭터 정보로 결과 재계산
        setPersonalityType(personalityType);
        
        // 결과 설명 계산 (전체 키 형태로 조회)
        const fullKey = `${personalityType} + ${character}`;
        const calculatedResult = getResultDescription(fullKey);
        
        setResultDescription(calculatedResult);
        setCurrentScreen("result");
        
        console.log(`공유된 결과 로드 완료: ${personalityType} - ${character}`);
      } else {
        console.error('잘못된 결과 ID 형식:', resultId);
        alert('잘못된 공유 링크입니다.');
      }
    } else if (result && type) {
      try {
        // 기존 긴 URL 방식 지원 (하위 호환성)
        const decodedResult = JSON.parse(decodeURIComponent(result));
        setPersonalityType(type);
        setResultDescription(decodedResult);
        setCurrentScreen("result");
      } catch (error) {
        console.error('공유된 결과 로드 중 오류:', error);
      }
    }
  }, []);

  // 브라우저 뒤로가기 감지
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (!urlParams.has('result') && !urlParams.has('id')) {
        setCurrentScreen("welcome");
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setPersonalityType("");
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleStartTest = () => {
    setCurrentScreen("test");
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleSelectOption = (option: "A" | "B") => {
    const newAnswer: Answer = {
      questionId: localizedQuestions[currentQuestionIndex].id,
      selectedOption: option
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < localizedQuestions.length - 1) {
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

  const handleShareResult = async () => {
    console.log('handleShareResult 호출됨');
    const shareText = t('result.shareText', { type: personalityType });
    
    try {
      // 최고 궁합 캐릭터 찾기 (bestMatch에서 캐릭터 부분만 추출)
      const bestMatch = resultDescription.bestMatch;
      let character = '';
      
      if (bestMatch.includes('에겐')) {
        character = '에겐';
      } else if (bestMatch.includes('테토')) {
        character = '테토';
      } else {
        // 기본값으로 에겐 설정
        character = '에겐';
      }
      
      // 영문 캐릭터명 변환
      const characterEn = character === '에겐' ? 'eigen' : 'teto';
      const resultId = `${personalityType}-${characterEn}`;
      
      // 고정 URL 생성
      const shareUrl = `${window.location.origin}${window.location.pathname}?id=${resultId}`;
      
      if (navigator.share) {
        console.log('네이티브 공유 사용');
        navigator.share({
          title: t('common.appTitle'),
          text: shareText,
          url: shareUrl
        });
      } else {
        console.log('클립보드 복사 사용');
        navigator.clipboard.writeText(shareText + ' ' + shareUrl).then(() => {
          alert('결과가 클립보드에 복사되었습니다!');
        });
      }
    } catch (error) {
      console.error('결과 공유 중 오류:', error);
      // 실패 시 기존 방식으로 폴백
      const resultData = encodeURIComponent(JSON.stringify(resultDescription));
      const shareUrl = `${window.location.origin}${window.location.pathname}?type=${encodeURIComponent(personalityType)}&result=${resultData}`;
      
      if (navigator.share) {
        navigator.share({
          title: t('common.appTitle'),
          text: shareText,
          url: shareUrl
        });
      } else {
        navigator.clipboard.writeText(shareText + ' ' + shareUrl).then(() => {
          alert('결과가 클립보드에 복사되었습니다!');
        });
      }
    }
  };

  const handleRestartTest = () => {
    console.log('handleRestartTest 호출됨');
    setCurrentScreen("welcome");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setPersonalityType("");
    
    // URL 파라미터 초기화
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url.toString());
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
                {t('common.appTitle')}
              </h1>
              <p className="text-slate-600 mt-2" data-testid="text-app-subtitle">
                {t('common.appSubtitle')}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {isLoadingSharedResult && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-slate-600">{t('loading.loadingSharedResult', '공유된 결과를 불러오는 중...')}</p>
            </div>
          )}

          {!isLoadingSharedResult && currentScreen === "welcome" && (
            <WelcomeScreen onStartTest={handleStartTest} />
          )}

          {!isLoadingSharedResult && currentScreen === "test" && (
            <TestScreen
              question={localizedQuestions[currentQuestionIndex]}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={localizedQuestions.length}
              onSelectOption={handleSelectOption}
            />
          )}

          {!isLoadingSharedResult && currentScreen === "loading" && (
            <LoadingScreen onComplete={handleLoadingComplete} />
          )}

          {!isLoadingSharedResult && currentScreen === "result" && (
            <ResultScreen
              personalityType={personalityType}
              resultDescription={resultDescription}
              onShareResult={handleShareResult}
              onRestartTest={handleRestartTest}
              onDownloadResult={handleDownloadResult}
              isSharedResult={new URLSearchParams(window.location.search).has('result') || new URLSearchParams(window.location.search).has('id')}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-slate-500">
            <p className="mb-2" data-testid="text-copyright">
              © 2024 {t('common.appTitle')}. All rights reserved.
            </p>
            <p className="text-sm" data-testid="text-disclaimer">
              {t('common.disclaimer')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

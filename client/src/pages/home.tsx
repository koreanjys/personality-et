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
import { updateMetaData, generateResultMetaData, generateHomeMetaData, detectBrowserLanguage, isCurrentLanguageKorean } from "@/lib/meta-utils";
import type { Answer } from "@/types";

type Screen = "welcome" | "test" | "loading" | "result";

export default function Home() {
  const { t, i18n } = useTranslation();
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

  // 홈페이지에서 메타데이터 업데이트 (언어 변경 시에도 반응)
  useEffect(() => {
    if (currentScreen !== "result") {
      const isKorean = isCurrentLanguageKorean(i18n.language);
      const metaData = generateHomeMetaData(isKorean);
      updateMetaData(metaData);
      
      console.log(`홈페이지 메타데이터 업데이트됨 (${isKorean ? '한국어' : '영어'})`);
    }
  }, [currentScreen, i18n.language]); // 홈페이지가 아닌 경우에만 실행

  // 결과 화면에서 메타데이터 업데이트 (언어 변경 시에도 반응)
  useEffect(() => {
    if (currentScreen === "result" && personalityType) {
      const isKorean = isCurrentLanguageKorean(i18n.language);
      const metaData = generateResultMetaData(personalityType, isKorean);
      updateMetaData(metaData);
      
      console.log(`메타데이터 업데이트됨 (${isKorean ? '한국어' : '영어'}):`, personalityType);
    }
  }, [currentScreen, personalityType, i18n.language]); // i18n.language 의존성 추가

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
        const [, mbtiType, characterEn] = match;
        const character = characterEn === 'eigen' ? '에겐' : '테토';
        
        // 전체 personalityType 재구성
        const fullPersonalityType = `${mbtiType} + ${character}`;
        setPersonalityType(fullPersonalityType);
        
        // 결과 설명 계산
        const calculatedResult = getResultDescription(fullPersonalityType);
        
        setResultDescription(calculatedResult);
        setCurrentScreen("result");
        
        console.log(`공유된 결과 로드 완료: ${fullPersonalityType}`);
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
    const currentQuestion = localizedQuestions[currentQuestionIndex];
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedOption: option,
      dimension: currentQuestion.type
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
      // personalityType에서 MBTI와 캐릭터 분리 (예: "ENFJ + 테토" -> ["ENFJ", "테토"])
      const parts = personalityType.split(' + ');
      const mbtiType = parts[0]; // "ENFJ"
      const character = parts[1]; // "테토"
      
      // 영문 캐릭터명 변환
      const characterEn = character === '에겐' ? 'eigen' : 'teto';
      const resultId = `${mbtiType}-${characterEn}`;
      
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

      // 모바일 기기 감지
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // 모바일에서는 이미지를 직접 표시하여 사용자가 길게 눌러 저장할 수 있게 함
        const imageDataUrl = canvas.toDataURL('image/png', 1.0);
        
        // 전체 화면 오버레이 생성
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.95);
          z-index: 10000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          box-sizing: border-box;
        `;
        
        // 안내 메시지
        const instructions = document.createElement('div');
        instructions.style.cssText = `
          background: white;
          padding: 20px;
          border-radius: 15px;
          margin-bottom: 20px;
          text-align: center;
          max-width: 90%;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        instructions.innerHTML = `
          <h3 style="margin: 0 0 15px 0; font-size: 18px; color: #333;">📱 사진첩에 저장하기</h3>
          <p style="margin: 0 0 10px 0; font-size: 14px; color: #666; line-height: 1.4;">
            아래 이미지를 <strong style="color: #e11d48;">길게 눌러서</strong><br>
            "이미지 저장" 또는 "사진에 저장"을 선택해주세요
          </p>
          <p style="margin: 0; font-size: 12px; color: #888;">
            저장 후 뒤로가기 버튼으로 돌아가세요
          </p>
        `;
        
        // 이미지 엘리먼트
        const img = document.createElement('img');
        img.src = imageDataUrl;
        img.style.cssText = `
          max-width: 90%;
          max-height: 60%;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          touch-action: manipulation;
        `;
        
        // 닫기 버튼
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕ 닫기';
        closeButton.style.cssText = `
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255,255,255,0.9);
          border: none;
          padding: 10px 15px;
          border-radius: 20px;
          font-size: 14px;
          cursor: pointer;
          z-index: 10001;
        `;
        
        // 이미지 로드 후 스크롤 방지
        document.body.style.overflow = 'hidden';
        
        // 오버레이 제거 시 스크롤 복원 함수
        const removeOverlay = () => {
          document.body.style.overflow = '';
          document.body.removeChild(overlay);
        };
        
        // 닫기 버튼과 배경 클릭 이벤트 수정
        closeButton.onclick = removeOverlay;
        overlay.onclick = (e) => {
          if (e.target === overlay) {
            removeOverlay();
          }
        };
        
        // 요소들 추가
        overlay.appendChild(closeButton);
        overlay.appendChild(instructions);
        overlay.appendChild(img);
        document.body.appendChild(overlay);
        
      } else {
        // 데스크톱에서는 기존 다운로드 방식
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `성향테스트_결과_${personalityType}_${new Date().getTime()}.png`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            alert('결과가 이미지로 저장되었습니다!');
          }
        }, 'image/png');
      }
      
    } catch (error) {
      console.error('결과 저장 중 오류 발생:', error);
      alert('결과 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-full overflow-x-hidden" data-testid="app">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 max-w-full overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 py-6 max-w-full overflow-x-hidden">
          <div className="flex items-center justify-center max-w-full overflow-x-hidden">
            <div className="text-center max-w-full overflow-x-hidden">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 break-all overflow-wrap-anywhere" data-testid="text-app-title">
                <Brain className="inline text-primary mr-3" />
                {t('common.appTitle')}
              </h1>
              <p className="text-slate-600 mt-2 break-all overflow-wrap-anywhere" data-testid="text-app-subtitle">
                {t('common.appSubtitle')}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 max-w-full overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 max-w-full overflow-x-hidden">
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
      <footer className="bg-white border-t border-slate-200 mt-16 max-w-full overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 py-8 max-w-full overflow-x-hidden">
          <div className="text-center text-slate-500 max-w-full overflow-x-hidden">
            <p className="mb-2 break-all overflow-wrap-anywhere" data-testid="text-copyright">
              © 2024 {t('common.appTitle')}. All rights reserved.
            </p>
            <p className="text-sm break-all overflow-wrap-anywhere" data-testid="text-disclaimer">
              {t('common.disclaimer')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

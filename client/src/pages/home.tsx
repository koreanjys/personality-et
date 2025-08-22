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
import type { Answer } from "@/types";

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
      
      // 캔버스를 blob으로 변환
      canvas.toBlob(async (blob) => {
        if (blob) {
          const filename = `성향테스트_결과_${personalityType}_${new Date().getTime()}.png`;
          
          // 모바일에서 갤러리 저장 시도
          if (isMobile) {
            try {
              // ClipboardAPI를 사용하여 이미지를 클립보드에 복사
              if (navigator.clipboard && window.ClipboardItem) {
                const clipboardItem = new ClipboardItem({
                  'image/png': blob
                });
                await navigator.clipboard.write([clipboardItem]);
                
                alert('이미지가 클립보드에 복사되었습니다!\n\n사진첩에 저장하려면:\n1. 사진 앱을 열어주세요\n2. 새 사진 만들기 또는 붙여넣기를 선택해주세요\n3. 클립보드의 이미지가 갤러리에 저장됩니다');
                return;
              }
              
              // ClipboardAPI가 지원되지 않는 경우, 이미지를 새 탭에 열기
              const imageUrl = URL.createObjectURL(blob);
              const newWindow = window.open('', '_blank');
              
              if (newWindow) {
                newWindow.document.write(`
                  <html>
                    <head>
                      <title>테스트 결과 - 길게 눌러서 저장하세요</title>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <style>
                        body { 
                          margin: 0; 
                          padding: 20px; 
                          background: #f0f0f0; 
                          text-align: center;
                          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                        }
                        .instructions {
                          background: #fff;
                          padding: 15px;
                          border-radius: 10px;
                          margin-bottom: 20px;
                          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        }
                        img { 
                          max-width: 100%; 
                          height: auto; 
                          border-radius: 10px;
                          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                        }
                      </style>
                    </head>
                    <body>
                      <div class="instructions">
                        <h3>📱 사진첩에 저장하기</h3>
                        <p>아래 이미지를 <strong>길게 눌러서</strong> "이미지 저장" 또는 "사진에 저장"을 선택해주세요</p>
                      </div>
                      <img src="${imageUrl}" alt="성향 테스트 결과" />
                    </body>
                  </html>
                `);
                newWindow.document.close();
                
                // 메모리 해제를 위한 타임아웃
                setTimeout(() => URL.revokeObjectURL(imageUrl), 60000);
                return;
              }
              
            } catch (mobileError) {
              console.log('모바일 갤러리 저장 실패, 다운로드로 대체:', mobileError);
            }
          }

          // 일반 다운로드 (데스크톱 또는 모바일 갤러리 저장 실패 시)
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          
          // 다운로드 실행
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // 메모리 해제
          URL.revokeObjectURL(url);
          
          if (isMobile) {
            alert('파일이 다운로드되었습니다.\n\n브라우저의 다운로드 폴더에서 파일을 찾아 갤러리로 이동시켜주세요.');
          } else {
            alert('결과가 이미지로 저장되었습니다!');
          }
        }
      }, 'image/png');
      
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

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Heart, X, Share, RotateCcw, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ResultDescription } from "@shared/schema";

interface ResultScreenProps {
  personalityType: string;
  resultDescription: ResultDescription;
  onShareResult: () => void;
  onRestartTest: () => void;
  onDownloadResult: () => void;
}

export function ResultScreen({ 
  personalityType, 
  resultDescription, 
  onShareResult, 
  onRestartTest, 
  onDownloadResult 
}: ResultScreenProps) {
  const { t } = useTranslation();

  // 번역 키 생성 (공백과 플러스 기호를 언더스코어로 변경)
  const personalityKey = personalityType.replace(/\s+/g, '_').replace(/\+/g, '+');
  
  // 번역된 설명 가져오기 (fallback으로 기존 데이터 사용)
  const getLocalizedText = (key: string, fallback: string) => {
    const translatedText = t(`personalities.${personalityKey}.${key}`, { defaultValue: '' });
    return translatedText || fallback;
  };

  // 캐릭터명 번역 함수
  const translateCharacterName = (text: string) => {
    return text
      .replace(/에겐/g, t('characters.에겐'))
      .replace(/테토/g, t('characters.테토'));
  };

  // 성격 유형 이름에서 캐릭터명 번역
  const translatedPersonalityType = translateCharacterName(personalityType);
  const translatedBestMatch = translateCharacterName(getLocalizedText('bestMatch', resultDescription.bestMatch));
  const translatedWorstMatch = translateCharacterName(getLocalizedText('worstMatch', resultDescription.worstMatch));
  const translatedBestMatchDesc = translateCharacterName(getLocalizedText('bestMatchDesc', resultDescription.bestMatchDesc));
  const translatedWorstMatchDesc = translateCharacterName(getLocalizedText('worstMatchDesc', resultDescription.worstMatchDesc));

  return (
    <div className="space-y-8" data-testid="result-screen">
      {/* Main result card */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-8 md:p-12 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6">
              <User className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4" data-testid="text-result-title">
              {t('result.title')}
            </h2>
            
                        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 mb-6">
              <div className="text-3xl md:text-4xl font-bold text-white" data-testid="text-personality-type">
                {translatedPersonalityType}
              </div>
              <p className="text-indigo-100 mt-2">{t('result.personalityType')}</p>
            </div>
            
            <div className="text-left">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">{t('result.description')}</h3>
              <p className="text-slate-600 leading-relaxed" data-testid="text-description">
                {getLocalizedText('description', resultDescription.description)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compatibility cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Best match */}
        <Card className="rounded-2xl shadow-lg border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mr-3">
                <Heart className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-green-700">{t('result.bestMatch')}</h3>
            </div>
            <div className="mb-3">
              <p className="text-2xl font-bold text-green-800" data-testid="text-best-match">
                {translatedBestMatch}
              </p>
            </div>
            <p className="text-slate-600 leading-relaxed" data-testid="text-best-match-desc">
              {translatedBestMatchDesc}
            </p>
          </CardContent>
        </Card>

        {/* Worst match */}
        <Card className="rounded-2xl shadow-lg border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mr-3">
                <X className="text-red-600 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-red-700">{t('result.worstMatch')}</h3>
            </div>
            <div className="mb-3">
              <p className="text-2xl font-bold text-red-800" data-testid="text-worst-match">
                {translatedWorstMatch}
              </p>
            </div>
            <p className="text-slate-600 leading-relaxed" data-testid="text-worst-match-desc">
              {translatedWorstMatchDesc}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action buttons */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onShareResult}
              className="bg-secondary hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200"
              data-testid="button-share-result"
            >
              <Share className="mr-2" />
              {t('result.shareButton')}
            </Button>
            
            <Button 
              onClick={onRestartTest}
              className="bg-slate-500 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200"
              data-testid="button-restart-test"
            >
              <RotateCcw className="mr-2" />
              {t('result.restartButton')}
            </Button>
            
            <Button 
              onClick={onDownloadResult}
              className="bg-accent hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200"
              data-testid="button-download-result"
            >
              <Download className="mr-2" />
              {t('result.downloadButton')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

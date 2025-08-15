import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Heart, X, Share, RotateCcw, Download } from "lucide-react";
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
              당신의 결과
            </h2>
            
            <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 mb-6">
              <div className="text-3xl md:text-4xl font-bold text-white" data-testid="text-personality-type">
                {personalityType}
              </div>
              <p className="text-indigo-100 mt-2">당신의 성향과 연애 스타일</p>
            </div>
            
            <div className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto" data-testid="text-result-description">
              {resultDescription.description}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compatibility cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Best match */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
                <Heart className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">최고의 궁합</h3>
              <div className="text-xl font-semibold text-secondary mb-4" data-testid="text-best-match">
                {resultDescription.bestMatch}
              </div>
              <p className="text-slate-600" data-testid="text-best-match-description">
                {resultDescription.bestMatchDesc}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Worst match */}
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-4">
                <X className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">주의할 궁합</h3>
              <div className="text-xl font-semibold text-red-500 mb-4" data-testid="text-worst-match">
                {resultDescription.worstMatch}
              </div>
              <p className="text-slate-600" data-testid="text-worst-match-description">
                {resultDescription.worstMatchDesc}
              </p>
            </div>
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
              결과 공유하기
            </Button>
            
            <Button 
              onClick={onRestartTest}
              className="bg-slate-500 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200"
              data-testid="button-restart-test"
            >
              <RotateCcw className="mr-2" />
              다시 테스트하기
            </Button>
            
            <Button 
              onClick={onDownloadResult}
              className="bg-accent hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200"
              data-testid="button-download-result"
            >
              <Download className="mr-2" />
              결과 저장하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Users, Heart, Star, Play, Clock } from "lucide-react";

interface WelcomeScreenProps {
  onStartTest: () => void;
}

export function WelcomeScreen({ onStartTest }: WelcomeScreenProps) {
  return (
    <div className="text-center" data-testid="welcome-screen">
      <Card className="rounded-2xl shadow-lg mb-8">
        <CardContent className="p-8 md:p-12">
          <img 
            src="https://cdn.pixabay.com/photo/2016/03/09/04/52/winnie-1245338_1280.jpg" 
            alt="귀여운 곰인형 일러스트레이션" 
            className="w-full h-48 md:h-64 object-cover rounded-xl mb-8"
            data-testid="img-hero"
          />
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6" data-testid="text-main-title">
            나만의 성향을 발견하고<br />
            <span className="text-primary">완벽한 궁합</span>을 찾아보세요
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto" data-testid="text-description">
            10개의 간단한 질문으로 당신의 성향 유형과 에겐-테토 특성을 분석하여, 
            가장 잘 맞는 상대방의 유형까지 알려드립니다.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-slate-50 rounded-lg p-6" data-testid="card-feature-personality">
              <Users className="text-primary text-2xl mb-4 mx-auto" />
              <h3 className="font-semibold text-slate-800 mb-2">16가지 성향</h3>
              <p className="text-sm text-slate-600">과학적 근거를 바탕으로 한 성향 분석</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6" data-testid="card-feature-egenteto">
              <Heart className="text-secondary text-2xl mb-4 mx-auto" />
              <h3 className="font-semibold text-slate-800 mb-2">에겐-테토</h3>
              <p className="text-sm text-slate-600">연애 스타일과 호르몬 특성 분석</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6" data-testid="card-feature-compatibility">
              <Star className="text-accent text-2xl mb-4 mx-auto" />
              <h3 className="font-semibold text-slate-800 mb-2">궁합 분석</h3>
              <p className="text-sm text-slate-600">최적의 파트너 유형 추천</p>
            </div>
          </div>
          
          <Button 
            onClick={onStartTest}
            className="bg-primary hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            data-testid="button-start-test"
          >
            <Play className="mr-2" />
            테스트 시작하기
          </Button>
          
          <p className="text-sm text-slate-500 mt-4" data-testid="text-duration">
            <Clock className="inline mr-1" />
            약 3-5분 소요
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

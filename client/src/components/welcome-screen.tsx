import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Users, Heart, Star, Play, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

interface WelcomeScreenProps {
  onStartTest: () => void;
}

export function WelcomeScreen({ onStartTest }: WelcomeScreenProps) {
  const { t } = useTranslation();

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
            {t('welcome.title')}
          </h2>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto" data-testid="text-description">
            {t('welcome.description')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-slate-50 rounded-lg p-6" data-testid="card-feature-personality">
              <Clock className="text-primary text-2xl mb-4 mx-auto" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('welcome.features.quick')}</h3>
              <p className="text-sm text-slate-600">{t('welcome.features.quickDesc')}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6" data-testid="card-feature-egenteto">
              <Brain className="text-secondary text-2xl mb-4 mx-auto" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('welcome.features.accurate')}</h3>
              <p className="text-sm text-slate-600">{t('welcome.features.accurateDesc')}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6" data-testid="card-feature-compatibility">
              <Star className="text-accent text-2xl mb-4 mx-auto" />
              <h3 className="font-semibold text-slate-800 mb-2">{t('welcome.features.fun')}</h3>
              <p className="text-sm text-slate-600">{t('welcome.features.funDesc')}</p>
            </div>
          </div>
          
          <Button 
            onClick={onStartTest}
            className="bg-primary hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            data-testid="button-start-test"
          >
            <Play className="mr-2" />
            {t('welcome.startButton')}
          </Button>
          
          <p className="text-sm text-slate-500 mt-4" data-testid="text-duration">
            <Clock className="inline mr-1" />
            {t('welcome.totalQuestions', { count: 10 })}
          </p>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-3">
              {t('welcome.learnMore')}
            </p>
            <a 
              href="/personality-guide" 
              className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
              data-testid="link-personality-guide"
            >
              {t('welcome.personalityGuideLink')} →
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

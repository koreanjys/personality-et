import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Brain, Heart, Star, Target, Lightbulb, Shield, Compass } from "lucide-react";
import { Link } from "wouter";

export default function PersonalityGuide() {
  const { t } = useTranslation();

  const personalityTypes = [
    {
      type: "INTJ",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      type: "INTP", 
      icon: Lightbulb,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    },
    {
      type: "ENTJ",
      icon: Target,
      color: "text-red-600", 
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      type: "ENTP",
      icon: Star,
      color: "text-orange-600",
      bgColor: "bg-orange-50", 
      borderColor: "border-orange-200"
    },
    {
      type: "INFJ",
      icon: Heart,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      type: "INFP",
      icon: Compass,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200"
    },
    {
      type: "ENFJ",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      type: "ENFP",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200"
    },
    {
      type: "ISTJ",
      icon: Shield,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200"
    },
    {
      type: "ISFJ",
      icon: Heart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      type: "ESTJ",
      icon: Target,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    },
    {
      type: "ESFJ",
      icon: Users,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200"
    },
    {
      type: "ISTP",
      icon: Lightbulb,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    },
    {
      type: "ISFP",
      icon: Compass,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200"
    },
    {
      type: "ESTP",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      type: "ESFP",
      icon: Heart,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {t('common.backHome')}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Brain className="text-primary" />
              <h1 className="text-xl font-semibold text-slate-800">
                {t('personalityGuide.title')}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 소개 섹션 */}
        <Card className="rounded-2xl shadow-lg mb-12">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                {t('personalityGuide.title')}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
                {t('personalityGuide.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Brain className="text-blue-600 w-8 h-8" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{t('personalityGuide.features.scientific.title')}</h3>
                <p className="text-sm text-slate-600">{t('personalityGuide.features.scientific.desc')}</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Users className="text-green-600 w-8 h-8" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{t('personalityGuide.features.detailed.title')}</h3>
                <p className="text-sm text-slate-600">{t('personalityGuide.features.detailed.desc')}</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Star className="text-orange-600 w-8 h-8" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{t('personalityGuide.features.practical.title')}</h3>
                <p className="text-sm text-slate-600">{t('personalityGuide.features.practical.desc')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 성격유형 분류 설명 */}
        <Card className="rounded-2xl shadow-lg mb-12">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              {t('personalityGuide.dimensions.title')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h3 className="font-semibold text-slate-800 mb-3">{t('personalityGuide.dimensions.extroversion.title')}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{t('personalityGuide.dimensions.extroversion.desc')}</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-slate-800 mb-3">{t('personalityGuide.dimensions.sensing.title')}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{t('personalityGuide.dimensions.sensing.desc')}</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-slate-800 mb-3">{t('personalityGuide.dimensions.thinking.title')}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{t('personalityGuide.dimensions.thinking.desc')}</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-slate-800 mb-3">{t('personalityGuide.dimensions.judging.title')}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{t('personalityGuide.dimensions.judging.desc')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 16가지 성격유형 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personalityTypes.map((personality) => {
            const IconComponent = personality.icon;
            return (
              <Card key={personality.type} className={`rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 ${personality.borderColor}`}>
                <CardContent className={`p-6 ${personality.bgColor}`}>
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <IconComponent className={`w-8 h-8 ${personality.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {personality.type}
                    </h3>
                    <h4 className="font-semibold text-slate-700 mb-3">
                      {t(`personalityGuide.types.${personality.type}.name`)}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {t(`personalityGuide.types.${personality.type}.description`)}
                    </p>
                    <div className="space-y-2">
                      <div>
                        <h5 className="text-xs font-medium text-slate-700 mb-1">
                          {t('personalityGuide.types.strengths')}
                        </h5>
                        <p className="text-xs text-slate-600">
                          {t(`personalityGuide.types.${personality.type}.strengths`)}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-slate-700 mb-1">
                          {t('personalityGuide.types.careers')}
                        </h5>
                        <p className="text-xs text-slate-600">
                          {t(`personalityGuide.types.${personality.type}.careers`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 하단 설명 */}
        <Card className="rounded-2xl shadow-lg mt-12">
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                {t('personalityGuide.conclusion.title')}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto mb-6">
                {t('personalityGuide.conclusion.description')}
              </p>
              <Link href="/">
                <Button className="bg-primary hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full text-lg">
                  {t('personalityGuide.conclusion.startTest')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

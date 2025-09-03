import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Users, AlertTriangle, Scale } from "lucide-react";
import { Link } from "wouter";

export default function TermsOfService() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {t('common.backHome')}
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <FileText className="text-primary" />
              <h1 className="text-xl font-semibold text-slate-800">
                {t('terms.title')}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="prose prose-slate max-w-none">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">
                  {t('terms.title')}
                </h1>
                <p className="text-slate-600">
                  {t('terms.lastUpdated')}: 2025년 9월 3일
                </p>
              </div>

              <div className="space-y-8">
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="text-blue-600 w-6 h-6" />
                    <h2 className="text-xl font-semibold text-slate-800">
                      {t('terms.serviceDescription.title')}
                    </h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {t('terms.serviceDescription.description')}
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-2">{t('terms.serviceDescription.features.title')}</h3>
                    <ul className="list-disc list-inside text-blue-700 space-y-1">
                      <li>{t('terms.serviceDescription.features.personalityTest')}</li>
                      <li>{t('terms.serviceDescription.features.characterCompatibility')}</li>
                      <li>{t('terms.serviceDescription.features.resultSharing')}</li>
                      <li>{t('terms.serviceDescription.features.multiLanguage')}</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="text-green-600 w-6 h-6" />
                    <h2 className="text-xl font-semibold text-slate-800">
                      {t('terms.userResponsibilities.title')}
                    </h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {t('terms.userResponsibilities.description')}
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2">
                    <li>{t('terms.userResponsibilities.honestAnswers')}</li>
                    <li>{t('terms.userResponsibilities.appropriateUse')}</li>
                    <li>{t('terms.userResponsibilities.noHarmfulContent')}</li>
                    <li>{t('terms.userResponsibilities.respectOthers')}</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="text-orange-600 w-6 h-6" />
                    <h2 className="text-xl font-semibold text-slate-800">
                      {t('terms.disclaimer.title')}
                    </h2>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <p className="text-yellow-800 font-medium">
                      ⚠️ {t('terms.disclaimer.notProfessional')}
                    </p>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {t('terms.disclaimer.description')}
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2">
                    <li>{t('terms.disclaimer.entertainmentPurpose')}</li>
                    <li>{t('terms.disclaimer.noMedicalAdvice')}</li>
                    <li>{t('terms.disclaimer.noGuarantee')}</li>
                    <li>{t('terms.disclaimer.useAtOwnRisk')}</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Scale className="text-purple-600 w-6 h-6" />
                    <h2 className="text-xl font-semibold text-slate-800">
                      {t('terms.liability.title')}
                    </h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {t('terms.liability.description')}
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <p className="text-slate-700 text-sm">
                      {t('terms.liability.limitation')}
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    {t('terms.contact.title')}
                  </h2>
                  <p className="text-slate-700 leading-relaxed">
                    {t('terms.contact.description')}
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-4">
                    <p className="text-slate-700">
                      <strong>email:</strong> wndydx2@naver.com<br />
                      <strong>web:</strong> <a href="https://jybr.me" className="text-blue-600 hover:underline">https://jybr.me</a>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

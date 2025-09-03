import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Database, Eye, Lock } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
              <Shield className="text-primary" />
              <h1 className="text-xl font-semibold text-slate-800">
                {t('privacy.title')}
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
                  {t('privacy.title')}
                </h1>
                <p className="text-slate-600">
                  {t('privacy.lastUpdated')}: 2025년 9월 3일
                </p>
              </div>

              <div className="space-y-8">
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="text-blue-600 w-6 h-6" />
                    <h2 className="text-xl font-semibold text-slate-800">
                      {t('privacy.dataCollection.title')}
                    </h2>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-green-800 font-medium">
                      ✅ {t('privacy.dataCollection.noDataStored')}
                    </p>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {t('privacy.dataCollection.description')}
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2">
                    <li>{t('privacy.dataCollection.noPersonalInfo')}</li>
                    <li>{t('privacy.dataCollection.noTestResults')}</li>
                    <li>{t('privacy.dataCollection.noUserAccounts')}</li>
                    <li>{t('privacy.dataCollection.noTracking')}</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="text-purple-600 w-6 h-6" />
                    <h2 className="text-xl font-semibold text-slate-800">
                      {t('privacy.browserStorage.title')}
                    </h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {t('privacy.browserStorage.description')}
                  </p>
                  <ul className="list-disc list-inside text-slate-700 space-y-2">
                    <li>{t('privacy.browserStorage.languagePreference')}</li>
                    <li>{t('privacy.browserStorage.localOnly')}</li>
                    <li>{t('privacy.browserStorage.userControl')}</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="text-orange-600 w-6 h-6" />
                    <h2 className="text-xl font-semibold text-slate-800">
                      {t('privacy.thirdParty.title')}
                    </h2>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {t('privacy.thirdParty.description')}
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-2">Google AdSense</h3>
                    <p className="text-blue-700 text-sm">
                      {t('privacy.thirdParty.googleAdsense')}
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    {t('privacy.contact.title')}
                  </h2>
                  <p className="text-slate-700 leading-relaxed">
                    {t('privacy.contact.description')}
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

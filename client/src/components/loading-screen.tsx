import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    t('loading.analyzing'),
    t('loading.calculating'),
    t('loading.almostDone')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [onComplete, messages.length]);

  return (
    <div data-testid="loading-screen">
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-12 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
              <Brain className="text-white text-2xl animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4" data-testid="text-loading-title">
              {messages[currentMessage]}
            </h2>
            
            {/* Loading animation */}
            <div className="flex justify-center space-x-2 mb-6">
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce-delayed-1"></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce-delayed-2"></div>
            </div>
            
            <Progress value={progress} className="h-2" data-testid="progress-loading" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

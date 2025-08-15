import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

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

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div data-testid="loading-screen">
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-12 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
              <Brain className="text-white text-2xl animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4" data-testid="text-loading-title">
              결과를 분석중입니다...
            </h2>
            <p className="text-slate-600 mb-8" data-testid="text-loading-description">
              당신의 성향과 궁합을 계산하고 있습니다
            </p>
            
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

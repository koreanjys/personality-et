import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ko from '../locales/ko.json';
import en from '../locales/en.json';

const resources = {
  ko: {
    translation: ko,
  },
  en: {
    translation: en,
  },
};

// 브라우저 언어 감지 함수
const getInitialLanguage = (): string => {
  // 저장된 언어 설정이 있으면 사용
  const savedLanguage = localStorage.getItem('i18nextLng');
  if (savedLanguage && ['ko', 'en'].includes(savedLanguage)) {
    return savedLanguage;
  }
  
  // 브라우저 언어 감지
  const browserLanguage = navigator.language || navigator.languages?.[0] || 'en';
  
  // 한국어 관련 언어 코드들 (ko, ko-KR, ko-kr 등)
  if (browserLanguage.toLowerCase().startsWith('ko')) {
    return 'ko';
  }
  
  // 그 외 모든 언어는 영어로 처리
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(), // 브라우저 언어 자동 감지
    fallbackLng: 'en', // 한국어가 아닌 경우 영어로 폴백
    interpolation: {
      escapeValue: false,
    },
    // 언어 변경 시 localStorage에 저장
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;

// 동적 메타데이터 업데이트 유틸리티

export interface MetaDataConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogLocale?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

export function updateMetaData(config: MetaDataConfig) {
  // Title 업데이트
  if (config.title) {
    document.title = config.title;
  }

  // Description 메타태그 업데이트
  updateMetaTag('name', 'description', config.description);

  // Keywords 메타태그 업데이트
  if (config.keywords) {
    updateMetaTag('name', 'keywords', config.keywords);
  }

  // Open Graph 메타태그 업데이트
  if (config.ogTitle || config.title) {
    updateMetaTag('property', 'og:title', config.ogTitle || config.title);
  }
  
  if (config.ogDescription || config.description) {
    updateMetaTag('property', 'og:description', config.ogDescription || config.description);
  }

  if (config.ogUrl) {
    updateMetaTag('property', 'og:url', config.ogUrl);
  }

  // og:locale 업데이트
  if (config.ogLocale) {
    updateMetaTag('property', 'og:locale', config.ogLocale);
  }

  // Twitter Card 메타태그 업데이트
  if (config.twitterTitle || config.title) {
    updateMetaTag('name', 'twitter:title', config.twitterTitle || config.title);
  }
  
  if (config.twitterDescription || config.description) {
    updateMetaTag('name', 'twitter:description', config.twitterDescription || config.description);
  }
}

function updateMetaTag(attributeType: 'name' | 'property', attributeName: string, content: string) {
  let metaTag = document.querySelector(`meta[${attributeType}="${attributeName}"]`);
  
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attributeType, attributeName);
    document.head.appendChild(metaTag);
  }
  
  metaTag.setAttribute('content', content);
}

// 홈페이지용 메타데이터 생성
export function generateHomeMetaData(isKorean: boolean) {
  const baseUrl = 'https://jybr.me';
  
  if (isKorean) {
    return {
      title: '무료 성격 테스트 | 성격유형 성향 & 에겐테토 궁합 테스트',
      description: '무료 성격 테스트로 당신의 성격유형 성향을 알아보고 에겐-테토와의 궁합을 확인해보세요! 16가지 성격 유형별 상세 분석과 캐릭터 궁합도를 제공합니다.',
      keywords: '무료성격테스트, 성격유형테스트, 에겐테토, 궁합테스트, 성향분석, 16personalities',
      ogTitle: '무료 성격 테스트 | 성격유형 성향 & 에겐테토 궁합 테스트',
      ogDescription: '무료 성격 테스트로 당신의 성격유형 성향을 알아보고 에겐-테토와의 궁합을 확인해보세요!',
      ogUrl: baseUrl,
      ogLocale: 'ko_KR',
      twitterTitle: '무료 성격 테스트 | 성격유형 & 에겐테토 궁합',
      twitterDescription: '나의 성격유형 성향과 에겐-테토 캐릭터와의 궁합을 무료로 확인해보세요!'
    };
  } else {
    return {
      title: 'Free Personality Test | Personality Type & Egen-Teto Compatibility Test',
      description: 'Discover your personality type and check your compatibility with Egen-Teto characters! Get detailed analysis of 16 personality types and character compatibility ratings.',
      keywords: 'free personality test, personality type test, Egen Teto, compatibility test, personality analysis, 16personalities',
      ogTitle: 'Free Personality Test | Personality Type & Egen-Teto Compatibility Test',
      ogDescription: 'Discover your personality type and check your compatibility with Egen-Teto characters!',
      ogUrl: baseUrl,
      ogLocale: 'en_US',
      twitterTitle: 'Free Personality Test | Personality Type & Egen-Teto',
      twitterDescription: 'Discover your personality type and compatibility with Egen-Teto characters for free!'
    };
  }
}

// 결과 페이지용 메타데이터 생성
export function generateResultMetaData(personalityType: string, isKorean: boolean) {
  const baseUrl = 'https://jybr.me';
  
  if (isKorean) {
    return {
      title: `${personalityType} 성격 유형 | 무료 MBTI 성향 테스트 결과`,
      description: `당신의 성격 유형은 ${personalityType}입니다! 상세한 성격 분석과 에겐-테토와의 궁합을 확인해보세요.`,
      keywords: `${personalityType}, 성격테스트결과, MBTI테스트결과, 성향분석, 궁합테스트, 에겐테토`,
      ogTitle: `${personalityType} 성격 유형 결과`,
      ogDescription: `나의 성격 유형: ${personalityType} - 무료 성격 테스트로 알아본 나의 성향과 궁합!`,
      ogUrl: `${baseUrl}?result=${encodeURIComponent(personalityType)}`,
      ogLocale: 'ko_KR',
      twitterTitle: `나의 성격 유형: ${personalityType}`,
      twitterDescription: `무료 성격 테스트 결과를 확인해보세요! ${personalityType}의 특징과 궁합 분석`
    };
  } else {
    return {
      title: `${personalityType} Personality Type | Free MBTI Test Results`,
      description: `Your personality type is ${personalityType}! Discover detailed personality analysis and compatibility with Egen-Teto characters.`,
      keywords: `${personalityType}, personality test results, MBTI test results, personality analysis, compatibility test, Egen Teto`,
      ogTitle: `${personalityType} Personality Type Results`,
      ogDescription: `My personality type: ${personalityType} - Discover your traits and compatibility with free personality test!`,
      ogUrl: `${baseUrl}?result=${encodeURIComponent(personalityType)}`,
      ogLocale: 'en_US',
      twitterTitle: `My personality type: ${personalityType}`,
      twitterDescription: `Check out my free personality test results! ${personalityType} traits and compatibility analysis`
    };
  }
}

// 브라우저 언어 감지 (초기 설정용)
export function detectBrowserLanguage(): boolean {
  const browserLanguage = navigator.language || navigator.languages?.[0] || 'en';
  return browserLanguage.toLowerCase().startsWith('ko');
}

// 현재 i18n 언어 기반 한국어 여부 확인
export function isCurrentLanguageKorean(currentLang: string): boolean {
  return currentLang === 'ko';
}
